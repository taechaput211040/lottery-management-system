<template>
  <div>
    <div class=" my-3 ">
      <v-row class="pa-1 ">
        <v-col cols="12" sm="6">
          <div class="rounded-lg white " style="height:100%">
            <div class="primary--text font-weight-bold pa-2">
              เลือกประเภทหวย
            </div>
            <v-divider></v-divider>
            <div class="pa-2">
              <v-radio-group
                hide-details="auto"
                class="my-3"
                v-model="selectType"
                row
                @change="selectCatebytype"
              >
                <v-radio
                  v-for="(item, i) in this.listtype"
                  :key="i"
                  :label="item.title"
                  :value="item.id"
                ></v-radio>
              </v-radio-group>
              <v-select
                :items="itemcategory"
                item-text="typecategory_title"
                item-value="typecategory_id"
                class="col-12"
                :disabled="selectType == null"
                outlined
                v-model="selectCate"
                @change="selectFlexodd"
                label="เลือกชนิดหวย"
                dense
                placeholder="กรุณาเลือกชนิดของหวย"
              ></v-select>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="rounded-lg white" style="height:100%;">
            <div class="success--text font-weight-bold pa-2">
              ตั้งค่ากำไรและอัตราน้ำไหล
            </div>
            <v-divider></v-divider>
            <div class="row pa-2">
              <div class="col-12">
                <v-form ref="formMax_profit_lost">
                  ยอดขาดทุนสูงสุด(%)
                  <div class="row mt-3">
                    <div class="col-12 col-md-8">
                      <v-text-field
                        dense
                        v-model.number="max_profit_lost"
                        hide-details="auto"
                        @keypress="e => checkpositive(e)"
                        class="mb-2"
                        type="number"
                        :rules="[v => !!v || 'กรุณากรอกกำไรขั้นต่ำ']"
                        outlined
                        required
                        placeholder="กรอกกำไรขั้นต่ำ"
                      ></v-text-field>
                    </div>
                    <div class=" col-12 col-md-4 pb-3">
                      <v-btn color="success" @click="setprofitLoss()"
                        >บันทึก</v-btn
                      >
                    </div>
                  </div>
                </v-form>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <div>
      <div v-if="selectCate != null" class="rounded-lg white pa-3">
        <div class="d-flex">
          <h4 class="my-2">หวยของตัวเอง</h4>
        </div>

        <v-data-table
          class="elevation-2"
          hide-default-footer
          :options.sync="option"
          :headers="headersdatelotto"
          :loading="isLoading"
          :items="dataOutcome"
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
            {{ index + 1 }}
          </template>
          <template #[`item.maximum_out_come_rate`]="{item}">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>
          <template #[`item.received_out_come_rate`]="{ item }">
            {{ numberWithCommas(item.received_out_come_rate) }}
          </template>
          <template #[`item.minimum_bet_prize`]="{item}">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.maximum_bet_prize`]="{item}">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
          <template #[`item.action`]="{item}">
            <v-btn
              rounded
              class="btn_setting"
              color="black"
              dark
              small
              @click="openupdateComerate(item)"
              ><v-icon left>mdi-cog</v-icon> ตั้งค่า
            </v-btn>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="option.itemsPerPage"
              :items="pageSizes"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="option.page"
              :total-visible="7"
              :length="Math.ceil(dataOutcome.length / option.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>

      <!-- <div v-if="selectCate != null" class="rounded-lg white pa-3 mt-3">
        <h4 class="my-2">อัตราจ่ายที่ได้รับมา</h4>
        <v-data-table
          class="elevation-2"
          :headers="headersUpline"
          :loading="isLoading"
          :items="dataUpline"
          hide-default-footer
          :options.sync="optionupline"
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
          <template #[`item.maximum_out_come_rate`]="{item}">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>
          <template #[`item.minimum_bet_prize`]="{item}">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.minimum_out_come_rate`]="{item}">
            {{ numberWithCommas(item.minimum_out_come_rate) }}
          </template>

          <template #[`item.maximum_bet_prize`]="{item}">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
          <template #[`item.no`]="{index}">
            {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="optionupline.itemsPerPage"
              :items="pageSizesupline"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="optionupline.page"
              :total-visible="7"
              :length="Math.ceil(dataUpline.length / optionupline.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div> -->
    </div>

    <v-dialog max-width="400px" v-model="dlupdate" persistent>
      <v-form ref="edtform">
        <v-card class="pa-3">
          <v-card-title primary-title class="justify-center font-weight-bold">
            ตั้งค่าหวยน้ำไหล
          </v-card-title>
          <div class="rounded-lg pa-2 elevation-3">
            <v-text-field
              filled
              label="ชื่อชนิดหวย"
              dense
              hide-details="auto"
              class="my-2"
              disabled
              v-model="formupdate.lottonumbertype_name"
            ></v-text-field>
            <v-text-field
              outlined
              label="อัตราจ่ายต่ำสุด"
              dense
              :rules="[
                v => !!v || 'กรุณากรอกอัตราจ่ายต่ำสุด',
                v =>
                  (v && v <= formupdate.maximum_out_come_rate) ||
                  'กรุณากรอกอัตราจ่ายต่ำสุดน้อยกว่าอัตราจ่ายสูงสุด'
              ]"
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราจ่ายต่ำสุด"
              @keypress="e => checkpositive(e)"
              hide-details="auto"
              v-model.number="formupdate.minimum_out_come_rate"
            ></v-text-field>
            <v-text-field
              outlined
              label="อัตราจ่ายสูงสุด"
              dense
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราการจ่ายสูงสุด"
              @keypress="e => checkpositive(e)"
              :rules="[
                v => !!v || 'กรุณากรอกอัตราจ่ายสูงสุด',
                v =>
                  (v && v >= formupdate.minimum_out_come_rate) ||
                  'กรุณากรอกอัตราจ่ายสูงสุดให้มากกว่าอัตราจ่ายต่ำสุด'
              ]"
              hide-details="auto"
              v-model.number="formupdate.maximum_out_come_rate"
            ></v-text-field>
            <v-text-field
              outlined
              label="แทงต่ำสุด"
              type="number"
              @keypress="e => checkpositive(e)"
              placeholder="กรุณากรอกยอดแทงต่ำสุด"
              :rules="[
                v => !!v || 'กรุณากรอกยอดแทงต่ำสุด',
                v =>
                  (v && v <= formupdate.maximum_bet_prize) ||
                  'กรุณากรอกยอดแทงต่ำสุดให้น้อยกว่ายอดแทงสูงสุด'
              ]"
              dense
              class="my-2"
              hide-details="auto"
              v-model.number="formupdate.minimum_bet_prize"
            ></v-text-field>
            <v-text-field
              outlined
              @keypress="e => checkpositive(e)"
              placeholder="กรุณากรอกยอดแทงสูงสุด"
              label="แทงสูงสุด"
              class="my-2"
              type="number"
              :rules="[
                v => !!v || 'กรุณากรอกยอดแทงต่ำสุด',
                v =>
                  (v && v >= formupdate.minimum_bet_prize) ||
                  'กรุณากรอกยอดเเทงสูงสุดให้มากกว่ายอดแทงต่ำสุด'
              ]"
              dense
              hide-details="auto"
              v-model.number="formupdate.maximum_bet_prize"
            ></v-text-field>
          </div>
          <v-card-actions class="justify-center">
            <v-btn
              class="btn_setting"
              color="success"
              :loading="loading_btn"
              @click="submitEdit(formupdate)"
              >บันทึก</v-btn
            >
            <v-btn color="error" @click="closeEdit()">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card></v-form
      >
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../form/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      loading_btn: false,
      valid: false,
      option: {},
      pageSizes: [5, 10, 15, 25],
      optionupline: {},
      pageSizesupline: [5, 10, 15, 25],
      formset: {
        profit: 0,
        flexodd: 0
      },
      max_profit_lost: 0,
      adddl: false,
      dlupdate: false,
      formupdate: {},
      selectCate: null,
      selectType: "02770ee9-3448-4258-8d40-a7a13c7d1257",
      listtype: [],
      isLoading: true,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "อัตราจ่ายต่ำสุด",
          value: "minimum_out_come_rate",
          class: "font-weight-bold",
          align: "center"
        },

        {
          text: "อัตราจ่ายสูงสุด",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "อัตราจ่ายที่ได้รับมา",
          value: "received_out_come_rate",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center"
        },

        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center"
        },

        {
          text: "ดำเนินการ",
          value: "action",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "เเก้ไขล่าสุด",
          value: "updated_by",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center"
        }
      ],
      // headersUpline: [
      //   {
      //     text: "ชนิดหวย",
      //     value: "lottonumbertype_name",
      //     class: "font-weight-bold",
      //     align: "center"
      //   },
      //   {
      //     text: "อัตราจ่าย",
      //     value: "maximum_out_come_rate",
      //     class: "font-weight-bold",
      //     align: "center"
      //   },
      //   {
      //     text: "แทงต่ำสุด",
      //     value: "minimum_bet_prize",
      //     class: "font-weight-bold",
      //     align: "center"
      //   },
      //   {
      //     text: "แทงสูงสุด",
      //     value: "maximum_bet_prize",
      //     class: "font-weight-bold",
      //     align: "center"
      //   }
      // ],
      itemcategory: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      },
      dataOutcome: [],
      dataUpline: [],
      percentFlexOdd: {}
    };
  },
  async fetch() {
    try {
      this.listtype = this.$store.state.lottosetting.lottotype;

      this.getPerMaxloss();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("flexodd", [
      "getTypelottoAll",
      "getCategoryflexbyid",
      "getOutcomerate",
      "getOutcomerateUplined",
      "updateFlexOutcomerate",
      "setflexoddProfit",
      "getPerflex",
      "getMaxLoss",
      "configMaxLoss"
    ]),
    async getPerMaxloss() {
      this.isLoading = true;
      try {
        let { data: perMaxlsoe } = await this.getMaxLoss();
        this.max_profit_lost = perMaxlsoe.max_profit_lost;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    getDetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    },
    async setprofit() {
      if (this.$refs.formProfit.validate()) {
        try {
          this.$swal({
            title: "ตั้งค่ากำไรขั้นต่ำและอัตราน้ำไหลขั้นต่ำ?",
            icon: "primary",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตั้งค่า",
            cancelButtonText: "ยกเลิก"
          }).then(async result => {
            if (result.isConfirmed) {
              await this.setflexoddProfit(this.formset);
              this.$swal({
                icon: "success",
                title: "ตั้งค่าเรียบร้อย",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบ",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async setprofitLoss() {
      let body = this.max_profit_lost;
      if (this.$refs.formMax_profit_lost.validate()) {
        try {
          this.$swal({
            title: "ตั้งค่ายอดขาดทุนสูงสุด?",
            icon: "primary",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตั้งค่า",
            cancelButtonText: "ยกเลิก"
          }).then(async result => {
            if (result.isConfirmed) {
              try {
                await this.configMaxLoss(body);
                this.$swal({
                  icon: "success",
                  title: "ตั้งค่าเรียบร้อย",
                  showConfirmButton: false,
                  timer: 1500
                });
              } catch (error) {
                this.$swal({
                  icon: "error",
                  title: `${error.response.data.message}`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
              this.getPerMaxloss();
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบ",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async selectCatebytype() {
      this.selectCate = "";
      this.isLoading = true;
      try {
        const { data } = await this.getCategoryflexbyid(this.selectType);
        this.itemcategory = data.result;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    closeEdit() {
      this.dlupdate = false;
    },

    async selectFlexodd(value) {
      this.getOutComeratebyid(value);
      // this.getUplinebyid(value);
      console.log(value)
    },
    async getOutComeratebyid(id) {
      this.isLoading = true;
      try {
        const { data } = await this.getOutcomerate(id);
        this.dataOutcome = data.result;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async getUplinebyid(id) {
      try {
        const { data } = await this.getOutcomerateUplined(id);
        this.dataUpline = data.result;
      } catch (error) {
        console.log(error);
      }
    },
    openupdateComerate(item) {
      this.dlupdate = true;
      this.formupdate = Object.assign({}, item);
      // this.formupdate = item;
    },
    checkpositive(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async submitEdit(item) {
      this.loading_btn = true;
      item = JSON.parse(JSON.stringify(item));
      if (this.$refs.edtform.validate()) {
        try {
          let body = {
            typecategory_id: this.selectCate,
            lotto_numbertype: [
              {
                lottonumbertype_id: item.lottonumbertype_id,
                minimum_out_come_rate: item.minimum_out_come_rate,
                maximum_out_come_rate: item.maximum_out_come_rate,
                minimum_bet_prize: item.minimum_bet_prize,
                maximum_bet_prize: item.maximum_bet_prize
              }
            ]
          };
          await this.updateFlexOutcomerate(body);
          this.loading_btn = false;
          this.dlupdate = false;
          await this.selectFlexodd(this.selectCate);
        } catch (error) {
          // console.log(error.response.data.message);
          this.$swal({
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.loading_btn = false;
          this.dlupdate = false;
        }
      } else {
        this.$swal({
          icon: "error",
          title: `กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน`,
          showConfirmButton: false,
          timer: 1500
        });
        this.loading_btn = false;
      }
    },
    numberWithCommas(x) {
      var parts = x
        .toFixed(2)
        .toString()
        .split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  },
  created(){
    this.selectCatebytype("cfe77d55-e0f4-4a28-8dca-897005d2f77b");
    this.selectCate = "cfe77d55-e0f4-4a28-8dca-897005d2f77b";
    this.selectFlexodd("cfe77d55-e0f4-4a28-8dca-897005d2f77b");
  }
};
</script>
