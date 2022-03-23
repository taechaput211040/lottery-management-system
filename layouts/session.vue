<template>
  <v-app dark>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  head: {
    title: process.env.TITLE,
    meta: [
      {
        hid: "description",
        name: "description",
        content: "SMARTLOTTO"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: require("@/assets/image/" + process.env.LOGOTITLE)
      }
    ]
  }
};
</script>

<style></style>
