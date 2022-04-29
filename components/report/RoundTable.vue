<template>
  <div>
    <v-data-table
      :items-per-page.sync="pagination.rowsPerPage"
      :server-items-length="pagination.rowsNumber"
      :page.sync="pagination.page"
      :options.sync="options"
      :headers="headerRound"
      hide-default-footer
      :items="itemRound"
    >
      <template #[`item.no`]="{index}">
        {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
      </template>
      <template #[`item.actions`]="{item}">
        <v-tooltip bottom color="black">
          <template v-slot:activator="{ on, attrs }"
            ><v-btn
              color="black"
              v-bind="attrs"
              v-on="on"
              fab
              small
              icon
              @click="openDetail(item)"
              ><v-icon> mdi-clipboard-text</v-icon></v-btn
            ></template
          >
          <span>ดูรายการแทง</span></v-tooltip
        >
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
    <v-dialog v-model="dlTransection">
      <v-card>
        <v-card-title>
          <h2>รายละเอียดการเเทง</h2>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    datefilter: {
      type: Object,
      default: {}
    }
  },
  watch: {
    options: {
      async handler() {
        await this.getRounddata();
      },
      deep: true
    }
  },
  data() {
    return {
      dlTransection: false,
      options: {},
      itemRound: [],
      pageSizes: [5, 10, 15, 25],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      headerRound: [
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
          value: "member_username",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold text-left ",
          width: "300px"
        },
        {
          text: "ยอด(บาท)",
          value: "bet",
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
        },
        {
          text: "ดูรายละเอียด",
          value: "actions",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        }
      ]
    };
  },
  mounted() {
    this.getRounddata();
  },
  methods: {
    ...mapActions("report", ["getRoundBymemberid"]),
    openDetail(item) {
      this.dlTransection = true;
      console.log(item);
    },
    getParameter() {
      let order = this.getOptionalOrder();
      let params = {
        agent_id: this.$route.query.agentId
          ? this.$route.query.agentId
          : undefined,
        member_id: this.$route.query.memberid
          ? this.$route.query.memberid
          : undefined,
        start_time: this.datefilter.startDate,
        end_time: this.datefilter.endDate,
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
      this.getRounddata();
    },
    async getRounddata() {
      let params = this.getParameter();
      try {
        let { data: response } = await this.getRoundBymemberid(params);
        console.log(response);
        this.itemRound = response.data;
        this.pagination.rowsNumber = response.pagination.total;
      } catch (error) {}
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
    }
  }
};
</script>

<style></style>
