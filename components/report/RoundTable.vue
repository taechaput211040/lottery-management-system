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
              @click="openDetail(item, 1)"
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
    <v-dialog v-model="dlTransection" max-width="800px">
      <v-card>
        <v-card-title class="justify-center">
          <h2>รายละเอียดโพยเเทง</h2>
        </v-card-title>
        <v-divider></v-divider>

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
          <template #[`item.status`]="{item}">
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
          <template #[`item.agent_selfrecaive_name`]="{item}">
            <span v-if="!item.agent_selfrecaive_name">-</span>
            <span v-else>{{ item.agent_selfrecaive_name }}</span>
          </template>

          <template #[`item.no`]="{index}">
            {{
              paginationDetail.rowsPerPage * (paginationDetail.page - 1) +
                (index + 1)
            }}
          </template>
          <template #[`item.winlose`]="{item}">
            {{ numberWithCommas(item.winlose) }}
          </template>
          <template #[`item.bet`]="{item}">
            {{ numberWithCommas(item.bet) }}
          </template>
          <template #[`item.payout`]="{item}">
            {{ numberWithCommas(item.payout) }}
          </template>
          <template #[`item.discount`]="{item}">
            {{ numberWithCommas(item.discount) }}
          </template>
        </v-data-table>

        <v-row align="baseline" class="ma-3 ">
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
        <v-card-actions class="justify-center">
          <v-btn color="error" @click="closedialog()">ปิด</v-btn>
        </v-card-actions>
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
    },
    optionsDetail: {
      async handler() {
        await this.getRenderNumberlotto();
      },
      deep: true
    }
  },

  data() {
    return {
      itemDetailOpen: {},
      headerDetail: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "75px",
          sortable: false
        },
        {
          text: "ประเภท",
          value: "lottonumbertype_name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "หมายเลข",
          value: "lotto_number",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "ยอด",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "ส่วนลด(บาท)",
          value: "discount",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "รวม(บาท)",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "จ่าย(บาท)",
          value: "payout",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
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
          sortable: false
        }
      ],
      itemDetail: {},
      optionsDetail: {},
      paginationDetail: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
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
      ],
      detailstype: ""
    };
  },

  mounted() {
    this.getRounddata();
  },
  methods: {
    ...mapActions("report", ["getRoundBymemberid", "getTransaction"]),
    getparameterDetail() {
      let params = {
        member_id: this.itemDetailOpen.member_id,
        round_id: this.itemDetailOpen.round_id,
        type_purchase: this.detailstype,
        page: this.paginationDetail.page,
        limit: this.paginationDetail.rowsPerPage
      };
      return params;
    },
    async handlePageSizeChangeDetail(size) {
      this.paginationDetail.page = 1;
      this.paginationDetail.rowsPerPage = size;
      this.getRenderNumberlotto();
    },
    async getRenderNumberlotto() {
      let params = this.getparameterDetail();
      console.log(params);
      try {
        let { data: res } = await this.getTransaction(params);
        let details = {
          typepurchase_name: this.itemDetailOpen.typepurchase_name,
          lotto_round: this.itemDetailOpen.round_id,
          title: this.itemDetailOpen.title,
          date: this.itemDetailOpen.date,
          member_username: this.itemDetailOpen.member_username
        };
        this.itemDetail = { ...res, ...details };
        this.paginationDetail.rowsNumber = this.itemDetail.pagination.total;
        console.log(this.itemDetail);
      } catch (error) {
        console.log(error);
      }
    },
    closedialog() {
      this.dlTransection = false;
    },
    openDetail(item, value) {
      this.paginationDetail.page = 1;
      this.itemDetailOpen = item;
      this.detailstype = value;
      this.getRenderNumberlotto();
      this.dlTransection = true;
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
    },
    numberWithCommas(x) {
      var parts = parseInt(x)
        .toFixed(2)
        .toString()
        .split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  }
};
</script>

<style></style>
