// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  i18n: {
    // каталоги с переводами
    // lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "ru",
    locales: [
      { code: "ru", iso: "ru-RU", file: "ru.json", name: "Русский" },
      { code: "uz", iso: "uz-UZ", file: "uz.json", name: "Oʻzbekcha" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // редирект только с /
    },
    // (опц.) включить роут-помощники: localePath, switchLocalePath и т.п.
    experimental: { localeDetector: "navigator" },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://api.my-asterium.com",
      register:
        "https://linktr.ee/asteriumwallet#utm_source=google&utm_medium=cpa&utm_campaign=etherium&utm_id=777&utm_term=asterium",
      app: "https://linktr.ee/asteriumwallet#utm_source=google&utm_medium=cpa&utm_campaign=etherium&utm_id=777&utm_term=asterium",
    },
  },
  vite: {
    server: {
      allowedHosts: ["2e598afd1a0c.ngrok-free.app"],
    },
  },
});
