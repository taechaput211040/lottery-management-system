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
                <v-radio label="ทั้งหมด" value="0"></v-radio>
                <v-radio label="น้ำไหล" value="1"></v-radio>
                <v-radio label="เพลา" value="2"></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
        <v-data-table :headers="headersdatelotto" :items="itemReport">
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
          <template #[`item.no`]="{index}">
            {{ index + 1 }}
          </template>
          <template #[`item.actions`]="{item}">
            <div class="d-flex justify-center">
              <v-tooltip bottom color="black" dark>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mx-1"
                    :options.sync="options"
                    fab
                    dark
                    x-small
                    color="black"
                    @click="getDetail(item, 1)"
                  >
                    <v-icon dark>
                      mdi-clipboard-text
                    </v-icon>
                  </v-btn></template
                >
                <span>ดูรายละเอียดโพยแทง</span>
              </v-tooltip>
              <v-tooltip bottom color="warning" dark>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mx-1"
                    fab
                    dark
                    x-small
                    color="warning"
                    @click="getDetail(item, 2)"
                  >
                    <v-icon dark>
                      mdi-clipboard-account
                    </v-icon>
                  </v-btn></template
                >
                <span>ดูรายละเอียดโพยรับของ</span>
              </v-tooltip>
              <!-- <v-tooltip bottom color="error" dark>
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
              </v-tooltip> -->
            </div>
            <v-card cl></v-card>
          </template>
        </v-data-table>
        
      </div>
    </div>
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card>
        <div class="ma-2 pa-2 font-weight-bold d-flex align-center">
          <v-chip  outlined color="green" class="green--text " 
            ><v-icon left>mdi-account</v-icon
            >{{ itemDetail.member_username }}</v-chip
          ><v-spacer></v-spacer>
          <v-chip outlined color="primary mx-2">
            {{ itemDetail.typepurchase_name }} </v-chip
          ><v-chip outlined color="black" class="mr-2" dark>
            {{ itemDetail.lotto_round }}
          </v-chip>
          {{ itemDetail.date }}
        </div>

        <v-data-table :headers="headerDetail" :items="itemDetail.data" class="elevation-1">
          <template #[`item.no`]="{index}">
            {{ index + 1 }}
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
      itemDetail: {},
      options: {},
      selectCate: null,
      selectType: null,
      itemcategory: [],
      itemReport: [],
      headerDetail: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "75px"
        },
        {
          text: "ประเภท",
          value: "lottonumbertype_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "หมายเลข",
          value: "lotto_number",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอด",
          value: "bet_amount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ส่วนลด",
          value: "discount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "รวม",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "จ่าย",
          value: "payout",
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
          value: "agent_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชนิดหวย",
          value: "lottotype_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชื่อหวย",
          value: "title",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชื่องวด",
          value: "lotto_round",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชนิดการเเทง",
          value: "typepurchase_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "วันที่",
          value: "date",
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
        rowsNumber: 0
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
      this.getReportdata();
    },
    ...mapActions("report", [
      "getBetReport",
      "getReportDetail",
      "getTransaction"
    ]),
    async searchfunction(value) {
      this.filter = value;
      this.getReportdata();
    },
    getparameter() {
      let params = {
        start_time: this.filter.startDate,
        end_time: this.filter.endDate,
        type_purchase: this.type,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage
      };
      return params;
    },
    async getReportdata() {
      let params = this.getparameter();
      let { data: response } = await this.getReportDetail(params);
      this.itemReport = response.data;
    },
    async getDetail(item, value) {
      let params = {
        member_id: item.member_id,
        program_id: item.program_id,
        type_purchase: value
      };
      try {
        let { data: res } = await this.getTransaction(params);
        let details = {
          typepurchase_name: item.typepurchase_name,
          lotto_round: item.lotto_round,
          title: item.title,
          date: item.date,
          member_username: item.member_username
        };
        this.itemDetail = { ...res, ...details };
        console.log(this.itemDetail);
      } catch (error) {
        console.log(error);
      }

      this.dialogdetail = true;
    }
  }
};
</script>

<style></style>
