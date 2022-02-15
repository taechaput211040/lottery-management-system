<template>
  <v-flex>
    <h2>รายการแทง</h2>
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
          <v-col cols="12" v-if="selecttype == 'findate'">
            <div class="px-2 font-weight-bold row">
              <div class="col-12  col-sm-6 col-lg-3">
                ตั้งเเต่วันที่ :
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.startDate"
                  arrow-control
                  placeholder="เลือกวันที่ต้องการค้นหา"
                >
                </el-date-picker>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                ถึงวันที่ :
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.endDate"
                  arrow-control
                  placeholder="เลือกวันที่ต้องการค้นหา"
                >
                </el-date-picker>
              </div>
            </div>
          </v-col>
          <v-col cols="12"><v-btn color="primary">ค้นหา</v-btn></v-col>
        </v-row>
      </div>
    </div>
    <div class="white rounded-lg">
      <div class="rounded-lg white">
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward">
          <template #[`item.action`]>
            <v-btn rounded color="primary" small @click="dialogdetail = true"
              ><v-icon left>mdi-magnify</v-icon>ดูผล
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card class="pa-3">
        <v-data-table :headers="headerDetail"> </v-data-table>
      </v-card>
      <v-btn color="error" @click="dialogdetail = false">ปิด</v-btn>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      headerDetail: [
        {
          text: "ประเภท หมายเลข",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอด",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ส่วนลด",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "รวม",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "จ่ายรวม",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "type",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        }
      ],
      dialogdetail: false,
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
        startDate: "",
        endDate: ""
      }
    };
  },
  watch: {
    selecttype(newVal) {
      if (newVal) {
        this.filter = {
          startDate: "",
          endDate: ""
        };
      }
    }
  }
};
</script>

<style></style>
