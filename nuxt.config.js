export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - SMART-LOTTO",
    title: "SMART-LOTTO",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:url", property: "og:url", content: "agent.sm-lotto.com" },
      {
        hid: "og:description",
        property: "og:description",
        content: "Smart Lotto - เว็ปหวยครบวงจร"
      },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  // proxy: {
  //   "/apilogin/": {
  //     target: "https://lotto-launchgame-service-ehhif4jpyq-as.a.run.app",
  //     pathRewrite: { "^/apilogin/": "" }
  //   },
  //   "/program/": {
  //     target: "https://lottoprize-ehhif4jpyq-as.a.run.app",
  //     pathRewrite: { "^/program/": "" }
  //   },
  //   "/sellapi/": {
  //     target: "https://lotto-setting-seller-ehhif4jpyq-as.a.run.app",
  //     pathRewrite: { "^/sellapi/": "" }
  //   },
  //   "/settinglottoapi/": {
  //     target: "https://lotto-setting-ehhif4jpyq-as.a.run.app",
  //     pathRewrite: { "^/settinglottoapi/": "" }
  //   },
  //   "/setflexodd/": {
  //     target: "https://lotto-setting-flex-odd-ehhif4jpyq-as.a.run.app",
  //     pathRewrite: { "^/setflexodd/": "" }
  //   }
  // },
  server: {
    port: 8030 // default: 3000
  },
  mode: "spa",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "vue2-editor/nuxt"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "nuxt-element-ui"],
  env: {
    TITLE: process.env.TITLE,
    LOGO: process.env.LOGO,
    LOGOTITLE: process.env.LOGOTITLE,
    API_LOTTO_LAUNCHGAME: process.env.API_LOTTO_LAUNCHGAME,
    API_LOTTO_PRICE: process.env.API_LOTTO_PRICE,
    API_LOTTO_SETTING: process.env.API_LOTTO_SETTING,
    API_SETTING_SELLER: process.env.API_SETTING_SELLER,
    API_SETTING_FLEX_ODD: process.env.API_SETTING_FLEX_ODD,
    API_LOTTO_REPORT: process.env.API_LOTTO_REPORT,
    API_SETTING_YEEKEE: process.env.API_SETTING_YEEKEE,
    API_LOTTO_BET:process.env.API_LOTTO_BET
  },
  axios: {
    proxy: true,
    // baseURL: "https://agent.bet-kub.com",
    crossDomain: true,
    proxyHeaders: false,
    credentials: true
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    mode: "history"
    // base: "/dev-backoffice/"
  }
};
