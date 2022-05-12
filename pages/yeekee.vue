<template>
  <div>
    <h2>ตั้งค่าหวยยี่กี่</h2>
    <div class="pa-3 mt-3 rounded-lg white">
      <div class="col-12 col-sm-4">
        ยอดกำไรขาดทุน(%)
        <v-text-field
          placeholder="ยอดกำไรขาดทุน"
          outlined
          dense
          v-model="profit_amount"
          hide-details="auto"
        ></v-text-field>
      </div>
    </div>
    <div class="rounded-lg white mt-3">
      <v-data-table :headers="header" hide-default-footer :items="dataYeekee">
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataYeekee: [],
      profit_amount: 0,
      header: [
        {
          text: "ชนิดตัวเลข",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        }
      ]
    };
  }
};
</script>

<style></style>
