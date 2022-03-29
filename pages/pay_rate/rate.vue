<template>
  <div>
    <h2>ตั้งค่าหวยเพลา</h2>
    <div v-if="!this.$route.query.id">
      <main-table></main-table>
    </div>
    <div
      v-else-if="this.$route.query.id && !this.$route.query.lottonumbertype_id"
    >
      <detail-table></detail-table>
    </div>
    <div v-else><unlimited-table></unlimited-table></div>
  </div>
</template>

<script>
import DetailTable from "../../components/shaft/DetailTable.vue";
import MainTable from "../../components/shaft/MainTable.vue";
import UnlimitedTable from "../../components/shaft/UnlimitedTable.vue";
export default {
  components: { MainTable, DetailTable, UnlimitedTable },
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
