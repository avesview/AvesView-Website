export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { contactName, companyName, email } = body

  const results: Record<string, any> = {}

  // Send Telegram notification
  if (config.telegramBotToken && config.telegramChatId) {
    try {
      const message = `🆕 *New AvesView Registration*\n\n👤 ${contactName}\n🏢 ${companyName}\n📧 ${email}\n\n➡️ [Review at avesview.com/admin](https://avesview.com/admin/registrations)`

      const telegramRes = await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
        method: 'POST',
        body: {
          chat_id: config.telegramChatId,
          text: message,
          parse_mode: 'Markdown',
        }
      })
      results.telegram = 'sent'
    } catch (err: any) {
      results.telegram = `failed: ${err.message}`
    }
  }

  // Send email via Resend
  if (config.resendApiKey) {
    try {
      await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          from: 'AvesView <noreply@avesview.com>',
          to: email,
          subject: 'Your AvesView wholesale application is under review',
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <img src="https://avesview.com/logo.jpg" alt="AvesView" style="height: 50px; margin-bottom: 24px;" />
              <h1 style="font-size: 24px; color: #0A0A0A; margin-bottom: 16px;">Application Received</h1>
              <p style="color: #6B6B6B; line-height: 1.6;">Hi ${contactName},</p>
              <p style="color: #6B6B6B; line-height: 1.6;">
                Thank you for applying for a wholesale account with AvesView. Your application for <strong>${companyName}</strong> is currently under review.
              </p>
              <p style="color: #6B6B6B; line-height: 1.6;">You'll receive another email once your account has been approved — typically within 24 hours.</p>
              <p style="color: #6B6B6B; line-height: 1.6;">If you have questions, reply to this email or contact us at <a href="tel:+17025255000">702-525-5000</a>.</p>
              <br />
              <p style="color: #6B6B6B;">Best,<br/>AvesView Wholesale Team</p>
            </div>
          `,
        }
      })
      results.email = 'sent'
    } catch (err: any) {
      results.email = `failed: ${err.message}`
    }
  }

  return { ok: true, results }
})
