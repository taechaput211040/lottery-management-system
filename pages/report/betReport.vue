<template>
  <div>
    <h2>รายการแทง</h2>
    <loading-page v-if="isLoading"></loading-page>
    <div class="row rounded-lg white ma-0 mb-3">
      <div class="col-12 col-md-4 pa-0">
        <div class="my-3 rounded-lg white">
          <h3 class="pa-3">การแทง</h3>
          <v-divider></v-divider>
          <div class="pa-3 col-12 col-sm-6 col-md-12 col-lg-12">
            <v-text-field
              dense
              solo-inverted
              hide-details="auto"
              label="ค้นหา"
              v-model="searchInput"
              class="mb-3"
              @keyup.enter="searchReport()"
            ></v-text-field>
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
      <div class="col-12 col-md-8 pa-0">
        <filter-search @search="searchfunction"></filter-search>
      </div>
    </div>

    <div class="white rounded-lg">
      <div class="rounded-lg white mt-5">
        <div class="my-3">
          <h3 class="pa-3">ยอดรายการแทง</h3>
          <v-divider></v-divider>
          <div class="row align-center px-4 pt-3 pb-4">
            <div class="row pt-3 text-center">
              <div class="col-6 col-sm-3 col-md-2">
                <div class="elevation-2 rounded-lg pa-2">
                  ยอดเเทงรวม
                  <h4>{{ numberWithCommas(summary.bet_amount) }} บาท</h4>
                </div>
              </div>
              <div class="col-6 col-sm-3 col-md-2">
                <div class="elevation-2 rounded-lg pa-2">
                  ยอดรวมแพ้/ชนะ
                  <h4>{{ numberWithCommas(summary.winlose) }} บาท</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-data-table
          :server-items-length="pagination.rowsNumber"
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :options.sync="options"
          hide-default-footer
          :headers="headersdatelotto"
          :items="itemReport"
          class="pb-2 elevation-1"
        >
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
          <template #[`item.no`]="{ index }">
            {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
          </template>
          <template #[`item.actions`]="{ item }">
            <div class="d-flex justify-center">
              <!-- เพลา -->
              <!-- <v-tooltip bottom color="black" dark>
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
                    <v-icon dark> mdi-clipboard-text </v-icon>
                  </v-btn></template
                >
                <span>ดูรายละเอียดโพยแทง</span>
              </v-tooltip> -->
              <!-- น้ำไหล -->
              <!-- <v-tooltip bottom color="warning" dark>
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
                    <v-icon dark> mdi-clipboard-account </v-icon>
                  </v-btn></template
                >
                <span>ดูรายละเอียดโพยรับของ</span>
              </v-tooltip> -->

              <!-- รวม -->
              <v-btn
                rounded
                color="primary"
                small
                @click="getDetail(item, 2)"
                ><v-icon left>mdi-magnify</v-icon>ดูผลรางวัล
              </v-btn>
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
          </template>
          <template #[`item.winlose`]="{ item }">
            {{ numberWithCommas(item.winlose) }}
          </template>
          <template #[`item.bet`]="{ item }">
            {{ numberWithCommas(item.bet) }}
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
          <v-col cols="12" sm="2" lg="2" xl="1">
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
              @input="handlePageChange(pagination.page)"
              :total-visible="7"
              :length="
                Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card>
        <v-card-actions class="justify-center">
          <h2 v-if="detailstype == 1">รายละเอียดโพยเเทง</h2>
          <h2 v-else>รายละเอียดโพยรับของ</h2>
        </v-card-actions>
        <v-divider></v-divider>
        <div class="pa-3 font-weight-bold row ma-0 align-center">
          <div class="col-12 col-sm-6 pa-0">
            <v-chip label outlined color="green" class="green--text"
              ><v-icon left>mdi-account</v-icon
              >{{ itemDetail.member_username }}</v-chip
            >
          </div>
          <div class="col-12 col-sm-6 pa-0 mt-2 text-md-right">
            <v-chip outlined color="primary mx-2">
              {{ itemDetail.typepurchase_name }} </v-chip
            ><v-chip outlined color="black" class="mr-2" dark>
              {{ itemDetail.lotto_round }}
            </v-chip>
            {{ itemDetail.date }}
          </div>
        </div>

        <v-data-table
          :server-items-length="paginationDetail.rowsNumber"
          :items-per-page.sync="paginationDetail.rowsPerPage"
          :options.sync="optionsDetail"
          hide-default-footer
          :page.sync="paginationDetail.page"
          :headers="headerDetail"
          :items="itemDetail.data"
          class="elevation-1"
        >
          <template #[`item.status`]="{ item }">
            <v-chip color="yellow" v-if="parseInt(item.status) == 0" dark small
              ><v-icon left>mdi-circle</v-icon>กำลังประมวลผล</v-chip
            >
            <v-chip color="green" v-if="parseInt(item.status) == 1" dark small
              ><v-icon left>mdi-circle</v-icon>รับแทง</v-chip
            >
            <v-chip color="error" v-else dark small
              ><v-icon left>mdi-circle</v-icon>ยกเลิก</v-chip
            >
          </template>
          <template #[`item.agent_selfrecaive_name`]="{ item }">
            <span v-if="!item.agent_selfrecaive_name">-</span>
            <span v-else>{{ item.agent_selfrecaive_name }}</span>
          </template>

          <template #[`item.no`]="{ index }">
            {{
              paginationDetail.rowsPerPage * (paginationDetail.page - 1) +
              (index + 1)
            }}
          </template>
          <template #[`item.winlose`]="{ item }">
            {{ numberWithCommas(item.winlose) }}
          </template>
          <template #[`item.bet`]="{ item }">
            {{ numberWithCommas(item.bet) }}
          </template>
          <template #[`item.payout`]="{ item }">
            {{ numberWithCommas(item.payout) }}
          </template>
          <template #[`item.discount`]="{ item }">
            {{ numberWithCommas(item.discount) }}
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
          <v-col cols="12" sm="2" lg="2">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="paginationDetail.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChangeDetail"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="paginationDetail.page"
              :total-visible="7"
              :length="
                Math.ceil(
                  paginationDetail.rowsNumber / paginationDetail.rowsPerPage
                )
              "
            ></v-pagination>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn color="error" @click="closedialog()">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterSearch from "../../components/form/FilterSearch.vue";
import LoadingPage from "../../components/form/LoadingPage.vue";
export default {
  components: { FilterSearch, LoadingPage },
  data() {
    return {
      isLoading: false,
      pageSizes: [5, 10, 15, 25],
      optionsDetail: {},
      typecategory: "",
      roundID: "",
      listtype: [],
      itemDetail: {},
      options: {},
      selectCate: null,
      summary: {},
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
          width: "75px",
          sortable: false,
        },
        {
          text: "ประเภท",
          value: "lottonumbertype_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "หมายเลข",
          value: "lotto_number",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "ยอด",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "ส่วนลด(บาท)",
          value: "discount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "รวม(บาท)",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "จ่าย(บาท)",
          value: "payout",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        // {
        //   text: "Agent รับของ",
        //   value: "agent_selfrecaive_name",
        //   align: "center",
        //   class: "font-weight-bold",
        //   cellClass: "font-weight-bold",

        //   sortable: false
        // },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
      ],
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "agent",
          value: "agent_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "ชนิดหวย",
          value: "lottotype_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "ชื่อหวย",
          value: "title",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "ชื่องวด",
          value: "lotto_round",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "ชนิดการเเทง",
          value: "typepurchase_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "วันที่",
          value: "date",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "Username",
          value: "member_username",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "ยอดเเทง(บาท)",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "เเพ้/ชนะ(บาท)",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
        },
      ],
      itemtypeaward: [
        {
          type: "หวยดาวน์โจนส์ VIP",
          lottodate: "09-02-2022",
          date: "10-02-2022",
          threeup: "674",
          twoup: "74",
          twodown: "01",
        },
      ],
      itemReport: [],
      selectgroup: undefined,
      type: undefined,
      filter: {},
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      paginationDetail: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      detailstype: "",
      itemDetailOpen: {},
      searchInput: "",
    };
  },
  watch: {
    optionsDetail: {
      async handler() {
        await this.getRenderNumberlotto();
      },
      deep: true,
    },
  },
  async fetch() {},
  methods: {
    handlePageChange(size) {
      this.pagination.page = size;
      this.getReportdata();
    },
    closedialog() {
      this.dialogdetail = false;
      this.paginationDetail = {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      };
    },
    async renderbyselecttype(value) {
      this.pagination.page = 1;
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
      "getTransaction",
    ]),
    async searchfunction(value) {
      this.filter = value;
      this.getReportdata();
    },
    getOptionalOrder() {
      let order = {};
      if (this.options.sortBy[0]) {
        order.sortBy = this.options.sortBy[0];
        if (this.options.sortDesc[0] === false) {
          order.sortDesc = "ASC";
        } else {
          order.sortDesc = "DESC";
        }
      } else {
        order = "date=DESC";
      }
      return order;
    },
    searchReport() {
      this.getReportdata();
      this.pagination.page = 1;
    },
    getparameter() {
      let order = this.getOptionalOrder();
      let params = {
        start_time: this.filter.startDate,
        end_time: this.filter.endDate,
        type_purchase: this.type,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        search: this.searchInput,
        sort:
          order == "date=DESC"
            ? "date=DESC"
            : `${order.sortBy}=${order.sortDesc}`,
      };
      return params;
    },
    async handlePageSizeChangeDetail(size) {
      this.paginationDetail.page = 1;
      this.paginationDetail.rowsPerPage = size;
      this.getRenderNumberlotto();
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getReportdata();
    },
    async getReportdata() {
      this.isLoading = true;
      try {
        let params = this.getparameter();
        let { data: response } = await this.getReportDetail(params);
        console.log(response);
        this.summary = response.summary;
        this.itemReport = response.data;
        this.pagination.rowsNumber = response.pagination.total;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    getparameterDetail() {
      let params = {
        member_id: this.itemDetailOpen.member_id,
        round_id: this.itemDetailOpen.id,
        type_purchase: this.detailstype,
        page: this.paginationDetail.page,
        limit: this.paginationDetail.rowsPerPage,
      };
      return params;
    },
    async getRenderNumberlotto() {
      this.isLoading = true;
      let params = this.getparameterDetail();
      // console.log(params.type_purchase)
      try {
        let { data: res } = await this.getTransaction(params);

        if(!res.data[0]){
          this.detailstype = 1;
          params = this.getparameterDetail();
          var newData = await this.getTransaction(params);
          res = newData.data
        }
        // console.log(res)
        let details = {
          typepurchase_name: this.itemDetailOpen.typepurchase_name,
          lotto_round: this.itemDetailOpen.lotto_round,
          title: this.itemDetailOpen.title,
          date: this.itemDetailOpen.date,
          member_username: this.itemDetailOpen.member_username,
        };
        this.itemDetail = { ...res, ...details };
        this.paginationDetail.rowsNumber = this.itemDetail.pagination.total;
        console.log(this.itemDetail);
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async getDetail(item, value) {
      this.itemDetailOpen = item;
      this.detailstype = value;
      this.getRenderNumberlotto();
      this.dialogdetail = true;
    },
    numberWithCommas(x) {
<<<<<<< HEAD
      var parts = parseFloat(x)
        .toFixed(2)
        .toString()
        .split(".");
=======
      var parts = parseInt(x).toFixed(2).toString().split(".");
>>>>>>> yeekeeSetting
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
};
</script>

<style></style>
