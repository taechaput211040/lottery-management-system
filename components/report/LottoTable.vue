<template>
  <div>
    <div class="mt-3">
      <filter-search @search="searchfunction"> </filter-search>
    </div>
    <div v-if="isLoading"><loading-page></loading-page></div>
    <div v-else class="white rounded-lg">
      <div class="pa-3">
        <h3>รายงานกำไรขาดทุน ของ {{ currentUser }}</h3>
      </div>
      <div class="white rounded-lg">
        <v-btn
          color="red back_btn"
          class="ma-2"
          v-show="showBackbtn()"
          @click="backPrevpath()"
          rounded
          small
          dark
          ><v-icon left>mdi-arrow-left-drop-circle</v-icon> ย้อนกลับ</v-btn
        >
        <v-data-table
          class="elevation-1"
          :headers="headerTable"
          :items="datarender.current"
          :options.sync="optionsRender"
          hide-default-footer
        >
          <template #[`item.no`]="{ index }">
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
          </template>
          <template #[`item.payout`]="{ item }">
            {{ numberWithCommas(item.payout) }}
          </template>
          <template #[`item.payout`]="{ item }">
            {{ numberWithCommas(item.payout) }}
          </template>
          <template #[`item.agent_name`]="{ item }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="primary--text font-weight-bold"
                  style="cursor: pointer"
                  @click="handleClickUsername(item.agent_name, item)"
                >
                  {{ item.agent_name }}
                </div></template
              >
              <span>คลิกเพื่อดูรายละเอียด</span>
            </v-tooltip>
          </template>
          <template #[`item.winlose`]="{ item }">
            <p :class="(item.winlose > 0) ? 'greenText' : 'redText'">{{ numberWithCommas(item.winlose) }}</p>
          </template>
          <template #[`item.turnover`]="{ item }">
            {{ numberWithCommas(item.turnover) }}</template
          >
          <template #[`item.bet`]="{ item }">
            {{ numberWithCommas(item.bet) }}
          </template>
        </v-data-table>
        <v-row
          align="baseline"
          class="ma-3"
          v-if="(datarender.agents || []).length != 0"
        >
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="optionsRender.itemsPerPage"
              :items="pageSizes"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="optionsRender.page"
              :total-visible="7"
              :length="
                Math.ceil(datarender.agents.length / optionsRender.itemsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>

        <div class="mt-5 pa-3">
          <h3>รายงานกำไรขาดทุน ของ agent ลูก</h3>
        </div>
        <v-data-table
          class="elevation-1"
          :headers="headerTable"
          :items="datarender.agents"
          :options.sync="optionsRender"
          hide-default-footer
        >
          <template #[`item.no`]="{ index }">
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
          </template>
          <template #[`item.payout`]="{ item }">
            {{ numberWithCommas(item.payout) }}
          </template>
          <template #[`item.payout`]="{ item }">
            {{ numberWithCommas(item.payout) }}
          </template>
          <template #[`item.agent_name`]="{ item }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="primary--text font-weight-bold"
                  style="cursor: pointer"
                  @click="handleClickUsername(item.agent_name, item)"
                >
                  {{ item.agent_name }}
                </div></template
              >
              <span>คลิกเพื่อดูรายละเอียด</span>
            </v-tooltip>
          </template>
          <template #[`item.winlose`]="{ item }">
            <p :class="(item.winlose > 0) ? 'greenText' : 'redText'">{{ numberWithCommas(item.winlose) }}</p>
          </template>
          <template #[`item.turnover`]="{ item }">
            {{ numberWithCommas(item.turnover) }}</template
          >
          <template #[`item.bet`]="{ item }">
            {{ numberWithCommas(item.bet) }}
          </template>
        </v-data-table>
        <v-row
          align="baseline"
          class="ma-3"
          v-if="(datarender.agents || []).length != 0"
        >
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="optionsRender.itemsPerPage"
              :items="pageSizes"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="optionsRender.page"
              :total-visible="7"
              :length="
                Math.ceil(datarender.agents.length / optionsRender.itemsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>


        <div>
          <div class="mt-5 pa-3">
            <h3>รายงานสมาชิก</h3>
          </div>

          <v-data-table
            class="elevation-1"
            :items-per-page.sync="pagination.rowsPerPage"
            :server-items-length="pagination.rowsNumber"
            :headers="memberTable"
            :items="datarender.members"
            :page.sync="pagination.page"
            :options.sync="options"
            hide-default-footer
          >
            <template #[`item.no`]="{ index }">
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
            </template>
            <template #[`item.member_username`]="{ item }">
              <div class="purple--text font-weight-bold">
                {{ item.member_username }}
              </div></template
            >
            <template #[`item.payout`]="{ item }">
              {{ numberWithCommas(item.payout) }}
            </template>

            <template #[`item.winlose`]="{ item }">
              <p :class="(item.winlose > 0) ? 'greenText' : 'redText'">{{ numberWithCommas(item.winlose) }}</p>
            </template>
            <template #[`item.turnover`]="{ item }">
              {{ numberWithCommas(item.turnover) }}</template
            >
            <template #[`item.bet`]="{ item }">
              {{ numberWithCommas(item.bet) }}
            </template>
            <template #[`item.action`]="{ item }">
              <v-btn
                color="black"
                dark
                small
                rounded
                @click="showBillDetail(item)"
                ><v-icon left>mdi-clipboard-text</v-icon>ดูรายละเอียด
              </v-btn>
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

        <div
          class="white rounded-lg"
          v-if="$route.query.agentId && $route.query.memberid"
        >
          <v-btn
            color="red back_btn"
            class="ma-2"
            @click="backTomember()"
            rounded
            small
            dark
            ><v-icon left>mdi-arrow-left-drop-circle</v-icon> ย้อนกลับ</v-btn
          >
          <round-table :datefilter="datefilter"></round-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterSearch from "../../components/form/FilterSearch.vue";
import LoadingPage from "../form/LoadingPage.vue";
import RoundTable from "./RoundTable.vue";
export default {
  components: { FilterSearch, LoadingPage, RoundTable },
  data() {
    return {
      optionsRender: {},
      isLoading: false,
      prevUser: null,
      options: {},
      type: undefined,
      datarender: [],
      selectgroup: undefined,
      datefilter: {},
      pageSizes: [5, 10, 15, 25],
      currentUser: "",
      headerTable: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
          width: "75px",
        },
        {
          text: "Username",
          value: "agent_name",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold text-left",
          width: "300px",
        },
        {
          text: "ยอด(บาท)",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
        {
          text: "Turnover(บาท)",
          value: "turnover",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
        {
          text: "Payout(บาท)",
          value: "payout",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },

        {
          text: "ยอดได้เสีย(บาท)",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
      ],
      memberTable: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
          width: "75px",
        },
        {
          text: "Username",
          value: "member_username",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold text-left",
          width: "300px",
        },
        {
          text: "ยอด(บาท)",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
        {
          text: "Turnover(บาท)",
          value: "turnover",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
        {
          text: "Payout(บาท)",
          value: "payout",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },

        {
          text: "ยอดได้เสีย(บาท)",
          value: "winlose",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
        {
          text: "ดูรายการแทง",
          value: "action",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
        },
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      agent_name: undefined,
    };
  },
  // watch: {
  //   options: {
  //     async handler() {
  //       console.log('watch')
  //       await this.getReportdata();
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    sessionStorage.removeItem("pathPrev");

    sessionStorage.removeItem("userPrev");
  },
  methods: {
    setRouter() {
      if (!this.$route.query.agentId) {
        this.$router.push(
          `${this.$route.fullPath}?agentId=${this.datarender.current.agent_id}`
        );
      }
    },
    showBillDetail(item) {
      if (this.$route.query.agentId) {
        this.$router.push(`${this.$route.fullPath}&memberid=${item.member_id}`);
      } else {
        this.$router.push(`${this.$route.fullPath}?memberid=${item.member_id}`);
      }
    },
    showBackbtn() {
      if (
        !sessionStorage.getItem("userPrev") ||
        JSON.parse(sessionStorage.getItem("userPrev")).length < 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ...mapActions("report", ["getReportWinlose"]),
    async renderbyselecttype(value) {
      this.pagination.page = 1;
      if (value == 0) {
        this.type = undefined;
      } else {
        this.type = value;
      }
      console.log("renderbyselecttype");
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
    handlePageChange(size) {
      this.pagination.page = size;
      this.getReportdata();
    },
    getParameter() {
      let order = this.getOptionalOrder();
      let params = {
        agent_name: this.agent_name ? this.agent_name : undefined,
        start_time: this.datefilter.startDate,
        end_time: this.datefilter.endDate,
        type_purchase: this.type,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        sort:
          order == undefined ? undefined : `${order.sortBy}=${order.sortDesc}`,
      };
      return params;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      console.log("PagesizeChange");
      this.getReportdata();
    },
    searchfunction(value) {
      this.isLoading = true;
      this.pagination.page = 1;
      this.datefilter = value;
      console.log("search function");
      this.getReportdata();
    },
    async getReportdata() {
      let params = this.getParameter();
      console.log("call this");
      try {
        let { data: response } = await this.getReportWinlose(params);

        this.datarender = response.data;
        this.currentUser = response.data.current.agent_name;
        this.datarender.current = [response.data.current];
        console.log(this.datarender)
        this.pagination.rowsNumber = response.pagination.total;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      await this.setRouter();
    },

    numberWithCommas(x) {
      var parts = parseInt(x).toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    handleClickUsername(user, item) {
      console.log(item, "item");
      if (item.agent_id) {
        this.$router.push(`?agentId=${item.agent_id}`);
      }
      this.isLoading = true;
      this.agent_name = user;
      console.log("clickusername");
      this.getReportdata();
      if (!sessionStorage.getItem("userPrev")) {
        let ArrayNull = [];
        sessionStorage.setItem(`userPrev`, JSON.stringify(ArrayNull));
      }
      let form_path = JSON.parse(sessionStorage.getItem("userPrev"));
      form_path.push({ username: user });
      sessionStorage.setItem(`userPrev`, JSON.stringify(form_path));
    },
    backPrevpath() {
      if (this.$store.state.auth.level >= 3) {
        this.$router.go(-1);
      } else {
        this.$router.push({
          query: {
            agentId: `${this.$route.query.agentId}`,
            memberid: undefined,
          },
        });
      }

      this.isLoading = true;
      const form_path = JSON.parse(sessionStorage.getItem("userPrev"));
      const prevUsers = form_path.slice(0, form_path.length - 1);
      let userdata = prevUsers[prevUsers.length - 1];
      if (userdata) {
        this.agent_name = userdata.username;
        console.log("backprev");
        this.getReportdata();
      } else {
        console.log("backprev2");
        this.agent_name = undefined;
        this.getReportdata();
      }
      sessionStorage.setItem("userPrev", JSON.stringify(prevUsers));
    },
    backTomember() {
      this.$router.push({
        query: { agentId: `${this.$route.query.agentId}`, memberid: undefined },
      });
    },
  },
};
</script>

<style>
.greenText{
  color: #28A745;
  font-weight: 900;
}

.redText{
  color: #DC3545;
  font-weight: 900;
}
</style>
