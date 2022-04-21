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
          <v-radio label="ทั้งหมด" value="0"></v-radio>
          <v-radio label="น้ำไหล" value="1"></v-radio>
          <v-radio label="เพลา" value="2"></v-radio>
        </v-radio-group>
      </div>
      <v-data-table
        :headers="headerTable"
        :items="datarender"
        :items-per-page.sync="pagination.rowsPerPage"
        :page.sync="pagination.page"
        hide-default-footer
        :options.sync="options"
      >
        <template #[`item.no`]="{index}">
          {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
        </template>
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
      <v-row align="baseline" class="ma-3 ">
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
            :total-visible="7"
            :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterSearch from "../../components/form/FilterSearch.vue";
export default {
  components: { FilterSearch },
  data() {
    return {
      options: {},
      type: undefined,
      datarender: [],
      selectgroup: undefined,
      datefilter: {},
      pageSizes: [5, 10, 15, 25],
      headerTable: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
          width: "75px"
        },
        {
          text: "Username",
          value: "agent_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "300px"
        },
        {
          text: "Bet(บาท)",
          value: "bet_amount",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "Turnover(บาท)",
          value: "turnover",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "Payout(บาท)",
          value: "payout",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },

        {
          text: "ยอดได้เสีย(บาท)",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        }
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getReportdata();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("report", ["getReportWinlose"]),
    async renderbyselecttype(value) {
      this.pagination.page = 1;
      if (value == 0) {
        this.type = undefined;
      } else {
        this.type = value;
      }
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
        order = undefined;
      }
      return order;
    },
    getParameter() {
      let order = this.getOptionalOrder();
      let params = {
        start_time: this.datefilter.startDate,
        end_time: this.datefilter.endDate,
        type_purchase: this.type,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        sort:
          order == undefined ? undefined : `${order.sortBy}=${order.sortDesc}`
      };
      return params;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getReportdata();
    },
    searchfunction(value) {
      this.pagination.page = 1;
      this.datefilter = value;
      console.log(value);
      this.getReportdata();
    },
    async getReportdata() {
      let params = this.getParameter();
      console.log(params);
      try {
        let { data: response } = await this.getReportWinlose(params);
        console.log(response);
        this.datarender = response.data;
        this.pagination.rowsNumber = response.pagination.total;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
