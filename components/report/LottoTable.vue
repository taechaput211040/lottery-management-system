<template>
  <div>
    <div class="mt-3">
      <filter-search @search="searchfunction"> </filter-search>
    </div>
    <div class="white rounded-lg">
      <div class="pa-3">
        <h3>รายการแทง</h3>
        <v-radio-group
          v-model="selectgroup"
          @change="renderbyselecttype"
          hide-details="auto"
          row
        >
          <v-radio label="ทั้งหมด" value="0 "></v-radio>
          <v-radio label="น้ำไหล" value="1"></v-radio>
          <v-radio label="เพลา" value="2"></v-radio>
        </v-radio-group>
      </div>
      <v-data-table :headers="headerTable" :items="datarender">
        
        <template v-slot:no-data>
          <v-alert
            :value="true"
            border="left"
            color="blue-grey"
            type="error"
            icon="mdi-warning"
          >
            ไม่พบข้อมูล
          </v-alert>
        </template></v-data-table
      >
    </div>
  </div>
</template>

<script>
import FilterSearch from "../../components/form/FilterSearch.vue";
export default {
  components: { FilterSearch },
  data() {
    return {
      datarender: [],
      selectgroup: undefined,
      headerTable: [
        {
          text: "Username",
          value: "agent_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "Bet",
          value: "bet_amount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "Turnover",
          value: "turnover",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "Payout",
          value: "payout",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },

        {
          text: "ยอดได้เสีย",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        }
      ]
    };
  },
  methods: {
    async renderbyselecttype(value) {
      if (value == 0) {
        this.type = undefined;
      } else {
        this.type = value;
      }
    },
    searchfunction(value) {
      console.log(value);
    }
  }
};
</script>

<style></style>
