const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const VERIFY_TOKEN = "sunvita_webhook_2026";

// Home page
app.get("/", (req, res) => {
  res.send("SUNVITA WhatsApp Bot is running ✅");
});

// 👇 PASTE PRIVACY POLICY CODE HERE

// Privacy Policy
app.get("/privacy", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SUNVITA Bot - Privacy Policy</title>
      <meta charset="UTF-8">
    </head>
    <body style="font-family:Arial;max-width:800px;margin:40px auto;padding:20px;line-height:1.6;">
      <h1>SUNVITA Bot Privacy Policy</h1>
      <p>SUNVITA Bot provides automated WhatsApp messaging services for SUNVITA Renewable Energy.</p>

      <h2>Information We Collect</h2>
      <p>We may process your WhatsApp phone number, messages, and information you voluntarily provide when communicating with our WhatsApp service.</p>

      <h2>How We Use Information</h2>
      <p>Information is used only to respond to customer inquiries, provide information about our services, and provide customer support.</p>

      <h2>Data Sharing</h2>
      <p>We do not sell customers' personal information.</p>

      <h2>Contact</h2>
      <p>For privacy questions, please contact SUNVITA Renewable Energy.</p>
    </body>
    </html>
  `);
});


// Meta webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully.");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Receive WhatsApp messages
app.post("/webhook", (req, res) => {
  console.log("WhatsApp webhook received:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`SUNVITA Bot running on port ${PORT}`);
});
