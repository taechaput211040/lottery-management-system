<template>
  <div
    ><v-container>
      <type-catagory v-if="!this.$route.query.id"></type-catagory>
      <type-catagorydetail v-else></type-catagorydetail> </v-container
  ></div>
</template>

<script>
import TypeCatagory from "../../components/typecataegory/TypeCatagory.vue";
import TypeCatagorydetail from "../../components/typecataegory/TypeCatagorydetail.vue";
export default {
  components: { TypeCatagory, TypeCatagorydetail }
};
</script>

<style></style>
