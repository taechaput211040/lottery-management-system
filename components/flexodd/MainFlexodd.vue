<template>
  <div>
    <div class=" my-3 pa-3" v-if="!isLoading">
      <v-row class="pa-1 ">
        <v-col cols="12" sm="6">
          <div class="rounded-lg white pa-2" style="height:100%">
            <span class="primary--text font-weight-bold">เลือกประเภทหวย</span>
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
        </v-col>
        <v-col cols="12" sm="6">
          <div class="rounded-lg white pa-2">
            <span class="success--text font-weight-bold"
              >ตั้งค่ากำไรและอัตราน้ำไหล
            </span>
            <div class="row mt-2">
              <div class="col-6">
                กำไรขั้นต่ำ(%)
                <v-text-field
                  dense
                  v-model="formset.profit"
                  hide-details="auto"
                  class="mb-2"
                  type="number"
                  outlined
                  placeholder="กรอกกำไรขั้นต่ำ"
                ></v-text-field>
              </div>
              <div class="col-6">
                อัตราน้ำไหลขั้นต่ำ(%)
                <v-text-field
                  dense
                  type="number"
                  v-model="formset.flexodd"
                  placeholder="กรอกอัตราน้ำไหลขั้นต่ำ"
                  hide-details="auto"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-right col-12 pb-3">
                <v-btn color="success" @click="setprofit(formset)"
                  >บันทึก</v-btn
                >
              </div>
            </div>
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
        :headers="headersdatelotto"
        :loading="isLoading"
        :items="dataOutcome"
      >
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
    </div>

    <div v-if="selectCate != null" class="rounded-lg white pa-3 mt-3">
      <h4 class="my-2">หวยของ upline</h4>
      <v-data-table
        class="elevation-2"
        :headers="headersUpline"
        :loading="isLoading"
        :items="dataUpline"
      >
      </v-data-table>
    </div>

    <v-dialog max-width="300px" v-model="dlupdate">
      <v-card class="pa-3">
        <v-card-title primary-title>
          แก้ไขอัตราน้ำไหลหวย
        </v-card-title>
        <div>
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
            class="my-2"
            placeholder="กรุณากรอกอัตราการจ่ายสูงสุด"
            hide-details="auto"
            v-model="formupdate.maximum_out_come_rate"
          ></v-text-field>
          <v-text-field
            outlined
            label="แทงต่ำสุด"
            placeholder="กรุณากรอกยอดแทงต่ำสุด"
            dense
            class="my-2"
            hide-details="auto"
            v-model="formupdate.minimum_bet_prize"
          ></v-text-field>
          <v-text-field
            outlined
            placeholder="กรุณากรอกยอดแทงสูงสุด"
            label="แทงสูงสุด"
            class="my-2"
            dense
            hide-details="auto"
            v-model="formupdate.maximum_bet_prize"
          ></v-text-field>
        </div>
        <v-card-actions>
          <v-btn color="success" @click="submitEdit()">ตั้งค่า</v-btn>
          <v-btn color="error" @click="dlupdate = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
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
          text: "ยอดรวมแทง",
          value: "self_receive_balance",
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
      const { data } = await this.getTypelottoAll();
      this.listtype = data.result;
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
          confirmButtonText: "ตั้งค่า"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.setflexoddProfit(this.formset);
            this.$swal({
              icon: "success",
              title: "ตั้งค่าเรียบร้อย",
              showConfirmButton: false,
              timer: 1500
            });
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
      this.formupdate = item;
    },
    async submitEdit() {
      try {
        let body = {
          typecategory_id: this.selectCate,
          lotto_numbertype: [
            {
              lottonumbertype_id: this.formupdate.lottonumbertype_id,
              maximum_out_come_rate: this.formupdate.maximum_out_come_rate,
              minimum_bet_prize: this.formupdate.minimum_bet_prize,
              maximum_bet_prize: this.formupdate.maximum_bet_prize
            }
          ]
        };
        await this.updateFlexOutcomerate(body);
        this.dlupdate = false;
        await this.selectFlexodd(value);
      } catch (error) {
        this.dlupdate = false;
      }
    }
  }
};
</script>
