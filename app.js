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

// --- динамический эндпоинт /category/:id ---
app.get("/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Проверяем, что параметр не пустой
    if (!categoryId) {
      return res.status(400).json({ error: "добавь айдишку категории (да, здесь уже без дизайнов)" });
    }

    const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/products`);
    url.searchParams.set("category_id", `eq.${categoryId}`);

    const response = await fetch(url, {
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

    // если товары не найдены — возвращаем 404
    if (!data || data.length === 0) {
return res.status(404).send(`
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 — Нет такой категории</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

      body {
        margin: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #ff00c8, #00fff0);
        background-size: 400% 400%;
        animation: gradientMove 8s ease infinite;
        color: #fff;
        text-align: center;
        font-family: 'Press Start 2P', cursive;
      }

      h1 {
        font-size: 48px;
        text-shadow: 0 0 10px #fff, 0 0 20px #ff00c8, 0 0 40px #ff00c8;
        margin-bottom: 24px;
        animation: glowPulse 2s infinite alternate;
      }

      p {
        font-size: 18px;
        color: #fff;
        text-shadow: 0 0 8px #00fff0;
        margin-bottom: 40px;
      }

      a {
        font-size: 14px;
        color: #fff;
        text-decoration: none;
        padding: 12px 24px;
        border: 2px solid #fff;
        border-radius: 8px;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px #00fff0, 0 0 20px #ff00c8;
      }

      a:hover {
        background-color: #fff;
        color: #ff00c8;
        box-shadow: 0 0 20px #fff, 0 0 40px #00fff0;
      }

      @keyframes glowPulse {
        from { text-shadow: 0 0 5px #fff, 0 0 10px #ff00c8; }
        to { text-shadow: 0 0 20px #fff, 0 0 40px #00fff0; }
      }

      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .scanlines {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.04) 0px,
          rgba(255, 255, 255, 0.04) 2px,
          transparent 2px,
          transparent 4px
        );
        animation: flicker 0.1s infinite;
      }

      @keyframes flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
          opacity: 0.99;
        }
        20%, 24%, 55% {
          opacity: 0.4;
        }
      }
    </style>
  </head>
  <body>
    <div class="scanlines"></div>
    <h1>404</h1>
    <p>Блин... нет такой категории в нашем магазинчике 💿</p>
    <a href="/categories">← Назад к категориям</a>
  </body>
  </html>
`);

;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
