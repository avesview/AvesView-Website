import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { userId } = body

  if (!userId) {
    throw createError({ statusCode: 400, message: 'userId required' })
  }

  // Use service key to fetch profile
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, contact_name, company_name')
    .eq('id', userId)
    .single()

  if (!profile) return { ok: false, message: 'Profile not found' }

  // Send welcome email via Resend
  if (config.resendApiKey && profile.email) {
    try {
      await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          from: 'AvesView <noreply@avesview.com>',
          to: profile.email,
          subject: '🎉 Your AvesView wholesale account is approved!',
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <img src="https://avesview.com/logo.jpg" alt="AvesView" style="height: 50px; margin-bottom: 24px;" />
              <h1 style="font-size: 24px; color: #CC0000; margin-bottom: 16px;">Welcome to AvesView Wholesale!</h1>
              <p style="color: #6B6B6B; line-height: 1.6;">Hi ${profile.contact_name},</p>
              <p style="color: #6B6B6B; line-height: 1.6;">
                Great news — your wholesale account for <strong>${profile.company_name}</strong> has been approved. You now have full access to our wholesale pricing catalog.
              </p>
              <div style="margin: 24px 0;">
                <a href="https://avesview.com/products" style="background: #CC0000; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                  Browse Products & Pricing →
                </a>
              </div>
              <p style="color: #6B6B6B;">Any questions? Reply to this email or call 702-525-5000.</p>
              <br />
              <p style="color: #6B6B6B;">Best,<br/>AvesView Wholesale Team</p>
            </div>
          `,
        }
      })
    } catch (err: any) {
      console.error('Email failed:', err.message)
    }
  }

  return { ok: true }
})
