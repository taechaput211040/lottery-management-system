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
        <!-- <div class="col-md-4 col-6 pa-2">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหาชื่อหวย"
            outlined
            single-line
            dense
            hide-details="auto"
          ></v-text-field>
        </div> -->

        <v-data-table
          :headers="header"
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
            <v-btn
              color="black"
              text
              outlined
              small
              rounded
              @click="openDlupdate(item)"
              ><v-icon left>mdi-download-box</v-icon>กรอกผลรางวัล
            </v-btn>
          </template>
          <template #[`item.calculate`]="{}">
            <v-btn color="primary" text outlined small rounded
              ><v-icon left>mdi-calculator</v-icon>คำนวณผลรางวัล
            </v-btn> </template
          ><template #[`item.status_lotto`]="{item}">
            <v-chip color="success" v-if="item.status_lotto == true"
              ><v-icon left>mdi-circle</v-icon> ออกผลมาแล้ว</v-chip
            >
            <v-chip color="error" v-if="item.status_lotto == false"
              ><v-icon left>mdi-circle</v-icon> ผลยังไม่ออก</v-chip
            >
          </template>
          <template #[`item.status_calculate`]="{item}">
            <v-chip color="success" v-if="item.status_lotto == true"
              ><v-icon left>mdi-circle</v-icon>คำนวณผลเรียบร้อย</v-chip
            >
            <v-chip color="error" v-if="item.status_lotto == false"
              ><v-icon left>mdi-circle</v-icon>ยังไม่คำนวณผล</v-chip
            >
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="1">
            <v-select
              dense
              outlined
              v-model="pagination.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChange"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="11">
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
      <v-dialog max-width="600px" v-model="dlSavenumber">
        <v-form v-model="valid" ref="formnumber">
          <v-card class="pa-3">
            <v-card-title class="justify-center primary--text font-weight-bold">
              กรอกข้อมูลผลรางวัล
            </v-card-title>

            <div v-for="(item, i) in this.itemNumber" :key="i">
              <div class="row align-baseline">
                <div class="col-3">{{ item.name }}</div>

                <div
                  class="col-9 row "
                  v-if="Array.isArray(item.lotto_number) == true"
                >
                  <v-text-field
                    class="col-2 mx-1 text-center"
                    v-for="(j, n_key) in parseInt(item.amount_reward)"
                    :key="n_key"
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
                <div class="col-9 row my-1" v-else>
                  <v-text-field
                    class="col-2 mx-1 text-center"
                    outlined
                    type="number"
                    v-model="item.lotto_number"
                    @keydown="
                      e =>
                        rangeInput(e, parseInt(item.number), item.lotto_number)
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
            <v-card-actions class="justify-center">
              <v-btn color="success" @click="submitnumber()">บันทึก</v-btn
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
          width: "80px"
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
          align: "left"
        },
        {
          text: "เวลาออกผล",
          value: "bet_lotto_time",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "สถานะการออกรางวัล",
          value: "status_lotto",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "สถานะการคำนวณผลรางวัล",
          value: "status_calculate",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "คำนวณผล",
          value: "calculate",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "กรอกผลรางวัล",
          value: "save",
          class: "font-weight-bold",
          align: "left"
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
        rowsNumber: 100
      }
    };
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
    searchfunction(filter) {
      this.filter = filter;

      this.selectSection();
    },

    ...mapActions("lottosetting", [
      "getawardlotto",
      "getlottobyprogram",
      "savelottonumber"
    ]),
    getParameter(status) {
      let params = {
        start_date: this.filter.startDate,
        end_date: this.filter.endDate,
        status_lotto: status,
        currentPage: this.pagination.page,
        limit: this.pagination.rowsPerPage
      };
      return params;
    },
    async selectSection(value) {
      let status = undefined;
      if (value === "success") {
        status = true;
      } else if (value === "unsuccess") {
        status = false;
      } else {
        status = undefined;
      }
      let params = this.getParameter(status);
      try {
        const data = await this.getawardlotto(params);
        if (status == undefined) {
          this.dataAwardrender = data.result;
          this.pagination.rowsNumber = this.dataAwardrender.total;
        } else {
          this.dataAwardrender = data.result[0].result_status_lotto;
          this.pagination.rowsNumber = this.dataAwardrender.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async openDlupdate(item) {
      try {
        this.progranlottoID = item.id;
        let data = await this.getlottobyprogram(item.id);
        this.itemNumber = data;
        this.dlSavenumber = true;
        console.log(this.itemNumber);
        for (let i = 0; i < this.itemNumber.length; i++) {
          if (this.itemNumber[i].lotto_number == null) {
            this.itemNumber[i].lotto_number = [];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submitnumber() {
      let body = {
        program_id: this.progranlottoID,
        lottonumbertype_details: []
      };
      this.isArray = Array.isArray(this.itemNumber[0].lotto_number);

      if (this.isArray === true) {
        for (let i = 0; i < this.itemNumber.length; i++) {
          for (let j = 0; j < this.itemNumber[i].lotto_number.length; j++) {
            body.lottonumbertype_details.push({
              lottonumbertype_id: this.itemNumber[i].id,
              lotto_number: this.itemNumber[i].lotto_number[j]
            });
          }
        }
      } else if (this.isArray === false) {
        for (let i = 0; i < this.itemNumber.length; i++) {
          body.lottonumbertype_details.push({
            lottonumbertype_id: this.itemNumber[i].id,
            lotto_number: this.itemNumber[i].lotto_number
          });
        }
      }
      console.log(this.isArray, "array");
      console.log(body, "body");
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
