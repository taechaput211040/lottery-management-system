<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-col cols="12" sm="4"
          ><card-view
            title="รวมยอดแทง"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/bet.png"
            value="100"
          ></card-view
        ></v-col>
        <v-col cols="12" sm="4"
          ><card-view
            title="รวมยอดรางวัล"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/poker-chips.png"
            value="100"
          ></card-view
        ></v-col>
        <v-col cols="12" sm="4"
          ><card-view
            title="กำไรขาดทุน"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/online-gambling.png"
            value="$ 100 "
          ></card-view
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12"
          ><div class="rounded-lg white">
            <div
              class="title_card rounded-t-xl d-sm-flex pa-4 font-weight-bold"
            >
              <h2>ยอดกำไรขาดทุน</h2>
              <v-spacer></v-spacer>
              <div class="text-center ">
                <v-btn class="mx-1 font-weight-bold" small color="primary"
                  >วัน</v-btn
                ><v-btn class="mx-1 font-weight-bold" small color="primary"
                  >สัปดาห์</v-btn
                ><v-btn class="mx-1 font-weight-bold" small color="primary"
                  >เดือน</v-btn
                >
              </div>
            </div>
            <v-divider></v-divider>
            <div class="pa-3">
              <VueApexCharts
                type="area"
                height="350"
                :options="chartOptions"
                :series="series"
              ></VueApexCharts>
            </div></div
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="rounded-xl white">
            <div class="title_card rounded-t-xl  pa-4 font-weight-bold">
              <h2>ยอดแทงแต่ละประเภทหวย</h2>
            </div>
            <v-divider></v-divider>
            <div class="pa-5 font-weight-bold">
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หวยรัฐบาล</span>
                  <span class="primary--text">35000</span>
                </div>
                <v-progress-linear
                  height="10"
                  rounded
                  class="mt-2"
                  value="75"
                ></v-progress-linear>
              </div>

              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หวยออมสิน</span>
                  <span class="deep-purple--text">35000</span>
                </div>
                <v-progress-linear
                  color="deep-purple accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="65"
                ></v-progress-linear>
              </div>
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หวยลาว</span>
                  <span class="deep-orange--text">35000</span>
                </div>
                <v-progress-linear
                  color="deep-orange accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="15"
                ></v-progress-linear>
              </div>
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หุ้นไต้หวัน</span>
                  <span class="yellow--text">35000</span>
                </div>
                <v-progress-linear
                  color="yellow accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="30"
                ></v-progress-linear>
              </div>
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หุ้นอังกฤษ</span>
                  <span class="green--text">35000</span>
                </div>
                <v-progress-linear
                  color="green accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="45"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="rounded-xl white">
            <div class="title_card rounded-t-xl  pa-4 font-weight-bold">
              <h2>ยอดรางวัลแต่ละประเภทหวย</h2>
            </div>
            <v-divider></v-divider>
            <div class="pa-5 font-weight-bold">
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หวยรัฐบาล</span>
                  <span class="primary--text">35000</span>
                </div>
                <v-progress-linear
                  height="10"
                  rounded
                  class="mt-2"
                  value="75"
                ></v-progress-linear>
              </div>

              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หวยออมสิน</span>
                  <span class="deep-purple--text">35000</span>
                </div>
                <v-progress-linear
                  color="deep-purple accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="65"
                ></v-progress-linear>
              </div>
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หวยลาว</span>
                  <span class="deep-orange--text">35000</span>
                </div>
                <v-progress-linear
                  color="deep-orange accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="15"
                ></v-progress-linear>
              </div>
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หุ้นไต้หวัน</span>
                  <span class="yellow--text">35000</span>
                </div>
                <v-progress-linear
                  color="yellow accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="30"
                ></v-progress-linear>
              </div>
              <div class="py-3">
                <div class="d-flex justify-space-between">
                  <span>หุ้นอังกฤษ</span>
                  <span class="green--text">35000</span>
                </div>
                <v-progress-linear
                  color="green accent-4"
                  height="10"
                  rounded
                  class="mt-2"
                  value="45"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import CardView from "../components/form/CardView.vue";
export default {
  components: { VueApexCharts, CardView },
  data() {
    return {
      isLoading: false,
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41, 22]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        }
      }
    };
  },
  methods: {
    async testtodo(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="scss">
.padding {
  padding: 20px;
}
.select-item {
  align-items: baseline;
}
</style>
