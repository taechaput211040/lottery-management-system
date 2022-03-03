<template>
  <v-flex>
    <div class="d-flex justify-center"><h2>ตั้งค่าหวยเพลา</h2></div>

    <div v-if="!this.$route.query.id">
      <main-table></main-table>
    </div>
    <div v-else>
      <detail-table></detail-table>
    </div>
  </v-flex>
</template>

<script>
import DetailTable from "../../components/shaft/DetailTable.vue";
import MainTable from "../../components/shaft/MainTable.vue";
export default {
  components: { MainTable, DetailTable },
  data() {
    return {
      datarender: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  }
};
</script>
