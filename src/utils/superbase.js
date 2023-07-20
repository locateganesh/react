import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bzicfxvfnsnpbeszzduf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6aWNmeHZmbnNucGJlc3p6ZHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwOTgxNDksImV4cCI6MTk5MTY3NDE0OX0.r5bB-n2l3h3E2T18GstMLi4ZEiLLbwZaEuItBarL6rQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;