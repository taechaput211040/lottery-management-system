<template>
  <div class=" card-child card-dashboard ">
    <div class="row">
      <div class="col-8">
        <h2 :class="titleclass">{{ title }}</h2>
        <div class=" card-icontitle" v-if="condition == true">
          <h2 v-if="value > 0" class="success--text">
            {{ numberWithCommas(value) }} บาท
          </h2>
          <h2 v-if="value < 0" class="red--text">
            {{ numberWithCommas(value) }} บาท
          </h2>
          <h2 v-if="value == 0 || !value" class="grey--text">
            0.00 บาท
          </h2>
        </div>

        <div class=" card-icontitle " :class="value_class" v-else>
          <h2>{{ numberWithCommas(value) }} บาท</h2>
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
    value: { type: [Number, String], default: 0 },
    iconSrc: { type: String, default: "" },
    titleclass: "",
    value_class: ""
  },
  methods: {
    numberWithCommas(x) {
      var parts = parseInt(x)
        .toFixed(2)
        .toString()
        .split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  }
};
</script>

<style></style>
