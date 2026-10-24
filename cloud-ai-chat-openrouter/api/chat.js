export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "ใช้ได้เฉพาะ POST" });
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: "ยังไม่ได้ตั้งค่า OPENROUTER_API_KEY ใน Environment Variables ของ Vercel"
    });
  }

  try {
    const { messages, systemPrompt, model } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) {
      return res.status(400).json({ error: "ไม่พบข้อความสำหรับส่งให้ AI" });
    }

    const selected = typeof model === "string" &&
      /^[a-zA-Z0-9._:/-]+$/.test(model)
      ? model
      : (process.env.OPENROUTER_MODEL || "qwen/qwen3-coder:free");

    const cleanMessages = [];
    if (typeof systemPrompt === "string" && systemPrompt.trim()) {
      cleanMessages.push({
        role: "system",
        content: systemPrompt.slice(0, 8000)
      });
    }

    for (const m of messages) {
      const role = m?.role === "model" || m?.role === "assistant"
        ? "assistant"
        : m?.role === "user" ? "user" : null;
      if (!role || !Array.isArray(m?.parts)) continue;
      const content = m.parts
        .filter(p => typeof p?.text === "string")
        .map(p => p.text.slice(0, 30000))
        .join("\n");
      if (content) cleanMessages.push({ role, content });
    }

    if (!cleanMessages.some(m => m.role === "user")) {
      return res.status(400).json({ error: "ไม่มีข้อความผู้ใช้ที่ใช้ได้" });
    }

    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.APP_URL || "https://vercel.com",
        "X-Title": process.env.APP_NAME || "Cloud AI Chat"
      },
      body: JSON.stringify({
        model: selected,
        messages: cleanMessages,
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const detail = data?.error?.message || data?.message || `OpenRouter API ตอบกลับ ${upstream.status}`;
      return res.status(upstream.status >= 500 ? 502 : upstream.status).json({ error: detail });
    }

    const text = data?.choices?.[0]?.message?.content;
    const answer = typeof text === "string"
      ? text.trim()
      : Array.isArray(text)
        ? text.map(part => part?.text || "").join("").trim()
        : "";

    if (!answer) {
      return res.status(502).json({ error: "โมเดลไม่ส่งข้อความกลับมา หรือบริการฟรีเต็มโควตา" });
    }

    return res.status(200).json({ text: answer });
  } catch (e) {
    return res.status(500).json({
      error: "เกิดข้อผิดพลาดระหว่างเรียก AI: " + (e?.message || "unknown")
    });
  }
}
