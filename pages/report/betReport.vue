<template>
  <v-flex>
    <h2>ยกเลิกโพย /รายการแทง</h2>
    <filter-search @search="searchfunction"></filter-search>
    <div class="white rounded-lg">
      <div class="rounded-lg white">
        <v-data-table :headers="headersdatelotto"  :items="itemtypeaward">
          <template #[`item.actions`]>
            <v-tooltip bottom color="black" dark>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-1"
                  fab
                  dark
                  x-small
                  color="black"
                  @click="dialogdetail = true"
                >
                  <v-icon dark>
                    mdi-clipboard-text
                  </v-icon>
                </v-btn></template
              >
              <span>ดูรายละเอียดโพย</span>
            </v-tooltip>
            <v-tooltip bottom color="error" dark>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-1"
                  fab
                  dark
                  x-small
                  color="error"
                >
                  <v-icon dark>
                    mdi-clipboard-remove
                  </v-icon>
                </v-btn></template
              >
              <span>ยกเลิกโพย</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card>
        <div class="ma-2 pa-2 font-weight-bold d-flex align-center">
          <span class="primary--text">account</span><v-spacer></v-spacer>
          <v-chip outline color="primary"> เพลา </v-chip
          ><v-chip outline color="yellow"> ส่งโพย </v-chip
          ><v-chip outline color="black" class="mr-2" dark>
            หวยรายวัน
          </v-chip>
          หวยรัฐบาล 01-02-2022
        </div>

        <v-data-table :headers="headerDetail" hide-default-footer> </v-data-table>
        <v-card-actions class="justify-end">
          <v-btn color="error" @click="dialogdetail = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
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
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ประเภท & หมายเลข",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอด",
          value: "amount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ส่วนลด",
          value: "discont",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "รวม",
          value: "balance",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "จ่าย",
          value: "pay",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        }
      ],
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "agent",
          value: "agent",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชนิดหวย",
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
          text: "ชื่อหวย",
          value: "lotto_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชื่องวด",
          value: "round",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชนิการเเทง",
          value: "typebet",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "วันที่",
          value: "lotto_date",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ีUsername",
          value: "username",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอดเเทง",
          value: "amount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "เเพ้/ชนะ",
          value: "winloss",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
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
