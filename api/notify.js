export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return response.status(200).json({ ok: false, skipped: true });
  }

  const { text = 'Она нажала кнопку ❤️' } = request.body || {};
  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!telegramResponse.ok) {
    return response.status(502).json({ ok: false, error: 'Telegram notification failed' });
  }

  return response.status(200).json({ ok: true });
}
