import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://qxrnmswaptwdbmgxauoz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cm5tc3dhcHR3ZGJtZ3hhdW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1NTIzNDksImV4cCI6MTk5ODEyODM0OX0.jid1D1qc8sfK0LA21BYbnuZY1Ir9azH8IZ_D08PRBbo"
)

export default supabase