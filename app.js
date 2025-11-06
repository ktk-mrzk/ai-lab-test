import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//const SUPABASE_URL = "https://xvcussolbgdthrwjicuf.supabase.co";
//const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2Y3Vzc29sYmdkdGhyd2ppY3VmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI1NTQ3MSwiZXhwIjoyMDc3ODMxNDcxfQ.JBOLkh_36jJVyxmc9JkIHIuNDjtZJXvdil49QG30fRg";

// --- эндпоинт /categories ---
app.get("/categories", async (req, res) => {
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/categories`, {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase error: ${text}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
