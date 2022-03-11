<template>
  <div>
    <h2>บันทึกผลรางวัล</h2>
    รายการแทง
    <div class="white rounded-lg pa-3">
      ตัวเลือกการค้นหา
    </div>
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
      <v-data-table :headers="header" :items="dataAwardrender">
        <template #[`item.no`]="{index}">
          {{ index + 1 }}
        </template>
        <template #[`item.save`]="{item}">
          <v-btn color="black" dark small rounded @click="openDlupdate(item)"
            ><v-icon left>mdi-calculator</v-icon> คำนวณผลรางวัล</v-btn
          >
        </template>
        <template #[`item.calculate`]="{}">
          <v-btn color="primary" small rounded
            ><v-icon left>mdi-download-box</v-icon> บันทึกผลรางวัล</v-btn
          >
        </template>
      </v-data-table>
    </div>
    <v-dialog max-width="600px" v-model="dlSavenumber">
      <v-card class="pa-3">
        <v-card-title class="justify-center primary--text font-weight-bold">
          บันทึกข้อมูลผลรางวัล
        </v-card-title>
        <div v-for="(item, i) in itemNumber" :key="i">
          <div class="row align-baseline">
            <div class="col-3">{{ item.name }}</div>
            <div class="col-9 row my-1">
              <v-text-field
                class="col-2 mx-1 text-center"
                v-for="j in parseInt(item.amount_reward)"
                :key="j"
                outlined
                type="number"
                hide-details="auto"
                dense
                v-model="keynumber[i]"
                small
              ></v-text-field>
            </div>
          </div>
        </div>
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="submitnumber()">บันทึก</v-btn
          ><v-btn color="error" @click="dlSavenumber = false">ปิด</v-btn>
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
          value: "typecategory_title",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "รอบวันที่",
          value: "date",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "เวลาออกผล",
          value: "time",
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
          text: "บันทึกผลรางวัล",
          value: "save",
          class: "font-weight-bold",
          align: "left"
        }
      ],
      itemNumber: {},
      dataAwardrender: [],
      filter: {
        start_date: "2022-03-14 01:00:00.000",
        end_date: "2022-03-20 01:00:00.000"
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 100
      }
    };
  },

  async fetch() {
    this.selectSection();
  },
  methods: {
    submitnumber(item, key) {
      console.log(item);
      console.log(key);
    },
    ...mapActions("lottosetting", ["getawardlotto", "getlottobyprogram"]),
    getParameter(status) {
      let params = {
        start_date: this.filter.start_date,
        end_date: this.filter.end_date,
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
        this.dataAwardrender = data.result;
        console.log(this.dataAwardrender);
      } catch (error) {
        console.log(error);
      }
    },
    async openDlupdate(item) {
      try {
        let data = await this.getlottobyprogram(item.programlotto_id);
        this.itemNumber = data;
        this.dlSavenumber = true;
      } catch (error) {
        console.log(error);
      }
    },
    modelnumberlotto() {
      return;
    }
  }
};
</script>

<style></style>
