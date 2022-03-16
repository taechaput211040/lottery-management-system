<template>
  <v-flex>
    <h2>รายการแทง</h2>
    <filter-search @search="searchfunction"></filter-search>
    <div class="white rounded-lg">
      <div class="rounded-lg white">
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward">
          <template #[`item.action`]>
            <v-btn rounded color="primary" small @click="dialogdetail = true"
              ><v-icon left>mdi-magnify</v-icon>ดูผล
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card class="pa-3">
        <v-data-table :headers="headerDetail"> </v-data-table>
      </v-card>
      <v-btn color="error" @click="dialogdetail = false">ปิด</v-btn>
    </v-dialog>
  </v-flex>
</template>

<script>
import FilterSearch from "../../components/form/FilterSearch.vue";
export default {
  components: { FilterSearch },
  data() {
    return {
      headerDetail: [
        {
          text: "ประเภท หมายเลข",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอด",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ส่วนลด",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "รวม",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "จ่ายรวม",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        }
      ],
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "ประเภทหวย",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "งวดหวย",
          value: "lottodate",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "วันที่",
          value: "date",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "3 ตัวบน",
          value: "threeup",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "2 ตัวบน",
          value: "twoup",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "2 ตัวล่าง",
          value: "twodown",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "ดูผล",
          value: "action",
          sort: false,
          align: "center",
          class: "font-weight-bold"
        }
      ],
      itemtypeaward: [
        {
          type: "หวยดาวน์โจนส์ VIP",
          lottodate: "09-02-2022",
          date: "10-02-2022",
          threeup: "674",
          twoup: "74",
          twodown: "01"
        }
      ],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
  watch: {
    selecttype(newVal) {
      if (newVal) {
        this.filter = {
          startDate: "",
          endDate: ""
        };
      }
    }
  },
  methods: {
    searchfunction(value) {
      console.log(value);
    }
  }
};
</script>

<style></style>
