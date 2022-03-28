<template>
  <v-flex>
    <h2>กำไร /ขาดทุน</h2>
    <lotto-table></lotto-table>
  </v-flex>
</template>

<script>
import LottoTable from "../../components/report/LottoTable.vue";
export default {
  components: { LottoTable },
  data() {
    return {
      fillter: {}
    };
  }
};
</script>

<style></style>
