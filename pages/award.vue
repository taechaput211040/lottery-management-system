<template>
  <div>
    <div v-if="!isLoading">
      <h2>บันทึกผลรางวัล</h2>
      <filter-search @search="searchfunction"></filter-search>
      <v-radio-group
        v-model="selectType"
        hide-details="auto"
        class="my-3"
        row
        @change="selectSection"
      >
        <v-radio label="ทั้งหมด" value="all"></v-radio>
        <v-radio label="ออกผลมาแล้ว" value="success"></v-radio>
        <v-radio label="ผลยังไม่ออก" value="unsuccess"></v-radio>
      </v-radio-group>
      <div class="rounded-lg mt-5 pa-3 white">
        <div class="col-12 col-sm-6 col-md-6 col-lg-4  pa-0">
          <v-text-field
            v-model="searchtext"
            append-icon="mdi-magnify"
            label="ค้นหาชื่อหวย"
            dense
            solo-inverted
            @keyup.enter="serchAward()"
            hide-details="auto"
            ><v-btn
              slot="append"
              color="success"
              @click="serchAward()"
              fab
              dark
              x-small
            >
              <v-icon>mdi-magnify</v-icon></v-btn
            ></v-text-field
          >
        </div>

        <v-data-table
          class="mt-3"
          :headers="setheader"
          hide-default-footer
          :items="dataAwardrender.data"
          :search="search"
          :server-items-length="pagination.rowsNumber"
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :options.sync="options"
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
          <template #[`item.save`]="{item}">
            <!-- :disabled="item.status_calculate == true" -->
            <v-btn
              color="black"
              text
              outlined
              small
              rounded
              @click="openDlupdate(item, 'save')"
              ><v-icon left>mdi-download-box</v-icon>กรอกผลรางวัล
            </v-btn>
          </template>
          <template #[`item.calculate`]="{item}">
            <!-- เงื่อนไข -->
            <!-- :disabled="
                item.status_lotto == false || item.status_calculate == true
              " -->
            <v-btn
              
              color="black"
              text
              outlined
              small
              rounded
              @click="openDlupdate(item, 'calculate')"
              ><v-icon left>mdi-download-box</v-icon>คำนวณผล
            </v-btn>
          </template>
          <template #[`item.bet_lotto_time`]="{item}">
            {{ dateformat(item.bet_lotto_time) }}
          </template>
          <template #[`item.status_lotto`]="{item}">
            <v-chip small color="success" v-if="item.status_lotto == true"
              ><v-icon left>mdi-circle</v-icon> ออกผลมาแล้ว</v-chip
            >
            <v-chip small color="error" v-if="item.status_lotto == false"
              ><v-icon left>mdi-circle</v-icon> ผลยังไม่ออก</v-chip
            >
          </template>
          <template #[`item.status_calculate`]="{item}">
            <v-chip small color="success" v-if="item.status_calculate == true"
              ><v-icon left>mdi-circle</v-icon>คำนวณผลเรียบร้อย</v-chip
            >
            <v-chip small color="error" v-if="item.status_calculate == false"
              ><v-icon left>mdi-circle</v-icon>ยังไม่คำนวณผล</v-chip
            >
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
      <v-dialog max-width="600px" v-model="dlcalculate">
        <form>
          <v-card>
            <div class="pa-md-5 ">
              <v-card-title
                class="justify-center primary--text font-weight-bold"
              >
                คำนวณผลรางวัล
              </v-card-title>
              <div class="pa-5 rounded-lg pa-2 elevation-3">
                <div v-for="(item, i) in this.itemNumber" :key="i">
                  <div class="row align-baseline">
                    <div class="col-4">{{ item.name }}</div>
                    <div
                      class="col-8 row "
                      v-if="Array.isArray(item.lotto_number) == true"
                    >
                      <div
                        class="col-6 col-sm-4 col-md-4 text-center"
                        v-for="(j, n_key) in parseInt(item.amount_reward)"
                        :key="n_key"
                      >
                        <v-text-field
                          outlined
                          type="number"
                          hide-details="auto"
                          dense
                          v-model="item.lotto_number[n_key]"
                          small
                          disabled
                          filled
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="col-8 row" v-else>
                      <div class="col-6 col-sm-4 col-md-4 text-center">
                        <v-text-field
                          outlined
                          type="number"
                          v-model="item.lotto_number"
                          hide-details="auto"
                          dense
                          filled
                          disabled
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <v-card-actions class="justify-center">
              <v-btn color="success" @click="submitCalculate()"
                >คำนวณผลรางวัล</v-btn
              ><v-btn color="error" @click="dlcalculate = false">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
      <v-dialog v-model="alertdl" max-width="400px" persistent>
        <v-form v-model="validatePravity" ref="alertForm">
          <v-card class="pa-3">
            <div class="pa-5 rounded-lg pa-2 elevation-3 text-center">
              <h2 class="error--text">กรอกรหัสความปลอดภัย</h2>
              <v-text-field
                outlined
                hide-details="auto"
                dense
                class="ma-4"
                :value="formCalculate.passcode"
                :rules="[v => !!v || 'กรุณากรอกรหัสความปลอดภัย']"
                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (value = !value)"
                :type="value ? 'password' : 'text'"
                v-model="formCalculate.passcode"
              ></v-text-field>
            </div>
            <v-card-actions class="justify-center">
              <v-btn
                color="success"
                :loading="loading_btn"
                @click="confirmCalculate()"
                >บันทึก</v-btn
              ><v-btn color="error" @click="alertdl = false">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card></v-form
        >
      </v-dialog>
      <v-dialog max-width="600px" v-model="dlSavenumber">
        <v-form v-model="valid" ref="formnumber">
          <v-card class="pa-3">
            <v-card-title class="justify-center primary--text font-weight-bold">
              กรอกข้อมูลผลรางวัล
            </v-card-title>
            <div class="pa-5 rounded-lg pa-2 elevation-3">
              <div v-for="(item, i) in this.itemNumber" :key="i">
                <div class="row align-baseline">
                  <div class="col-4">{{ item.name }}</div>

                  <div
                    class="col-8 row "
                    v-if="Array.isArray(item.lotto_number) == true"
                  >
                    <div
                      class="col-6 col-sm-4 col-md-4 pa-1 text-center"
                      v-for="(j, n_key) in parseInt(item.amount_reward)"
                      :key="n_key"
                    >
                      <v-text-field
                        outlined
                        type="number"
                        hide-details="auto"
                        dense
                        v-model="item.lotto_number[n_key]"
                        @keydown="
                          e =>
                            rangeInput(
                              e,
                              parseInt(item.number),
                              item.lotto_number[n_key]
                            )
                        "
                        :counter="parseInt(item.number)"
                        :rules="[
                          v => !!v,
                          v => (v && v.length >= parseInt(item.number)) || ''
                        ]"
                        small
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="col-8 row " v-else>
                    <div class="col-6 col-sm-4 col-md-4 pa-1 text-center">
                      <v-text-field
                        outlined
                        type="number"
                        v-model="item.lotto_number"
                        @keydown="
                          e =>
                            rangeInput(
                              e,
                              parseInt(item.number),
                              item.lotto_number
                            )
                        "
                        :counter="parseInt(item.number)"
                        :rules="[
                          v => !!v,
                          v => (v && v.length >= parseInt(item.number)) || ''
                        ]"
                        hide-details="auto"
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <v-card-actions class="justify-center">
              <v-btn
                color="success"
                :loading="loading_btn"
                @click="submitnumber()"
                >บันทึก</v-btn
              ><v-btn color="error" @click="closeDl()">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterSearch from "../components/form/FilterSearch.vue";
export default {
  components: { FilterSearch },

  data() {
    return {
      loading_btn: false,
      value: String,
      formCalculate: {},
      validatePravity: false,
      alertdl: false,
      dlcalculate: false,
      statusforsearch: undefined,
      searchtext: undefined,
      options: {},
      valid: false,
      pageSizes: [5, 10, 15, 25],
      isArray: false,
      search: "",
      isLoading: false,
      keynumber: [],
      dlSavenumber: false,
      selectType: "all",
      header: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "80px",
          sortable: false
        },
        {
          text: "ชื่อหวย",
          value: "title",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "รอบวันที่",
          value: "lotto_round",
          class: "font-weight-bold",
          align: "left",
          sortable: false
        },
        {
          text: "เวลาออกผล",
          value: "bet_lotto_time",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "การออกรางวัล",
          value: "status_lotto",
          class: "font-weight-bold",
          align: "left",
          sortable: false
        },
        {
          text: "การคำนวณผลรางวัล",
          value: "status_calculate",
          class: "font-weight-bold",
          align: "left",
          sortable: false
        },
        {
          text: "คำนวณผลรางวัล",
          value: "calculate",
          class: "font-weight-bold",
          align: "left",
          sortable: false
        },
        {
          text: "กรอกผลรางวัล",
          value: "save",
          class: "font-weight-bold",
          align: "left",

          sortable: false
        }
      ],
      progranlottoID: "",
      itemNumber: {},
      dataAwardrender: [],
      filter: {
        startDate: "2022-03-14 01:00:00.000",
        endDate: "2022-04-01 01:00:00.000"
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    };
  },
  computed: {
    setheader() {
      let headerender = this.header;
      if (this.$store.state.auth.role != "LOTTO") {
        headerender = [
          {
            text: "No.",
            value: "no",
            class: "font-weight-bold",
            cellClass: "font-weight-bold",
            align: "center",
            width: "80px"
          },
          {
            text: "ชื่อหวย",
            value: "title",
            class: "font-weight-bold",
            align: "left",
            width: "200px",
            sortable: false
          },
          {
            text: "รอบวันที่",
            value: "lotto_round",
            class: "font-weight-bold",
            align: "left",
            width: "200px",
            sortable: false
          },
          {
            text: "เวลาออกผล",
            value: "bet_lotto_time",
            class: "font-weight-bold",
            align: "left",
            width: "200px"
          },
          {
            text: "สถานะการออกรางวัล",
            value: "status_lotto",
            class: "font-weight-bold",
            align: "left",
            width: "200px",
            sortable: false
          },
          {
            text: "สถานะการคำนวณผลรางวัล",
            value: "status_calculate",
            class: "font-weight-bold",
            align: "left",
            sortable: false,
            width: "200px"
          }
        ];
        return headerender;
      } else {
        return headerender;
      }
    }
  },
  watch: {
    options: {
      async handler() {
        await this.selectSection();
      },
      deep: true
    }
  },
  async fetch() {
    this.selectSection();
  },
  methods: {
    serchAward() {
      this.pagination.page = 1;
      if (this.searchtext === "") {
        this.searchtex = undefined;
      }
      this.selectSection();
    },
    dateformat(date) {
      return this.$moment(String(date)).format("YYYY/MM/DD เวลา HH:mm:ss");
    },
    searchfunction(filter) {
      this.filter = filter;
      this.selectSection();
    },

    ...mapActions("lottosetting", [
      "getawardlotto",
      "getlottobyprogram",
      "savelottonumber",
      "calculateAward"
    ]),
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
    getParameter() {
      let order = this.getOptionalOrder();
      if (
        this.searchtext === "" ||
        this.searchtext === null ||
        this.searchtext === undefined
      ) {
        this.searchtext = undefined;
      }
      let params = {
        title: this.searchtext,
        start_date: this.filter.startDate,
        end_date: this.filter.endDate,
        status_lotto: this.statusforsearch,
        currentPage: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        order_by: order == undefined ? undefined : order.sortBy,
        order_mode: order == undefined ? undefined : order.sortDesc
      };
      return params;
    },
    async selectSection(value) {
      if (value) {
        if (value === "success") {
          this.statusforsearch = true;
        } else if (value === "unsuccess") {
          this.statusforsearch = false;
        } else {
          this.statusforsearch = undefined;
        }
      }

      this.getAwardList();
    },
    async getAwardList() {
      let params = this.getParameter();
      try {
        const data = await this.getawardlotto(params);
        if (this.statusforsearch == undefined && !this.searchtext) {
          this.dataAwardrender = data.result;
          this.pagination.rowsNumber = this.dataAwardrender.total;
        } else if (this.searchtext) {
          this.dataAwardrender = data.result[0].result_title;
          this.pagination.rowsNumber = this.dataAwardrender.total;
        } else {
          this.dataAwardrender = data.result[0].result_status_lotto;
          this.pagination.rowsNumber = this.dataAwardrender.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async openDlupdate(item, type) {
      try {
        this.progranlottoID = item.id;
        let data = await this.getlottobyprogram(item.id);
        this.itemNumber = data;
        if (type == "save") {
          this.dlSavenumber = true;
        } else if (type == "calculate") {
          this.dlcalculate = true;
        }
        for (let i = 0; i < this.itemNumber.length; i++) {
          if (this.itemNumber[i].lotto_number == null) {
            if (this.itemNumber[i].amount_reward > 1) {
              this.itemNumber[i].lotto_number = [];
            } else {
              this.itemNumber[i].lotto_number = "";
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    submitCalculate() {
      this.alertdl = true;
    },
    async confirmCalculate() {
      if (this.$refs.alertForm.validate()) {
        this.loading_btn = true;
        let body = {
          program_id: this.progranlottoID,
          passcode: this.formCalculate.passcode
        };
        console.log(body);
        try {
          await this.calculateAward(body);
          this.$swal({
            icon: "success",
            title: "คำนวณผลเสร็จสิ้น",
            showConfirmButton: false,
            timer: 1500
          });
          this.alertdl = false;
          this.dlcalculate = false;
          this.getAwardList();
          this.loading_btn = false;
        } catch (error) {
          this.$swal({
            icon: "error",
            title: "กรุณากรอกรหัสความปลดภัยให้ถูกต้อง",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
          this.loading_btn = false;
        }
      } else {
        this.$swal("กรุณากรอกรหัสความปลดภัยให้ถุกต้อง", "", "warning");
      }
    },
    async submitnumber() {
      let body = {
        program_id: this.progranlottoID,
        lottonumbertype_details: []
      };

      for (let i = 0; i < this.itemNumber.length; i++) {
        body.lottonumbertype_details.push({
          lottonumbertype_id: this.itemNumber[i].id,
          lotto_number: this.itemNumber[i].lotto_number
        });
      }
      if (this.$refs.formnumber.validate()) {
        try {
          await this.savelottonumber(body);

          this.$swal({
            icon: "success",
            title: "บันทึกผลเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          this.dlSavenumber = false;
        } catch (error) {
          this.$swal({
            icon: "error",
            title: "บันทึกผลผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
        }
      } else {
        this.$swal("กรุณากรอกผลรางวัลให้ครบถ้วน", "", "warning");
      }
    },
    closeDl() {
      this.dlSavenumber = false;
      this.$refs.formnumber.resetValidation();
    },
    rangeInput(self, length, itemmodel) {
      // console.log(itemmodel);
      if (itemmodel == undefined) {
        itemmodel = "";
      } else if (/[0-9]/g.test(self.key) && itemmodel.length >= length) {
        self.preventDefault();
      }
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.selectSection();
    }
  }
};
</script>

<style></style>
