<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h3 class="text-center mt-2">Dashboard</h3>
          <v-row class="pa-3">
            <v-col cols="6" md="3" class="pa-2">
              <v-card class="elevation-2">
                <v-card-title>หวยยอดนิยม</v-card-title>
                <div id="card">
                  <div id="chart">
                    <VueApexCharts
                      type="radar"
                      height="350"
                      :options="chartOptions"
                      :series="series"
                    ></VueApexCharts>
                  </div>
                </div> </v-card
            ></v-col>

            <v-col cols="6" md="3" class="pa-2">
              <card-view
                title="หมายเลขที่ออกล่าสุด"
                :value="20"
                color="primary"
                class="elevation-2"
                :classChild="{ card_deposit: true }"
              ></card-view>
              <card-view
                title="หมายเลขที่ออกล่าสุด"
                :value="20"
                color="primary"
                class="elevation-2"
                :classChild="{ card_deposit: true }"
              ></card-view>
              <card-view
                title="หมายเลขที่ออกล่าสุด"
                :value="20"
                color="primary"
                class="elevation-2 "
                @editTodo="testtodo"
                :classChild="{ card_deposit: true }"
              ></card-view
            ></v-col>
          </v-row>
          <!--<report-winlose></report-winlose> -->
        </v-container>
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
import reportWinlose from "../components/reportWinlose.vue";
import CardView from "../components/form/CardView.vue";

export default {
  components: { reportWinlose, VueApexCharts, CardView },
  data() {
    return {
      isLoading: false,

      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
        },
        {
          name: "Series 2",
          data: [20, 30, 40, 80, 20, 80]
        },
        {
          name: "Series 3",
          data: [44, 76, 78, 13, 43, 10]
        },
        {
          name: "Series 3",
          data: [14, 76, 8, 3, 43, 40]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "radar"
        },
        title: {
          text: "Radar Chart - Multi Series"
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ["2011", "2012", "2013", "2014", "2015", "2016"]
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
