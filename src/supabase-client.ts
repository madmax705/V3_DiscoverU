import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    "https://xpacnlmsfmdhftadgcvd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwYWNubG1zZm1kaGZ0YWRnY3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MjcxNzAsImV4cCI6MjA2NjAwMzE3MH0.Fedubd6hLN3WsX2ey820zSp40MQcYo3fb2HMo9ATiXU"
)