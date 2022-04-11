<template>
  <div>
    <h2>หวยน้ำไหล / รายงานตัวเลขสูงสุด</h2>
    <div class="pa-1 rounded-lg white my-3 pa-2">
      <div class="row py-3">
        <div class="col-12 col-sm-6 col-md-3">
          เลือกประเภทหวย
          <v-select
            :items="listtype"
            item-text="title"
            item-value="id"
            hide-details="auto"
            outlined
            v-model="selectType"
            @change="selectTypelotto"
            dense
            placeholder="กรุณาเลือกประเภทหวย"
          ></v-select>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          เลือกชนิดหวย
          <v-autocomplete
            :items="itemcategory"
            item-text="title"
            hide-details="auto"
            item-value="id"
            :disabled="selectType == null"
            v-model="selectTypeCategory"
            @change="selectRound"
            outlined
            dense
            placeholder="กรุณาเลือกชนิดของหวย"
          ></v-autocomplete>
        </div>
        <div class="col-12 col-sm-4 col-md-6 col-lg-3">
          เลือกรอบหวย
          <v-select
            :items="itemRound"
            item-value="id"
            :disabled="selectTypeCategory == null"
            item-text="bet_lotto_time"
            hide-details="auto"
            outlined
            @change="getNumberreport(toRound, 1)"
            v-model="toRound"
            dense
            placeholder="กรุณาเลือกรอบหวย"
          >
            <template v-slot:selection="{ item }">
              รอบวันที่ {{ dateformat(item.bet_lotto_time) }}
            </template>
            <template v-slot:item="{ item }">
              รอบวันที่ {{ dateformat(item.bet_lotto_time) }}
            </template></v-select
          >
        </div>
        <div class="col-12 col-sm-4 col-md-6 col-lg-3">
          เลือกชนิดตัวเลข
          <v-select
            :items="numberReportrender"
            item-value="id"
            :disabled="toRound == null"
            item-text="name"
            hide-details="auto"
            @change="getFlexoddReport"
            v-model="numberType"
            outlined
            dense
            placeholder="กรุณาเลือกชนิดตัวเลข"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="pa-1 rounded-lg white my-3 pa-2">
      <v-data-table :headers="headerReport" :items="itemRender.data">
        <template #[`item.actions`]="{item}">
          <v-btn small rounded color="primary" @click="editPay(item)"
            >แก้ไขจำนวนเงิน</v-btn
          >
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      headerReport: [
        {
          text: "เลข",
          value: "lotto_number",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "75px",
          sortable: false
        },
        {
          text: "จำนวนเงิน",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "อัตราจ่าย",
          value: "pay_out",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "กำไรขาดทุนน้ำไหล",
          value: "profit_flexodd",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "กำไรขาดทุนปกติ",
          value: "profit_flexodd",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "แก้ไชจำนวนเงิน",
          value: "actions",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        }
      ],
      itemcategory: [],
      selectTypeCategory: null,
      isLoading: false,
      itemRound: [],
      toRound: null,
      numberType: null,
      selectCate: null,
      selectType: null,
      listtype: [],
      numberReportrender: [],
      itemRender: [],
      pagination: {
        sortBy: "DESC",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    };
  },
  async fetch() {
    this.isLoading = true;
    try {
      this.listtype = this.$store.state.lottosetting.lottotype;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
  methods: {
    dateformat(date) {
      return this.$moment(String(date)).format("YYYY/MM/DD เวลา HH:mm:ss");
    },
    ...mapActions("lottosetting", [
      "getLottotype",
      "getTypeCategory",
      "getProgramLotto"
    ]),
    ...mapActions("report", ["getNumberTypeReport", "getDetailNumberReport"]),
    async selectTypelotto(value) {
      this.itemcategory = [];
      this.selectTypeCategory = "";
      try {
        this.isLoading = true;
        let params = {
          type_id: value,
          currentPage: 1,
          limit: 500
        };
        const response = await this.getTypeCategory(params);
        this.itemcategory = response.result[0].lottotype_id.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async getNumberreport(value, type) {
      console.log(type);
      let params = {
        program_id: value,
        type_purchase: type,
        page: 1,
        limit: 15
      };
      try {
        let { data } = await this.getNumberTypeReport(params);
        this.numberReportrender = data;
      } catch (error) {
        console.log(error);
      }
    },
    async selectRound(value) {
      this.toRound = "";
      let params = {
        currentPage: 1,
        limit: 1000,
        start_date: this.$moment()
          .subtract(3, "months")
          .format("YYYY-MM-DD HH:mm:ss"),
        end_date: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        order_mode: "DESC",
        order_by: "bet_lotto_time",
        TypeCategoryId: value
      };
      try {
        console.log(params);
        let { result } = await this.getProgramLotto(params);
        this.itemRound = result[0].TypeCategoryId.data.sort(function(b, a) {
          return a.bet_lotto_time.localeCompare(b.bet_lotto_time);
        });
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    getParameter() {
      let params = {
        program_id: this.toRound,
        lottonumbertype_id: this.numberType,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage
      };
      return params;
    },
    async getFlexoddReport() {
      let params = this.getParameter();
      try {
        let { data: response } = await this.getDetailNumberReport(params);
        console.log(response);
        this.itemRender = response;
      } catch (error) {
        console.log(error);
      }
    },
    editPay(item) {}
  }
};
</script>

<style></style>
