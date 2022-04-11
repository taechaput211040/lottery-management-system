<template>
  <div>
    <div class=" my-3 pa-3" v-if="!isLoading">
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
        <v-col cols="12" sm="6" v-if="$store.state.auth.role == 'LOTTO'">
          <div class="rounded-lg white">
            <div class="success--text font-weight-bold pa-2">
              ตั้งค่ากำไรและอัตราน้ำไหล
            </div>
            <v-divider v-model="valid" ref="formprofit"></v-divider>
            <v-form
              ><div class="row pa-2">
                <div class="col-6">
                  กำไรขั้นต่ำ(%)
                  <v-text-field
                    dense
                    v-model.number="formset.profit"
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
                <div class="col-6">
                  อัตราน้ำไหลขั้นต่ำ(%)
                  <v-text-field
                    dense
                    type="number"
                    v-model.number="formset.flexodd"
                    @keypress="e => checkpositive(e)"
                    placeholder="กรอกอัตราน้ำไหลขั้นต่ำ"
                    outlined
                    hide-details="auto"
                    required
                    :rules="[v => !!v || 'กรุณากรอกอัตราน้ำไหลขั้นต่ำ']"
                  ></v-text-field>
                </div>
                <div class="text-right col-12 pb-3">
                  <v-btn color="success" @click="setprofit(formset)"
                    >บันทึก</v-btn
                  >
                </div>
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </div>
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
        <template #[`item.action`]="{item}">
          <v-btn
            rounded
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

    <div v-if="selectCate != null" class="rounded-lg white pa-3 mt-3">
      <h4 class="my-2">หวยของ upline</h4>
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
    </div>

    <v-dialog max-width="400px" v-model="dlupdate">
      <v-form ref="edtform">
        <v-card class="pa-3">
          <v-card-title primary-title class="justify-center font-weight-bold">
            แก้ไขอัตราหวยน้ำไหล
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
              label="อัตราจ่ายสูงสุด"
              dense
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราการจ่ายสูงสุด"
              @keypress="e => checkpositive(e)"
              hide-details="auto"
              v-model.number="formupdate.maximum_out_come_rate"
            ></v-text-field>
            <v-text-field
              outlined
              label="แทงต่ำสุด"
              type="number"
              @keypress="e => checkpositive(e)"
              placeholder="กรุณากรอกยอดแทงต่ำสุด"
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
              dense
              hide-details="auto"
              v-model.number="formupdate.maximum_bet_prize"
            ></v-text-field>
          </div>
          <v-card-actions class="justify-center">
            <v-btn color="success" @click="submitEdit(formupdate)"
              >ตั้งค่า</v-btn
            >
            <v-btn color="error" @click="closeEdit()">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card></v-form
      >
    </v-dialog>
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
export default {
  data() {
    return {
      valid: false,
      option: {},
      pageSizes: [5, 10, 15, 25],
      optionupline: {},
      pageSizesupline: [5, 10, 15, 25],
      formset: {
        profit: 0,
        flexodd: 0
      },
      adddl: false,
      dlupdate: false,
      formupdate: {},
      selectCate: null,
      selectType: null,
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
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center"
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
      headersUpline: [
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center"
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
        }
      ],
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
    this.isLoading = true;
    try {
      this.listtype = this.$store.state.lottosetting.lottotype;
      this.isLoading = false;
      this.getPercent();
    } catch (error) {
      console.log(error);
      this.isLoading = false;
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
      "getPerflex"
    ]),
    getDetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    },
    async setprofit() {
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
            this.getPercent();
          } else {
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async selectCatebytype() {
      try {
        const { data } = await this.getCategoryflexbyid(this.selectType);
        this.itemcategory = data.result;
      } catch (error) {
        console.log(error);
      }
    },
    closeEdit() {
      this.dlupdate = false;
    },
    async getPercent() {
      let { data: perflex } = await this.getPerflex();
      this.formset.profit = perflex.result.profit;
      this.formset.flexodd = perflex.result.flex_odd_lotto;
    },
    async selectFlexodd(value) {
      this.getOutComeratebyid(value);
      this.getUplinebyid(value);
    },
    async getOutComeratebyid(id) {
      try {
        const { data } = await this.getOutcomerate(id);
        this.dataOutcome = data.result;
      } catch (error) {
        console.log(error);
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
      item = JSON.parse(JSON.stringify(item));
      console.log(item);
      try {
        let body = {
          typecategory_id: this.selectCate,
          lotto_numbertype: [
            {
              lottonumbertype_id: item.lottonumbertype_id,
              maximum_out_come_rate: item.maximum_out_come_rate,
              minimum_bet_prize: item.minimum_bet_prize,
              maximum_bet_prize: item.maximum_bet_prize
            }
          ]
        };
        await this.updateFlexOutcomerate(body);
        this.dlupdate = false;
        await this.selectFlexodd(this.selectCate);
      } catch (error) {
        this.dlupdate = false;
      }
    }
  }
};
</script>
