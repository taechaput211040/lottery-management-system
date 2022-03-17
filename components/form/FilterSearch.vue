<template>
  <div class="my-3 rounded-lg white">
    <h3 class="pa-3">ตัวเลือกการค้นหา</h3>
    <v-divider></v-divider>
    <div class="pa-3">
      <v-row>
        <v-col cols="12" sm="3">
          <v-select
            @change="selectfiltertype"
            label="เลือกการค้นหา"
            :items="itemdate"
            hide-details="auto"
            dense
            outlined
            v-model="selecttype"
          ></v-select
        ></v-col>
        <v-col cols="12" sm="9" v-if="selecttype == 'findate'">
          <div class="px-2 font-weight-bold row">
            <div class="col-12  col-sm-6 col-lg-auto col-xl-auto">
              วันที่ :
              <el-date-picker
                class="full-width"
                v-model.trim="filter.startDate"
                arrow-control
                placeholder="เลือกวันที่ต้องการค้นหา"
              >
              </el-date-picker>
            </div>
            <div class="col-12 col-sm-6 col-lg-auto col-xl-auto">
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
        <v-col cols="12">
          <v-btn color="primary" @click="searchbyfillter">ค้นหา</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemdate: [
        { text: "วันนี้", value: "day" },
        { text: "สัปดาห์นี้", value: "week" },
        { text: "วันที่", value: "findate" }
      ],
      selecttype: "findate",
      filter: {
        startDate: undefined,
        endDate: undefined
      }
    };
  },
  mounted() {
    this.selectfiltertype(this.selecttype);
  },
  methods: {
    searchbyfillter() {
      this.$emit("search", this.filter);
    },
    getDateTime(date) {
      return this.$moment(date).format("YYYY-MM-DDTHH:mm:ss");
    },
    selectfiltertype(value) {
      let today = new Date();
      switch (value) {
        case "findate":
          this.filter = {
            startDate: this.getDateTime(
              new Date(today.getFullYear(), today.getMonth(), 1)
            ),
            endDate: this.getDateTime(
              new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(
                23,
                59,
                59,
                999
              )
            )
          };
          break;
        case "week":
          var wfday = today.getDay(),
            diff = today.getDate() - wfday + (wfday == 0 ? -6 : 1);
          var wlday = diff + 6;
          this.filter = {
            startDate: this.getDateTime(
              new Date(today.setDate(diff)).setHours(0, 0, 0, 0)
            ),
            endDate: this.getDateTime(
              new Date(today.setDate(wlday)).setHours(23, 59, 59, 999)
            )
          };
          break;
        case "day":
          console.log("htti");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style></style>
