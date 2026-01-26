-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

-- Create a more restrictive policy that denies direct client inserts
-- All inserts must go through the submit-lead edge function (using service role)
CREATE POLICY "Deny direct client inserts"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- The edge function uses service_role key which bypasses RLS