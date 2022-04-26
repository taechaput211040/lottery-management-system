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
    <div v-if="numberType != null">
      <div class="pa-1 rounded-lg white my-3 pa-2">
        <div class="text-center py-3">
          {{ payoutrate.lottonumbertype_name }}
          <h3>
            อันดับหมายเลข :
            <span class="primary--text">{{
              this.payoutrate.lottonumbertype_name
            }}</span>
          </h3>
        </div>
        <VueApexCharts
          ref="realtimeChart"
          type="bar"
          height="350"
          :options="chartOptions"
          :series="itemgraphshow"
        ></VueApexCharts>
      </div>
      <v-dialog v-model="dledit" max-width="300px" persistent>
        <v-form v-model="valid" ref="formconfig"
          ><v-card class="pa-2">
            <v-card-title><h3>เพิ่มข้อมูลจำลอง</h3></v-card-title>
            <div class="pa-2 rounded-lg elevation-2 white">
              <v-text-field
                label="หมายเลข"
                dense
                filled
                disabled
                v-model="formEdit.lotto_number"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                label="ยอดอัตราจ่ายจำลอง"
                outlined
                placeholder="กรอกอัตราจ่ายจำลอง"
                dense
                :rules="[v => !!v || 'กรุณากรอกกำไรขั้นต่ำ']"
                type="number"
                class="my-2"
                hide-details="auto"
                v-model="formEdit.fakeValue"
              ></v-text-field>
            </div>
            <v-card-actions class="justify-center">
              <v-btn color="success" @click="submitConfig()">ยืนยัน</v-btn>
              <v-btn color="error" @click="closeform()"
                >ปิด</v-btn
              ></v-card-actions
            >
          </v-card></v-form
        >
      </v-dialog>
      <div class="my-3 rounded-lg white">
        <h3 class="pa-3">รายละเอียดน้ำไหล</h3>
        <v-divider></v-divider>
        <div class="row pa-3">
          <div class="col-12 col-sm-3">
            รายรับทั้งหมด(บาท)
            <v-text-field
              placeholder="รายรับทั้งหมด"
              hide-details="auto"
              dense
              filled
              disabled
              :value="this.maximumIncomeAmount || 10"
            ></v-text-field>
          </div>
          <div class="col-12 col-sm-3">
            กำไรขั้นต่ำ(บาท)
            <v-text-field
              placeholder="รายรับทั้งหมด"
              hide-details="auto"
              dense
              filled
              :value="minimumProfit"
              disabled
            ></v-text-field>
          </div>
          <div class="col-12 col-sm-3">
            อัตราจ่ายสูงสุด(บาท)
            <v-text-field
              placeholder="อัตราจ่ายสูงสุด"
              hide-details="auto"
              dense
              filled
              disabled
              :value="this.payoutrate.maximum_out_come_rate || 0"
            ></v-text-field>
          </div>
        </div>
        <v-data-table
          :headers="headerReport"
          :items="itemRender.data"
          :server-items-length="pagination.rowsNumber"
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :options.sync="options"
          hide-default-footer
        >
          <template #[`item.bet_amount`]="{item}">
            {{ numberWithCommas(item.bet_amount + item.bet_fake) }}
          </template>
          <!-- อัตราจ่าย -->
          <template #[`item.payrate`]="{item}">
            {{ numberWithCommas(calPayrate(item)) }}
          </template>
          <!-- อัตราจ่าย -->
          <!-- จ่ายเงิน -->
          <template #[`item.pay_out`]="{item}">
            {{ numberWithCommas(profitNormal(item)) }}
          </template>
          <!-- จ่ายเงิน -->
          <template #[`item.profit_flexodd`]="{item}">
            {{ numberWithCommas(getWinloseFlex(item)) }}</template
          >
          <!-- กำไรขาดทุนปกติ -->
          <template #[`item.profit`]="{item}">
            {{ numberWithCommas(getWinloseNormal(item)) }}
          </template>
          <!-- กำไรขาดทุนปกติ -->
          <template #[`item.actions`]="{item}">
            <v-btn small rounded color="primary" @click="editPay(item)"
              >แก้ไข</v-btn
            >
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="2">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="pagination.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChange"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="pagination.page"
              :total-visible="7"
              :length="
                Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  components: { VueApexCharts },
  comments: {
    numberFormat() {
      return (number, digit = 2, comma = true) => {
        if (typeof number == "string") {
          number = this.convertToFloat(number);
        }
        if (!number) {
          return 0;
        } else {
          return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: digit,
            maximumFractionDigits: digit,
            useGrouping: comma
          }).format(number);
        }
      };
    }
  },
  watch: {
    options: {
      async handler() {
        await this.getFlexoddReport();
      },
      deep: true
    }
  },
  data() {
    return {
      valid: false,
      formEdit: {},
      dledit: false,
      pageSizes: [5, 10, 15, 25],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      options: {},
      maximumIncomeAmount: 161,
      per_flex_rate: 10,
      payoutrate: {
        maximum_out_come_rate: 999
      },
      itemgraphshow: [
        {
          name: "จำนวนเงิน",
          data: [
            { x: "asdasd", y: 40 },
            { x: "asdasd", y: 12 },
            { x: "asdasd", y: 10 },
            { x: "asdasd", y: 50 }
          ]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%"
          }
        },
        chart: {
          height: 350,
          type: "bar",
          foreColor: "#999",
          stacked: true
        },
        fill: {
          type: "solid",
          fillOpacity: 0.7
        },

        dataLabels: {
          enabled: false
        },
        colors: ["#00E396"],
        stroke: {
          curve: "smooth"
        }
      },
      itemRender: {
        data: [
          { lotto_number: "756", bet: 123 },
          { lotto_number: "245", bet: 332 },
          { lotto_number: "137", bet: 222 },
          { lotto_number: "135", bet: 133 }
        ],
        count: [
          { lotto_number: "756", count: 5 },
          { lotto_number: "245", count: 6 },
          { lotto_number: "137", count: 9 },
          { lotto_number: "135", count: 8 }
        ]
      },

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
          value: "bet_amount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "อัตราจ่าย",
          value: "payrate",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "จ่ายเงิน",
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
          value: "profit",
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
      itemPayrate: [],
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
    this.getPerFlex();
    this.isLoading = true;
    try {
      this.listtype = this.$store.state.lottosetting.lottotype;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
  computed: {
    minimumProfit() {
      let profit = (this.per_flex_rate * this.maximumIncomeAmount) / 100;
      return profit;
    }
  },
  methods: {
    async mapchart(item) {
      this.itemgraphshow[0].data = [];
      for (let i = 0; i < item.length; i++) {
        this.itemgraphshow[0].data.push({
          x: `เลข ${item[i].lotto_number}`,
          y: item[i].bet_amount + item[i].bet_fake
        });
      }
      this.$refs.realtimeChart.updateSeries(this.itemgraphshow, false, true);
    },
    getWinloseAmount(item) {
      let outcomrateAmount = parseFloat(this.maximumIncomeAmount);
      let winlose = outcomrateAmount - parseFloat(item);
      return winlose;
    },
    getRecieve_max() {
      let Recieve_max =
        parseFloat(this.maximumIncomeAmount) - parseFloat(this.minimumProfit);
      return Recieve_max;
    },
    getWinloseNormal(item) {
      let winlose = 0;
      winlose =
        parseFloat(this.maximumIncomeAmount) -
        (item.bet_amount + item.bet_fake) *
          this.payoutrate.maximum_out_come_rate;

      return winlose;
    },
    // เชค winloseflexood
    checkFlex_odd(item) {
      let Recieve_max = this.getRecieve_max();
      if (
        (item.bet_amount + item.bet_fake) *
          this.payoutrate.maximum_out_come_rate >
        Recieve_max
      ) {
        return true;
      } else {
        return false;
      }
    },
    // เชค winloseflexood

    // colomn winloseflexood
    getWinloseFlex(item) {
      let wlflexodd = 0;
      if (this.checkFlex_odd(item)) {
        wlflexodd = this.minimumProfit;
      } else {
        wlflexodd = this.getWinloseAmount(this.profitNormal(item));
      }
      return wlflexodd;
    },
    // colomn winloseflexood

    async getPerFlex() {
      try {
        let { data } = await this.getPerflex();
        this.per_flex_rate = data.result.profit;
      } catch (error) {
        console.log(error);
      }
    },
    //colomn จ่ายเงิน
    numberWithCommas(x) {
      var parts = x
        .toFixed(2)
        .toString()
        .split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    checkDupicatenumber(number) {
      const res = [];
      const result = [];
      const count = {};
      let counByDupicate;
      for (let i = 0; i < number.length; i++) {
        res.push(number[i]);
      }

      res.forEach(item => {
        if (count[item]) {
          count[item] += 1;
          return;
        }
        count[item] = 1;
      });

      for (let prop in count) {
        if (count[prop] >= 2) {
          result.push(prop);
        }
      }
      counByDupicate = Object.keys(count).length;
      return counByDupicate;
    },
    profitNormal(item) {
      let profit;
      let countNum = this.checkDupicatenumber(item.lotto_number);

      if (this.checkFlex_odd(item)) {
        profit = this.getRecieve_max();
      } else {
        profit = parseFloat(
          (item.bet_amount + item.bet_fake) *
            this.payoutrate.maximum_out_come_rate
        );
      }
      if (this.payoutrate.lottonumbertype_name === "สามตัวหน้า") {
        if (parseInt(countNum) >= 2) {
          profit = profit / 4;
        } else {
          profit = profit;
        }
      } else if (this.payoutrate.lottonumbertype_name === "สามตัวโต๊ด") {
        if (parseInt(countNum) === 1) {
          profit = profit;
        } else if (parseInt(countNum) === 2) {
          profit = profit / 4;
        } else {
          profit = profit / 6;
        }
      } else if (this.payoutrate.lottonumbertype_name === "สามตัวล่าง") {
        profit = profit / 2;
      } else if (this.payoutrate.lottonumbertype_name === "วิ่งบน") {
        profit = profit / 3;
      } else if (this.payoutrate.lottonumbertype_name === "วิ่งล่าง") {
        profit = profit / 2;
      }
      return profit;
    },
    //colomn จ่ายเงิน
    //column payrate
    calPayrate(item) {
      let payrate = 0;
      if (this.checkFlex_odd(item)) {
        payrate = this.profitNormal(item) / (item.bet_amount + item.bet_fake);
      } else {
        payrate = this.payoutrate.maximum_out_come_rate;
      }

      return payrate;
    },
    //column payrate
    dateformat(date) {
      return this.$moment(String(date)).format("YYYY/MM/DD เวลา HH:mm:ss");
    },
    ...mapActions("lottosetting", [
      "getLottotype",
      "getTypeCategory",
      "getProgramLotto"
    ]),
    ...mapActions("report", [
      "getNumberTypeReport",
      "getDetailNumberReport",
      "betFake"
    ]),
    ...mapActions("flexodd", ["getOutcomerate", "getPerflex"]),

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
      let round;
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
        let { result } = await this.getProgramLotto(params);
        round = result[0].TypeCategoryId.data.sort(function(b, a) {
          return b.bet_lotto_time.localeCompare(a.bet_lotto_time);
        });
        this.itemRound = round.filter(x => {
          return x.status_calculate != true;
        });
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.getOutcome();
    },
    getParameter() {
      let params = {
        program_id: this.toRound,
        lottonumbertype_id: this.numberType,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        sort: "bet_amount=DESC",
        type_purchase: 1
      };
      return params;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getFlexoddReport();
    },
    async getFlexoddReport() {
      let params = this.getParameter();
      try {
        let { data: response } = await this.getDetailNumberReport(params);

        this.itemRender = response;
        this.maximumIncomeAmount = this.itemRender.sum.bet_amount;
        this.pagination.rowsNumber = this.itemRender.pagination.total;
        this.mapchart(this.itemRender.data);
      } catch (error) {
        console.log(error);
      }
      this.payoutrate = this.mapNumbertype();
    },
    mapNumbertype() {
      let type = this.itemPayrate.find(x => {
        return x.lottonumbertype_id === this.numberType;
      });
      if (!type) {
        return 0;
      }
      return type;
    },
    async getOutcome() {
      try {
        let { data: response } = await this.getOutcomerate(
          this.selectTypeCategory
        );
        this.itemPayrate = response.result;
      } catch (error) {}
    },
    editPay(item) {
      this.dledit = true;
      this.formEdit = Object.assign({}, item);
    },
    closeform() {
      this.dledit = false;
      this.$refs.formconfig.reset();
      this.$refs.formconfig.resetValidation();
    },
    checkpositive(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async submitConfig() {
      let body = {
        program_id: this.toRound,
        typecategory_id: this.selectTypeCategory,
        lottonumbertype_id: this.numberType,
        bet_details: [
          {
            lotto_number: this.formEdit.lotto_number,
            bet: this.formEdit.fakeValue
          }
        ]
      };
      if (this.$refs.formconfig.validate()) {
        try {
          await this.betFake(body);
          this.$swal({
            icon: "success",
            title: "เเก้ไขเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          this.dledit = false;
          await this.getFlexoddReport();
        } catch (error) {
          console.log("faile");
          console.log(error);
        }
      } else {
        this.$swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");
      }
    }
  }
};
</script>

<style></style>
