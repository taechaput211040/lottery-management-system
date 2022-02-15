<template>
  <div class=" card-child card-dashboard ">
    <div class="row">
      <div class="col-8">
        <h1 :class="titleclass">{{ title }}</h1>
        <div class=" card-icontitle" v-if="condition == true">
          <h2 v-if="value > 0" class="success--text">+{{ value }}</h2>
          <h2 v-if="value < 0" class="red--text">{{ value }}</h2>
        </div>

        <div class=" card-icontitle" v-else>
          <h2>{{ value }}</h2>
        </div>
      </div>
      <div class="col-4 img_section">
        <img :src="iconSrc" class="img-icon icon-show" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    condition: {
      type: Boolean,
      default: false
    },
    title: { type: String, default: "" },
    value: { type: [Number, String], default: "" },
    iconSrc: { type: String, default: "" },
    titleclass: ""
  }
};
</script>

<style></style>
