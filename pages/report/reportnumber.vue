<template>
  <div>
    <div>
      <h2>หวยเพลา / รายงานตัวเลขสูงสุด</h2>
      <div class="pa-1 rounded-lg white my-3 pa-2">
        <div class="row py-3">
          <div class="col-12 ">
            เลือกประเภทหวย
            <!-- <v-select
              :items="listtype"
              item-text="title"
              item-value="id"
              hide-details="auto"
              outlined
              v-model="selectType"
              @change="selectTypelotto"
              dense
              placeholder="กรุณาเลือกประเภทหวย"
            ></v-select> -->
            <v-radio-group
              hide-details="auto"
              class="my-3"
              v-model="selectType"
              row
              @change="selectTypelotto"
            >
              <v-radio
                v-for="(item, i) in this.listtype"
                :key="i"
                :label="item.title"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 " v-if="itemcategory[0]">
            เลือกชนิดหวย
            <!-- <v-autocomplete
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
            ></v-autocomplete> -->
            <v-radio-group
              hide-details="auto"
              class="my-3"
              v-model="selectTypeCategory"
              row
              @change="selectRound"
            >
              <v-radio
              class="pa-1"
                v-for="(item, i) in this.itemcategory"
                :key="i"
                :label="item.title"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 " v-if="itemRound[0]">
            เลือกรอบหวย
            <v-autocomplete
              :items="itemRound"
              item-value="id"
              :disabled="selectTypeCategory == null"
              item-text="bet_lotto_time"
              hide-details="auto"
              outlined
              @change="getNumberreport(toRound, 2)"
              v-model="toRound"
              dense
              placeholder="กรุณาเลือกรอบหวย"
            >
              <template v-slot:selection="{ item }">
                รอบวันที่ {{ dateformat(item.bet_lotto_time) }}
              </template>
              <template v-slot:item="{ item }">
                รอบวันที่ {{ dateformat(item.bet_lotto_time) }}
              </template></v-autocomplete
            >
          </div>
        </div>
      </div>
      <div class="pa-1 rounded-lg  my-3 ">
        <div class="row">
          <div
            class="col-12 col-sm-6 col-lg-4 text-center font-weight-bold "
            v-for="(item, i) in numberReportrender"
            :key="i"
          >
            <div class="white rounded-lg ">
              <div class="py-3">{{ item.name }}</div>
              <v-data-table
                class="elevation-1"
                :headers="headerReport"
                :items="item.data"
                hide-default-footer
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
                  </v-alert></template
                >

                <template #[`item.no`]="{index}">
                  {{ index + 1 }}
                </template>
              </v-data-table>
              <div class="text-end">
                <div class="font-weight-bold text-right">
                  <v-btn
                    color="primary"
                    text
                    small
                    rounded
                    outlined
                    class="ma-2"
                    @click="showDetail(item)"
                    ><v-icon left small>mdi-magnify-plus</v-icon>
                    ดูทั้งหมด</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-dialog
          persistent
          v-model="dlDetail"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title class="justify-center">
              รายการตัวเลข :
              <div class="font-weight-bold primary--text mx-2">
                {{ this.itemDetail.name }}
              </div>
            </v-card-title>
            <!-- :server-items-length="pagination.rowsNumber" -->

            <v-data-table
              :server-items-length="pagination.rowsNumber"
              :items-per-page.sync="pagination.rowsPerPage"
              :page.sync="pagination.page"
              :options.sync="options"
              class="elevation-1"
              hide-default-footer
              :headers="headerReport"
              :items="itemDetail.data"
            >
              <template #[`item.no`]="{index}">
                {{
                  pagination.rowsPerPage * (pagination.page - 1) + (index + 1)
                }}
              </template></v-data-table
            >
            <div class="d-flex justify-center">
              <v-pagination
                v-model="pagination.page"
                :total-visible="7"
                :length="
                  Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)
                "
              ></v-pagination>
            </div>
            <v-card-actions @click="dlDetail = false" class="justify-end">
              <v-btn color="error" small dark>ปิด</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div v-if="isLoading" class="text-center">
      <loading-page></loading-page>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../../components/form/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      numberValue: {},
      options: {},
      dlDetail: false,
      itemRound: [],
      selectTypeCategory: null,
      listtype: [],
      toRound: null,
      selectCate: null,
      selectType: null,
      itemcategory: [],
      itemDetail: [],
      isLoading: false,
      pagination: {
        sortBy: "DESC",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      numberReportrender: [],
      headerReport: [
        {
          text: "อันดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "75px",
          sortable: false
        },
        {
          text: "หมายเลข",
          value: "lotto_number",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
          width: "150px"
        },
        {
          text: "จำนวนทั้งหมด",
          value: "bet",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false,
          width: "80px"
        }
      ]
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
  watch: {
    options: {
      async handler() {
        await this.getExpandNumber();
      },
      deep: true
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
    async selectRound(value) {
      this.isLoading = true;
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
      this.isLoading = false;
    },
    async getNumberreport(value, type) {
      console.log(type);
      let params = {
        program_id: value,
        type_purchase: type,
        page: 1,
        limit: 10
      };
      this.isLoading = true;
      try {
        let { data } = await this.getNumberTypeReport(params);
        this.numberReportrender = data;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    async showDetail(item) {
      this.dlDetail = true;
      this.numberValue = item;
      console.log(this.numberIdtype);
      this.getExpandNumber();
    },
    getParameter() {
      let params = {
        program_id: this.toRound,
        type_purchase: 2,
        lottonumbertype_id: this.numberValue.id,
        page: this.pagination.page,
        limit: 10
      };
      return params;
    },
    async getExpandNumber() {
      let params = this.getParameter();
      try {
        let { data: response } = await this.getDetailNumberReport(params);
        this.itemDetail = { ...response, name: this.numberValue.name };
        this.pagination.rowsNumber = this.itemDetail.pagination.total;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
