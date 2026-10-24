import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { orderId } = body

  if (!orderId || !config.supabaseServiceKey) return { ok: false }

  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceKey)

  const { data: order } = await supabase
    .from('orders')
    .select('*, profiles(email, contact_name, company_name)')
    .eq('id', orderId)
    .single()

  if (!order || !config.resendApiKey) return { ok: false }

  const profile = order.profiles

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: {
        from: 'AvesView <noreply@avesview.com>',
        to: profile?.email,
        subject: `Order Confirmation #${orderId.slice(0, 8).toUpperCase()} — AvesView`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <img src="https://avesview.com/logo.jpg" alt="AvesView" style="height: 50px; margin-bottom: 24px;" />
            <h1 style="font-size: 24px; color: #0A0A0A; margin-bottom: 8px;">Order Confirmed!</h1>
            <p style="color: #6B6B6B; font-size: 14px; margin-bottom: 24px;">Order #${orderId.slice(0, 8).toUpperCase()}</p>
            <p style="color: #6B6B6B; line-height: 1.6;">Hi ${profile?.contact_name},</p>
            <p style="color: #6B6B6B; line-height: 1.6;">
              Thank you for your order! We've received your order and will be in touch shortly.
            </p>
            <div style="background: #F9F9F9; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="margin: 0; color: #4A4A4A; font-size: 14px;"><strong>Delivery Method:</strong> ${order.delivery_method}</p>
              <p style="margin: 8px 0 0; color: #4A4A4A; font-size: 14px;"><strong>Total:</strong> $${order.total?.toFixed(2)}</p>
            </div>
            <p style="color: #6B6B6B; line-height: 1.6;">
              Questions? Contact us at <a href="mailto:info@avesview.com">info@avesview.com</a> or 702-525-5000.
            </p>
            <br />
            <p style="color: #6B6B6B;">Best,<br/>AvesView Wholesale Team</p>
          </div>
        `,
      }
    })
  } catch (err: any) {
    console.error('Order email failed:', err.message)
  }

  return { ok: true }
})
