// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '7756147095',
    deliveryCostPerMile: process.env.DELIVERY_COST_PER_MILE || '1.00',
    warehouseLat: 34.1186,
    warehouseLng: -118.2318,
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
      paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
      siteUrl: process.env.SITE_URL || 'https://avesview.com',
    }
  },

  app: {
    head: {
      title: 'AvesView — B2B Ethernet Cable & Network Equipment Wholesale',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AvesView is a private label manufacturer of Cat6 Ethernet cables and surveillance cameras. Wholesale pricing for contractors, installers, and businesses.' },
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/logo.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'vercel',
  },
})
