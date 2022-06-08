<template>
  <div>
    <div>
      <h2>รายงานผลรางวัล</h2>
      <div v-if="isLoading">
        <loading-page></loading-page>
      </div>
      <div class="row  rounded-lg white ma-0 mb-3">
        <div class=" col-12  col-md-4 pa-0">
          <div class=" my-3 rounded-lg white">
            <h3 class="pa-3">เลือกประเภทหวยที่ต้องการค้นหา</h3>
            <v-divider></v-divider>
            <div class="pa-3 col-12 col-sm-6 col-md-12 col-lg-12">
              <v-select
                :items="listtype"
                item-text="title"
                item-value="id"
                hide-details="auto"
                @change="getReport"
                outlined
                v-model="selectType"
                dense
                placeholder="กรุณาเลือกประเภทหวย"
              ></v-select>
            </div>
          </div>
        </div>
        <div class=" col-12 col-md-8  pa-0">
          <filter-search
            @search="searchReport"
            v-if="selectType != ''"
          ></filter-search>
        </div>
      </div>

      <div class="white rounded-lg " v-show="selectType != ''">
        <h3 class="pa-4">ผลรางวัล</h3>

        <div class=" rounded-lg">
          <v-data-table
            :server-items-length="pagination.rowsNumber"
            :items-per-page.sync="pagination.rowsPerPage"
            :page.sync="pagination.page"
            :options.sync="options"
            :headers="headersdatelotto"
            hide-default-footer
            :items="itemtypeaward"
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
            <template #[`item.no`]="{index}">
              {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
            </template>
            <template #[`item.action`]="{item}">
              <v-btn
                rounded
                color="primary"
                small
                @click="openawardTypenumber(item)"
                ><v-icon left>mdi-magnify</v-icon>ดูผลรางวัล
              </v-btn>
            </template>
            <template #[`item.bet_lotto_time`]="{item}">
              {{ dateformat(item.bet_lotto_time) }}
            </template>
          </v-data-table>
          <v-row align="baseline" class="ma-3 ">
            <v-col cols="12" sm="2" lg="2" xl="1">
              <v-select
                dense
                outlined
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

        <v-dialog
          v-model="dlTypeAward"
          :overlay="false"
          max-width="800px"
          transition="dialog-transition"
        >
          <v-card class="pa-3">
            <v-card-title
              ><h3>
                ผลรางวัล :
                <span class="primary--text">{{
                  itemDetail.typecategory_title
                }}</span>
              </h3></v-card-title
            >
            <v-data-table
              :items="itemDetail.lottonumber_detail"
              :headers="headerDetail"
              hide-default-footer
            >
              <template #[`item.lotto_number`]="{item}">
                <div v-if="!item.lotto_number">
                  <span class="font-weight-bold error--text">ยังไม่ออกผล</span>
                </div>
                <div v-else>
                  <div
                    class="font-weight-bold success--text d-flex justify-center"
                    v-if="Array.isArray(item.lotto_number) === true"
                  >
                    <div
                      v-for="(item, i) in item.lotto_number"
                      :key="i"
                      class="mx-2"
                    >
                      {{ `${item}` }}
                    </div>
                  </div>
                  <div v-else class="font-weight-bold success--text">
                    {{ item.lotto_number }}
                  </div>
                </div>
              </template>
              <template #[`item.bet_lotto_time`]="{item}">
                {{ dateformat(item.bet_lotto_time) }}
              </template></v-data-table
            >
            <v-card-actions class="justify-end mt-3">
              <v-btn color="error" @click="dlTypeAward = false">ปิด</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterSearch from "../../components/form/FilterSearch.vue";
import LoadingFullpage from "../../components/form/LoadingFullpage.vue";
import LoadingPage from "../../components/form/LoadingPage.vue";
export default {
  components: { FilterSearch, LoadingFullpage, LoadingPage },
  data() {
    return {
      isLoading: false,
      options: {},
      dlTypeAward: false,
      selectType: "",
      listtype: [],
      headerDetail: [
        {
          text: "ประเภทตัวเลข",
          value: "lottonumbertype_name",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "วันที่",
          value: "bet_lotto_time",
          align: "left",
          class: "font-weight-bold"
        },
        {
          text: "ตัวเลขผลรางวัล",
          value: "lotto_number",
          sort: false,
          align: "center",
          class: "font-weight-bold",
          width: "200px"
        }
      ],
      itemDetail: [],
      headersdatelotto: [
        {
          text: "ลำดับที่",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "100px"
        },
        {
          text: "ชนิดหวย",
          value: "typecategory_title",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "วันที่",
          value: "bet_lotto_time",
          align: "center",
          class: "font-weight-bold",
          width: "300px"
        },
        {
          text: "ดูผล",
          value: "action",
          sort: false,
          align: "center",
          class: "font-weight-bold",
          width: "200px"
        }
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      itemtypeaward: [],
      selecttype: "",
      filter: {
        Date: "",
        month: ""
      },
      pageSizes: [5, 10, 15, 25]
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getReport();
      },
      deep: true
    }
  },
  async fetch() {
    try {
      this.isLoading = true;
      this.listtype = this.$store.state.lottosetting.lottotype;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("lottosetting", ["getLottotype", "getTypeCategory"]),
    ...mapActions("report", ["getReportNumber"]),
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getReport();
    },
    async openawardTypenumber(item) {
      console.log(item);
      this.itemDetail = item;
      this.dlTypeAward = true;
    },
    selectTypelotto(value) {
      console.log(value);
    },
    dateformat(date) {
      return this.$moment(String(date)).format("YYYY/MM/DD เวลา HH:mm:ss");
    },
    searchReport(filter) {
      this.filter = filter;
      this.getReport();
      this.isLoading = true;
    },
    getParameter() {
      let order = this.getOptionalOrder();
      let parameter = {
        lottotype_id: this.selectType,
        start_date: this.filter.startDate,
        end_date: this.filter.endDate,
        currentPage: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        order_by: order == undefined ? undefined : order.sortBy,
        order_mode: order == undefined ? undefined : order.sortDesc
      };
      return parameter;
    },
    getOptionalOrder() {
      let order = {};
      if (this.options.sortBy[0]) {
        console.log("thissss");
        order.sortBy = this.options.sortBy[0];
        if (this.options.sortDesc[0] === false) {
          order.sortDesc = "ASC";
        } else {
          order.sortDesc = "DESC";
        }
      } else {
        order = undefined;
      }
      return order;
    },
    async getReport() {
      let params = await this.getParameter();
      try {
        this.isLoading = true;
        console.log(params)
        let { result } = await this.getReportNumber(params);
        this.itemtypeaward = result.data;
        this.pagination.rowsNumber = result.total;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style></style>
