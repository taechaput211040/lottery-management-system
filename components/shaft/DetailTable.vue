<template>
  <div class="">
    <v-btn color="red" class="ma-3" small dark @click="$router.go(-1)"
      >ย้อนกลับ</v-btn
    >
    <h3 class="primary--text font-weight-bold my-4">หวยของตัวเอง</h3>
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
        <template #[`item.action`]>
          <v-btn rounded color="black" dark small
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
          align: "start"
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "start"
        },

        {
          text: "ยอดรวมแทง",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "start"
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
          align: "start"
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "start"
        },

        {
          text: "ยอดรวมแทง",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "แก้ไขรายเลข",
          value: "unlimitedNumber",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "แก้ไขโดย",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "start"
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
        `${this.$route.fullPath}&lottonumbertype_id=${item.lottonumbertype_id}`
      );
    },
    ...mapActions("shaft", ["getAllsettingseller", "getAllsettingUpline"]),
    async getSelfeData() {
      this.isLoading = true;
      try {
        let { data } = await this.getAllsettingseller(this.$route.query.id);
        this.datarender = data.result;
        this.isLoading = false;
        console.log(data);
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
        console.log(data, "upline");
      } catch (error) {
        this.isLoading = false;
      }
    }
  }
};
</script>
