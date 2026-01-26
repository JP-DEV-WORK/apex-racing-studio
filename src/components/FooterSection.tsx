import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Youtube, Mail, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:contato@vruumfilms.com", label: "Email" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().max(20, "Telefone muito longo").optional(),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000, "Mensagem muito longa"),
});

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone?.trim() || null,
            message: formData.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <footer 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-background border-t border-border"
      aria-labelledby="footer-title"
    >
      {/* Diagonal top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-card diagonal-cut -translate-y-full" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
              Contato
            </span>
            <h2 
              id="footer-title"
              className="text-4xl md:text-5xl font-archivo speed-text mt-4 mb-8 tracking-tight-custom"
            >
              Vamos<br />
              <span className="text-primary">Acelerar?</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                    className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    aria-label="Seu nome"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Seu email"
                    className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    aria-label="Seu email"
                  />
                </div>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefone (opcional)"
                  className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  aria-label="Seu telefone (opcional)"
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Sua mensagem"
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  aria-label="Sua mensagem"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 bg-primary text-primary-foreground font-archivo font-bold uppercase tracking-wider text-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-background transition-colors duration-300">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-12"
          >
            {/* Logo */}
            <div className="mb-12">
              <h3 className="text-4xl font-archivo speed-text tracking-tight-custom">
                VRUUM<span className="text-primary">FILMS</span>
              </h3>
              <p className="text-muted-foreground mt-4 max-w-md">
                Media house de elite especializada em automobilismo. 
                Capturamos a essência da velocidade com excelência cinematográfica.
              </p>
            </div>

            {/* Social Links */}
            <div className="mb-12">
              <h4 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Siga-nos
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group relative w-14 h-14 flex items-center justify-center border border-border hover:border-primary transition-colors overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <social.icon className="w-5 h-5 relative z-10 text-foreground group-hover:text-primary-foreground transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="text-primary">Email:</span>{' '}
                <a href="mailto:contato@vruumfilms.com" className="hover-underline">
                  contato@vruumfilms.com
                </a>
              </p>
              <p>
                <span className="text-primary">WhatsApp:</span>{' '}
                <a href="https://wa.me/5511999999999" className="hover-underline">
                  +55 (11) 99999-9999
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VRUUMFILMS. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com <span className="text-primary">♥</span> e muita velocidade
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
