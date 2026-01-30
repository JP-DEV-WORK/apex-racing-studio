import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5511993060743"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block overflow-hidden"
      style={{ transform: 'skewX(-12deg)' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background and border container */}
      <div 
        className="relative px-8 py-5 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 group-hover:border-[rgba(37,211,102,0.5)] group-hover:shadow-[inset_0_0_20px_rgba(37,211,102,0.1)]"
      >
        {/* Light sweep effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(37,211,102,0.1) 50%, transparent 100%)',
            animation: 'none',
          }}
        />
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          }}
        />
        
        {/* Content with inverse skew */}
        <div 
          className="relative z-10 flex items-center gap-3"
          style={{ transform: 'skewX(12deg)' }}
        >
          {/* WhatsApp icon with float animation */}
          <motion.div
            className="text-[#25D366] transition-colors duration-300"
            animate={{ y: [0, 0] }}
            whileHover={{ y: [-2, 2, -2] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            <MessageCircle className="w-5 h-5" />
          </motion.div>
          
          {/* Text */}
          <span className="font-bold uppercase text-sm tracking-wider text-[#9ca3af] group-hover:text-white transition-colors duration-300">
            Conversa Rápida
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
