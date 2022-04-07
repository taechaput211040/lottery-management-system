<template>
  <div>
    <h2>รายงานส่วนต่างอัตราจ่าย</h2>
    <filter-search @search="getbySearch"> </filter-search>
    <div class="mt-2 rounded-lg white">
      <v-data-table
        :headers="headers"
        :server-items-length="pagination.rowsNumber"
        :items-per-page.sync="pagination.rowsPerPage"
        :page.sync="pagination.page"
        hide-default-footer
        :options.sync="options"
        :items="itemReport"
      >
        <template #[`item.no`]="{index}">
          {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
        </template>

        <template #[`item.agent_selfrecaive_name`]="{item}">
          <div class="text-center font-weight-bold">
            <span v-if="item.agent_selfrecaive_name == null">
              <v-chip
                color="
            grey"
                dark
                small
                >-</v-chip
              >
            </span>
            <span v-else> {{ item.agent_selfrecaive_name }}</span>
          </div>
        </template>

        <template #[`item.actions`]="{item}">
          <v-btn color="blcak" rounded small dark @click="opendetail(item)"
            >ดูรายละเอียด</v-btn
          >
        </template>
      </v-data-table>
      <v-row align="baseline" class="ma-3 ">
        <v-col cols="12" sm="2" lg="2" xl="1">
          <v-select
            outlined
            hide-details="auto "
            dense
            v-model="pagination.rowsPerPage"
            :items="pageSizes"
            @change="handlePageSizeChange"
            label="รายการต่อนหน้า"
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
      <v-dialog v-model="dldetail" max-width="400px">
        <v-card class="pa-1"
          ><v-card-title class="justify-center"> รายละเอียด</v-card-title>
          <div class="ma-1 pa-1 rounded-lg elevation-2">
            <div class="row">
              <div class="col-6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >Agent</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.agent_name
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >Agent รับของ</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.agent_selfrecaive_name
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >ชื่อหวย</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.title
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >ชื่องวด</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.lotto_round
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >วันที่</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.date
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div class="col-6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >Username</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.member_username
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >ยอดเเทง</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.out_come_rate
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >อัตราจ่าย</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.out_come_rate
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >อัตราจ่ายรับของ</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.out_come_rate_selfrecaive
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >ยอดส่วนต่าง</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.date
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >รวมเงินส่วนต่าง</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      this.itemDetail.different
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </div>
          <v-card-actions class="justify-end">
            <v-btn color="error" small @click="dldetail = false">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      itemDetail: {},
      dldetail: false,
      options: {},
      filter: {},
      pageSizes: [5, 10, 15, 25],
      itemReport: [],
      headers: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
          width: "80px"
        },
        {
          text: "Agent",
          value: "agent_name",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "Agent รับของ",
          value: "agent_selfrecaive_name",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "ชนิดหวย",
          value: "title",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "ชื่องวด",
          value: "lotto_round",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "วันที่",
          value: "date",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "Username",
          value: "member_username",
          align: "center",
          class: "font-weight-bold",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "bet",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "รวมเงินส่วนต่าง",
          value: "different",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          class: "font-weight-bold",
          sortable: false
        }
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      }
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getData();
      },
      deep: true
    }
  },
  methods: {
    async opendetail(item) {
      this.dldetail = true;
      this.itemDetail = item;
    },
    ...mapActions("report", ["getDifferentReport"]),
    getbySearch(filter) {
      this.filter = filter;
      this.getData();
    },

    getParameter() {
      let parameter = {
        start_time: this.filter.startDate,
        end_time: this.filter.endDate,
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage
      };
      return parameter;
    },
    async getData() {
      let params = this.getParameter();
      try {
        let { data: response } = await this.getDifferentReport(params);
        this.itemReport = response.data;
        this.pagination.rowsNumber = response.pagination.total;
        console.log(response);
      } catch (error) {
        console.log(error);
        this.itemReport = [];
      }
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getData();
    }
  }
};
</script>

<style></style>
