<template>
  <div>
    <h2>ยกเลิกโพย /รายการแทง</h2>

    <div class="mt-6">
      <filter-search @search="searchfunction"></filter-search>
    </div>

    <div class="white rounded-lg">
      <div class="rounded-lg white mt-5">
        <div class="my-3">
          <h3 class="pa-3">รายการแทง</h3>
          <div class=" row align-center px-4 pt-3 pb-4">
            <div class="font-weight-bold mx-2 col-12 pa-0"></div>
            <div class="col-12 pa-0">
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
          </div>
        </div>
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward">
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
          </template>
          <template #[`item.actions`]>
            <div class="d-flex justify-center">
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
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card>
        <div class="ma-2 pa-2 font-weight-bold d-flex align-center">
          <span class="primary--text">account</span><v-spacer></v-spacer>
          <v-chip outlined color="primary"> เพลา </v-chip
          ><v-chip outlined color="yellow"> ส่งโพย </v-chip
          ><v-chip outlined color="black" class="mr-2" dark>
            หวยรายวัน
          </v-chip>
          หวยรัฐบาล 01-02-2022
        </div>

        <v-data-table :headers="headerDetail" hide-default-footer>
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
          </template>
        </v-data-table>
        <v-card-actions class="justify-end">
          <v-btn color="error" @click="dialogdetail = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterSearch from "../../components/form/FilterSearch.vue";
export default {
  components: { FilterSearch },
  data() {
    return {
      typecategory: "",
      roundID: "",
      listtype: [],
      selectCate: null,
      selectType: null,
      itemcategory: [],
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
          value: "discont",
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
          text: "Username",
          value: "member_username",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอดเเทง",
          value: "bet_amount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "เเพ้/ชนะ",
          value: "winlose",
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
      itemReport: [],
      selectgroup: undefined,
      type: undefined,
      filter: {},
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 100
      }
    };
  },
  async fetch() {},
  methods: {
    async renderbyselecttype(value) {
      if (value == 0) {
        this.type = undefined;
      } else {
        this.type = value;
      }
      await this.searchfunction(this.filter);
    },
    ...mapActions("report", ["getBetReport", "getReportDetail"]),
    async searchfunction(value) {
      this.filter = value;
      this.getdata(value);
    },
    async getdata(fillter) {
      console.log(fillter, "fillter");
      console.log(this.type);

      // try {
      //   let parameter = {
      //     typecategory_id: this.typecategory,
      //     program_id: this.roundID,
      //     start_time: fillter.startDate,
      //     end_time: fillter.endDate,
      //     type_purchase: this.type,
      //     page: this.pagination.page,
      //     limit: this.pagination.rowsPerPage
      //   };
      //   let { data: report } = await this.getBetReport(parameter);
      //   this.itemReport = report.data;
      //   console.log(this.itemReport);
      // } catch (error) {
      //   console.log(error);
      // }
      // try {
      //   let parameter = {
      //     start_time: fillter.startDate,
      //     end_time: fillter.endDate,
      //     type_purchase: this.type,
      //     page: this.pagination.page,
      //     limit: this.pagination.rowsPerPage
      //   };
      //   let { data: report } = await this.getBetReport(parameter);
      //   this.itemReport = report.data;
      //   console.log(this.itemReport);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }
};
</script>

<style></style>
