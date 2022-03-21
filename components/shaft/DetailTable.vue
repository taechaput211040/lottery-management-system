<template>
  <div class="">
    <div class="d-flex align-baseline">
      <v-btn color="red" class="ma-3" small dark @click="$router.go(-1)"
        >ย้อนกลับ</v-btn
      >
      <h3 class="primary--text font-weight-bold my-4">
        หวยของตัวเอง :
        <span class="purple--text "> {{ this.$route.query.title }}</span>
      </h3>
    </div>

    <div class="rounded-lg white">
      <v-data-table
        class="elevation-2"
        :headers="headersdatelotto"
        :loading="isLoading"
        :items="datarender"
      >
        <template #[`item.no`]="{index}">
          {{ index + 1 }}
        </template>
        <template #[`item.unlimitedNumber`]="{item}">
          <v-btn rounded color="primary" dark small @click="unlimitDetail(item)"
            ><v-icon left>mdi-plus</v-icon>เพิ่มเลขอั้น
          </v-btn>
        </template>
        <template #[`item.action`]="{item}">
          <v-btn
            rounded
            color="black"
            dark
            small
            @click="openDialogupdate(item)"
            ><v-icon left>mdi-cog</v-icon> ตั้งค่า
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <h3 class="primary--text font-weight-bold my-4">หวย upline</h3>
    <div class="rounded-lg white ">
      <v-data-table
        class="elevation-2"
        :headers="headersUpline"
        :items="uplinedItem"
        :loading="isLoading"
      >
        <template #[`item.no`]="{index}">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </div>
    <v-dialog max-width="600px" v-model="updateDiaglog">
      <v-card class="pa-3">
        <v-card-title>แก้ไขชนิดหวย</v-card-title>

        <div>
          <v-text-field
            hide-details="auto"
            v-model="form_edit.lottonumbertype_name"
            label="ชื่อหวย"
            outlined
            disabled
            filled
            dense
            class="my-2"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            v-model="form_edit.maximum_out_come_rate"
            label="อัตราจ่ายสูงสุด"
            outlined
            dense
            class="my-2"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            v-model="form_edit.minimum_bet_prize"
            label="อัตราแทงขั้นต่ำ"
            dense
            outlined
            class="my-2"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            v-model="form_edit.maximum_bet_prize"
            label="อัตราแทงสูงสุด"
            dense
            outlined
            class="my-2"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            v-model="form_edit.self_receive_amount"
            label="รับของ"
            dense
            class="my-2"
            outlined
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            v-model="form_edit.discount_amount"
            label="ยอดส่วนลด"
            outlined
            class="my-2"
            dense
          ></v-text-field>
        </div>
        <v-card-actions>
          <v-btn class="success" @click="submitUpdate()">เเก้ไข</v-btn>
          <v-btn class="error" @click="updateDiaglog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      updateDiaglog: false,
      form_edit: {},
      uplinedItem: [],
      isLoading: true,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersUpline: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
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
          text: "รับของปัจจุบัน",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
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
      headersdatelotto: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
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
          text: "รับของ",
          value: "self_receive_amount",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "รับของปัจจุบัน",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
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
          text: "แก้ไขเลขอั้น",
          value: "unlimitedNumber",
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
      datarender: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
  async fetch() {
    this.getSelfeData();
    this.getUplinedata();
  },
  methods: {
    unlimitDetail(item) {
      console.log(item);
      this.$router.push(
        `${this.$route.fullPath}&lottonumbertype_id=${item.lottonumbertype_id}&typename=${item.lottonumbertype_name}&number=${item.lottonumbertype_number}`
      );
    },
    ...mapActions("shaft", [
      "getAllsettingseller",
      "getAllsettingUpline",
      "updateSettingseller"
    ]),
    
    async getSelfeData() {
      this.isLoading = true;
      try {
        let { data } = await this.getAllsettingseller(this.$route.query.id);
        this.datarender = data.result;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
    async getUplinedata() {
      this.isLoading = true;
      try {
        let { data } = await this.getAllsettingUpline(this.$route.query.id);
        this.uplinedItem = data.result;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
    openDialogupdate(item) {
      this.updateDiaglog = true;
      this.form_edit = item;
    },
    async submitUpdate() {
      try {
        let body = {
          typecategory_id: this.$route.query.id,
          lotto_numbertype: [
            {
              lottonumbertype_id: this.form_edit.lottonumbertype_id,
              maximum_out_come_rate: this.form_edit.maximum_out_come_rate,
              minimum_bet_prize: this.form_edit.minimum_bet_prize,
              maximum_bet_prize: this.form_edit.maximum_bet_prize,
              self_receive_amount: this.form_edit.self_receive_amount,
              discount_amount: this.form_edit.discount_amount
            }
          ]
        };
        await this.updateSettingseller(body);
        this.updateDiaglog = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.updateDiaglog = false;
        this.$fetch();
      }
    }
  }
};
</script>
