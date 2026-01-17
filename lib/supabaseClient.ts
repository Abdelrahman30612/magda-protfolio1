import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yirvvixlenabdnrvluxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcnZ2aXhsZW5hYmRucnZsdXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTM5OTIsImV4cCI6MjA4NDIyOTk5Mn0.4y7fOOH6-_sRvCJqIPNJtQWAG9r2ySTpFNuCufpk1IM';

export const supabase = createClient(supabaseUrl, supabaseKey);