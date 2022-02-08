<template>
  <div class="p-2 card-child shadow">
    <div class=" card-icontitle " :class="classChild">
      {{ title }}
    </div>
    <div class="text-center  text-data text-primary">
      {{ value }}
    </div>
    <button @click="$emit('editTodo', conte)">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conte: 1234
    };
  },
  props: {
    title: { type: String, default: "" },
    value: { type: Number, default: "" },
    classChild: { type: Object, default: undefined }
  }
};
</script>

<style lang="scss" scoped>
.card-child {
  position: relative;
  border-radius: 10px;
  background: white;
  height: 80px;
  bottom: -40px;
  margin-bottom: 50px;
  .card-icontitle {
    width: 90%;
    margin: auto;
    background: #9aacfc;
    padding: 5px;
    z-index: 1;
    top: -40px;
    font-weight: bolder;
    font-size: 16px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: white;
    display: flex;
    min-height: 65px;
    position: relative;
    border-radius: 5px 5px 0 0;
  }
  .card_deposit {
    // background: linear-gradient(60deg, #26c6da, #00acc1);
    box-shadow: 0 12px 20px -10px rgb(0 188 212 / 28%),
      0 4px 20px 0 rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(0 188 212 / 20%);
  }
  .text-data {
    position: relative;
    font-size: 17px;
    bottom: 30px;
    font-weight: bold;
  }
}
</style>
