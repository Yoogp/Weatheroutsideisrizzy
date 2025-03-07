import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.body; // You would need to parse the file properly, depending on your file upload method.

      // Send the Lua script to Discord Webhook for malicious code detection
      const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL';  // Replace with your Discord webhook URL

      // Prepare the message content
      const message = {
        content: `New Lua Script Uploaded for Inspection:`,
        embeds: [
          {
            title: 'Lua Script Upload',
            description: `The following Lua script was uploaded and is being inspected for malicious content.`,
            fields: [
              {
                name: 'Script',
                value: `\`\`\`lua\n${file}\n\`\`\``,  // Add the Lua script as a code block
              }
            ]
          }
        ]
      };

      // Send the data to the webhook
      const discordResponse = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });

      // Check if the Discord webhook sent successfully
      if (discordResponse.ok) {
        // After sending to Discord, perform further checks, or directly obfuscate the Lua script
        const obfuscatedCode = obfuscateLua(file);
        
        // Return success with obfuscated code
        res.status(200).json({ success: true, obfuscatedCode });
      } else {
        res.status(500).json({ success: false, message: 'Failed to send webhook notification.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

function obfuscateLua(script) {
  // Basic Lua obfuscation logic
  return script.split('').reverse().join('');  // Example: Reverse the script as a simple obfuscation
}
