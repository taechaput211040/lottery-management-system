<template>
  <div class="">
    <v-btn color="red" class="ma-3" small dark @click="$router.go(-1)"
      >ย้อนกลับ</v-btn
    >
    <div class="d-flex align-baseline">
      <h3 class="primary--text font-weight-bold my-4">หวยของตัวเอง</h3>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded
        ><v-icon>mdi-plus</v-icon>เพิ่มเลขอั้น</v-btn
      >
    </div>

    <div class="rounded-lg white">
      <v-data-table
        class="elevation-2"
        :headers="headersunlimited"
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
      headersunlimited: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
        {
          text: "เลข",
          value: "number",
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
          text: "ยอดที่เปิดรับ",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "ยอดที่รับแล้ว",
          value: "discount_amount",
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
  },
  methods: {
    unlimitDetail(item) {
      console.log(item);
      this.$router.push(
        `${this.$route.fullPath}&lottonumbertype_id=${item.lottonumbertype_id}`
      );
    },
    ...mapActions("shaft", ["getAllsettingseller", "getAllunlimited"]),
    async getSelfeData() {
      this.isLoading = true;
      try {
        let params = {
          typecategory_id: this.$route.query.id,
          lottonumbertype_id: this.$route.query.lottonumbertype_id
        };
        let { data } = await this.getAllunlimited(params);
        if (data.result) {
          this.datarender = data.result;
          this.isLoading = false;
        } else {
          this.datarender = [];
          this.isLoading = false;
        }

        console.log(data);
      } catch (error) {
        this.isLoading = false;
      }
    }
  }
};
</script>
