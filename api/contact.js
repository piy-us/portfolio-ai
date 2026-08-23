import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const {
      name,
      email,
      role = '',
      phone = '',
      message,
      preferred_contact = 'email',
    } = req.body || {}

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        error: 'Name, email and message are required.',
      })
    }

    if (name.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Name is too long.',
      })
    }

    if (email.length > 200) {
      return res.status(400).json({
        ok: false,
        error: 'Email is too long.',
      })
    }

    if (message.length > 1500) {
      return res.status(400).json({
        ok: false,
        error: 'Message is too long.',
      })
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.NOTIFY_EMAIL_TO,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `
New message from your portfolio.

Name: ${name}
Email: ${email}
Role / Company: ${role || 'Not provided'}
Phone / WhatsApp: ${phone || 'Not provided'}
Preferred contact: ${preferred_contact}

Message:
${message}
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)

      return res.status(502).json({
        ok: false,
        error: 'Could not send the email.',
      })
    }

    return res.status(200).json({
      ok: true,
    })
  } catch (error) {
    console.error('Contact error:', error)

    return res.status(500).json({
      ok: false,
      error: 'Could not send the message.',
    })
  }
}