<template>
  <div>
    <h2>รายงานผลรางวัล</h2>
    <div class="my-3 rounded-lg white">
      <h3 class="pa-3">ตัวเลือกการค้นหา</h3>
      <v-divider></v-divider>
      <div class="pa-3">
        <v-radio-group v-model="selecttype" row>
          <v-radio label="วันนี้" value="day"></v-radio>
          <v-radio label="เมื่อวาน" value="yesterday"></v-radio>
          <v-radio label="สัปดาห์นี้" value="week"></v-radio>
          <v-radio label="สัปดาห์ที่แล้ว" value="lastweek"></v-radio>
          <v-radio label="เดือน" value="mounth"></v-radio>
          <v-radio label="วันที่" value="findate"></v-radio>
        </v-radio-group>
        <v-row>
          <v-col cols="12" sm="6" v-if="selecttype == 'mounth'">
            <div class="px-2 font-weight-bold">
              เลือกเดือน :
              <el-date-picker
                type="month"
                v-model.trim="filter.month"
                arrow-control
                placeholder="เลือกเดือน"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" sm="6" v-if="selecttype == 'findate'">
            <div class="px-2 font-weight-bold">
              เลือกวัน :
              <el-date-picker
                class="full-width"
                v-model.trim="filter.Date"
                arrow-control
                placeholder="เลือกวันที่ต้องการค้นหา"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12"><v-btn color="primary">ค้นหา</v-btn></v-col>
        </v-row>
      </div>
    </div>
    <div class="white rounded-lg">
      <h3 class="pa-4">หวยรางวัล</h3>
      <v-divider></v-divider>
      <div class=" rounded-lg">
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward">
          <template #[`item.action`]>
            <v-btn rounded color="primary" small
              ><v-icon left>mdi-magnify</v-icon>ดูผล
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
    <div class="mt-4 white rounded-lg">
      <h3 class="pa-3">หวยหุ้น</h3>
      <v-divider></v-divider>
      <div class=" rounded-lg">
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward">
          <template #[`item.action`]>
            <v-btn rounded color="primary" small
              ><v-icon left>mdi-magnify</v-icon>ดูผล
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headersdatelotto: [
        {
          text: "ประเภทหวย",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "งวดหวย",
          value: "lottodate",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "วันที่",
          value: "date",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "3 ตัวบน",
          value: "threeup",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "2 ตัวบน",
          value: "twoup",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "2 ตัวล่าง",
          value: "twodown",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "ดูผล",
          value: "action",
          sort: false,
          align: "center",
          class: "font-weight-bold"
        }
      ],
      itemtypeaward: [
        {
          type: "หวยดาวน์โจนส์ VIP",
          lottodate: "09-02-2022",
          date: "10-02-2022",
          threeup: "674",
          twoup: "74",
          twodown: "01"
        }
      ],
      selecttype: "",
      filter: {
        Date: "",
        month: ""
      }
    };
  },
  watch: {
    selecttype(newVal) {
      if (newVal) {
        this.filter = {
          Date: "",
          month: ""
        };
      }
    }
  }
};
</script>

<style></style>
