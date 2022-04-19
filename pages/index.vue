<template>
  <div>
    <div v-if="!isLoading">
      <v-row>
        <v-col cols="12" sm="4"
          ><card-view
            title="รวมยอดแทง"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/edit.png"
            :value="this.betValue + ` บาท`"
            value_class="primary--text font-weight-bold"
          ></card-view
        ></v-col>
        <v-col cols="12" sm="4"
          ><card-view
            title="รวมยอดรางวัล"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/reward.png"
            :value="this.payoutValue + ` บาท`"
            value_class="success--text font-weight-bold"
          ></card-view
        ></v-col>
        <v-col cols="12" sm="4"
          ><card-view
            title="กำไรขาดทุน"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/profit.png"
            :value="parseInt(this.betValue - this.payoutValue) + ` บาท`"
            value_class="warning--text font-weight-bold"
          ></card-view
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12"
          ><div class="rounded-lg white">
            <div
              class="title_card rounded-t-xl d-sm-flex pa-4 font-weight-bold"
            >
              <h2>ยอดกำไร/ขาดทุน</h2>
              <v-spacer></v-spacer>
              <div class="text-center ">
                <v-btn
                  class="mx-1 font-weight-bold"
                  small
                  color="primary"
                  @click="changDatefillter('findate')"
                  >วัน</v-btn
                ><v-btn
                  @click="changDatefillter('week')"
                  class="mx-1 font-weight-bold"
                  small
                  color="primary"
                  >สัปดาห์</v-btn
                ><v-btn
                  @click="changDatefillter('thismounth')"
                  class="mx-1 font-weight-bold"
                  small
                  color="primary"
                  >เดือน</v-btn
                >
              </div>
            </div>
            <v-divider></v-divider>
            <div class="pa-3">
              <VueApexCharts
                ref="realtimeChart"
                type="area"
                height="350"
                :options="chartOptions"
                :series="itemgraphshow"
              ></VueApexCharts>
            </div></div
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6" xl="5">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="12"
              ><div class="rounded-lg white pb-2">
                <div
                  class="title_card align-center pa-4 font-weight-bold d-flex"
                >
                  <h2>ยอดแทงแต่ละประเภทหวย</h2>
                  <v-spacer></v-spacer>
                  <img
                    src="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/edit.png"
                    class="img-icon icon-table"
                  />
                </div>
                <div>
                  <v-data-table
                    :headers="header_bet"
                    :items="itembytype"
                    hide-default-footer
                  >
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        border="left"
                        color="blue-grey"
                        type="error"
                        icon="mdi-warning"
                      >
                        ไม่พบข้อมูล
                      </v-alert>
                    </template>
                    <template #[`item.no`]="{index}">
                      {{ index + 1 }}.
                    </template>
                    <template #[`item.type`]="{item,index}">
                      <div class="pa-2">
                        <div class="d-flex justify-space-between">
                          <span class="font-weight-bold">{{ item.title }}</span>
                        </div>
                        <v-progress-linear
                          height="10"
                          rounded
                          :color="randomcolor(index)"
                          class="mt-2"
                          :value="`${item.bet}`"
                        ></v-progress-linear>
                      </div>
                    </template>
                    <template #[`item.bet`]="{item}">
                      {{ item.bet }} บาท
                    </template>
                  </v-data-table>
                </div>
              </div></v-col
            >
            <v-col cols="12" sm="6" md="6" lg="12">
              <div class="rounded-lg white pb-2">
                <div
                  class="title_card align-center pa-4 font-weight-bold d-flex"
                >
                  <h2>ยอดรางวัลแต่ละประเภทหวย</h2>
                  <v-spacer></v-spacer>
                  <img
                    src="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/reward.png"
                    class="img-icon icon-table"
                  />
                </div>

                <div>
                  <v-data-table
                    :headers="header_bet"
                    :items="itempayout"
                    hide-default-footer
                  >
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        border="left"
                        color="blue-grey"
                        type="error"
                        icon="mdi-warning"
                      >
                        ไม่พบข้อมูล
                      </v-alert>
                    </template>
                    <template #[`item.no`]="{index}">
                      {{ index + 1 }}.
                    </template>
                    <template #[`item.type`]="{item,index}">
                      <div class="pa-2">
                        <div class="d-flex justify-space-between">
                          <span class="font-weight-bold">{{ item.title }}</span>
                        </div>

                        <v-progress-linear
                          height="10"
                          rounded
                          :color="randomcolor(index)"
                          class="mt-2"
                          :value="`${item.payout}`"
                        ></v-progress-linear>
                      </div>
                    </template>
                    <template #[`item.bet`]="{item}">
                      {{ item.payout }} บาท
                    </template>
                  </v-data-table>
                </div>
              </div></v-col
            >
          </v-row>
        </v-col>
        <v-col cols="12" lg="6" xl="7">
          <div class="rounded-lg white pb-2">
            <div class="title_card align-center pa-4 font-weight-bold d-flex">
              <h2>จัดอันดับรับของใกล้จะเต็ม</h2>
              <v-spacer></v-spacer>
              <img
                src="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/parcel%201.png"
                class="img-icon icon-table"
              />
            </div>
            <div>
              <v-data-table
                :headers="header_recieve"
                :items="itemrecieved"
                hide-default-footer
              >
                <template v-slot:no-data>
                  <v-alert
                    :value="true"
                    border="left"
                    color="blue-grey"
                    type="error"
                    icon="mdi-warning"
                  >
                    ไม่พบข้อมูล
                  </v-alert>
                </template>
                <template #[`item.no`]="{index}"> {{ index + 1 }}. </template>
              </v-data-table>
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
  </div>
</template>
<script>
import { mapActions } from "vuex";
import VueApexCharts from "vue-apexcharts";
import CardView from "../components/form/CardView.vue";
export default {
  components: { VueApexCharts, CardView },
  watch: {
    start_day(newVal, oldVal) {
      if (newVal) {
        this.Opendate = null;
        this.Closedate = null;
        this.Betdate = null;
      }
    },
    close_date(newVal, oldVal) {
      if (newVal) {
        this.Closedate = null;
        this.Betdate = null;
      }
    },
    bet_date(newVal, oldVal) {
      if (newVal) {
        this.Betdate = null;
      }
    }
  },
  computed: {},
  data() {
    return {
      typeOverview: "day",
      graphRender: [],
      filterDate: {
        start_date: "2022-03-01T00:00:00.000Z",
        end_date: "2022-04-30T23:59:59.999Z"
      },
      betValue: "",
      itempayout: [],
      payoutValue: "",
      winloseValue: "",
      dateTo: "",
      dateFrom: "",
      startTime: "",
      endTime: "",
      Closedate: "",
      Opendate: "",
      Betdate: "",
      itembytype: [
        {
          type: "หวยรัฐบาล",
          summary: "35,000"
        },
        {
          type: "หวยออมสิน",
          summary: "35,000"
        },
        {
          type: "หวยลาว",
          summary: "35,000"
        },
        {
          type: "หุ้นใต้หวัน",
          summary: "35,000"
        },
        {
          type: "หุ้นอังกฤษ",
          summary: "35,000"
        }
      ],
      header_bet: [
        {
          text: "ลำดับ",
          value: "no",
          sortable: false,
          filterable: false,
          align: "center",
          width: "50px",
          cellClass: "font-weight-bold"
        },
        {
          text: "ประเภทหวย",
          value: "type",
          sortable: false,
          filterable: false,
          align: "center"
        },
        {
          text: "ผลรวม",
          value: "bet",
          filterable: false,
          sortable: false,
          align: "center",
          cellClass: "font-weight-bold",
          width: "150px"
        }
      ],
      header_recieve: [
        {
          text: "ลำดับ",
          value: "no",
          sortable: false,
          filterable: false,
          align: "center",
          width: "50px",
          cellClass: "font-weight-bold"
        },
        {
          text: "ประเภทหวย",
          value: "type",
          sortable: false,
          filterable: false,
          align: "center",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชนิดหวย",
          value: "category",
          sortable: false,
          filterable: false,
          align: "center",
          cellClass: "font-weight-bold"
        },
        {
          text: "รับของ",
          value: "recieve",
          sortable: false,
          filterable: false,
          align: "center",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอดเเทง(บาท)",
          value: "bet",
          sortable: false,
          filterable: false,
          align: "center",
          cellClass: "font-weight-bold"
        }
      ],
      itemrecieved: [
        {
          type: "หวยรัฐบาล",
          category: "2ตัวบน",
          recieve: "42,000",
          bet: "35,000"
        },
        {
          type: "หวยรัฐบาล",
          category: "2ตัวบน",
          recieve: "42,000",
          bet: "35,000"
        },
        {
          type: "หวยรัฐบาล",
          category: "2ตัวบน",
          recieve: "42,000",
          bet: "35,000"
        },
        {
          type: "หวยรัฐบาล",
          category: "2ตัวบน",
          recieve: "42,000",
          bet: "35,000"
        },
        {
          type: "หวยรัฐบาล",
          category: "2ตัวบน",
          recieve: "42,000",
          bet: "35,000"
        },
        {
          type: "หวยรัฐบาล",
          category: "2ตัวบน",
          recieve: "42,000",
          bet: "35,000"
        }
      ],
      isLoading: false,

      itemgraphshow: [
        {
          name: "ยอดกำไร",
          data: []
        },
        {
          name: "ยอดขาดทุน",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: "area",
          height: 300,
          foreColor: "#999",
          stacked: true,
          dropShadow: {
            enabled: true,
            enabledSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06
          }
        },
        fill: {
          type: "solid",
          fillOpacity: 0.7
        },

        dataLabels: {
          enabled: false
        },
        colors: ["#00E396", "#FF5951"],
        stroke: {
          curve: "smooth"
        }
      }
    };
  },
  async fetch() {
    this.getDashboarddata();
    this.getDataGraph();
  },
  methods: {
    getDateTime(date) {
      return this.$moment(date).format("YYYY-MM-DDTHH:mm:ss" + "Z");
    },

    async mapchart(item) {
      this.itemgraphshow[0].data = [];
      this.itemgraphshow[1].data = [];
      if (this.typeOverview !== "day") {
        for (let i = 0; i < item.length; i++) {
          this.itemgraphshow[0].data.push({
            x: this.$moment(item[i].date).format("YYYY-MM-DD"),
            y: item[i].bet
          });
          this.itemgraphshow[1].data.push({
            x: this.$moment(item[i].date).format("YYYY-MM-DD"),
            y: item[i].payout
          });
        }
      } else {
        for (let i = 0; i < item.length; i++) {
          this.itemgraphshow[0].data.push({
            x: this.$moment(item[i].date.toString(), "LT").format("HH:mm"),
            y: item[i].bet
          });
          this.itemgraphshow[1].data.push({
            x: this.$moment(item[i].date.toString(), "LT").format("HH:mm"),
            y: item[i].payout
          });
        }
      }

      this.$refs.realtimeChart.updateSeries(this.itemgraphshow, false, true);
    },
    changDatefillter(value) {
      let today = new Date();
      let datetoday = new Date().toJSON().slice(0, 10);

      switch (value) {
        case "findate":
          this.typeOverview = "day";
          this.getDataGraph();
          this.filterDate = {
            start_date: this.$moment()
              .set({ hour: 0, minute: 0, second: 0 })
              .format(),
            end_date: this.$moment()
              .set({ hour: 23, minute: 59, second: 59 })
              .format()
          };
          break;
        case "week":
          this.typeOverview = "week";
          this.getDataGraph();
          var wfday = today.getDay(),
            diff = today.getDate() - wfday + (wfday == 0 ? -6 : 1);
          var wlday = diff + 6;
          this.filterDate = {
            start_date: this.getDateTime(
              new Date(today.setDate(diff)).setHours(0, 0, 0, 0)
            ),
            end_date: this.getDateTime(
              new Date(today.setDate(wlday)).setHours(23, 59, 59, 999)
            )
          };
          break;
        case "thismounth":
          this.typeOverview = "month";
          this.getDataGraph();
          this.filterDate = {
            start_date: this.getDateTime(
              new Date(today.getFullYear(), today.getMonth(), 1)
            ),
            end_date: this.getDateTime(
              new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(
                23,
                59,
                59,
                999
              )
            )
          };
          break;
        default:
          break;
      }
      this.getDashboarddata();
    },

    getParameter() {
      let params = {
        start_time: this.filterDate.start_date,
        end_time: this.filterDate.end_date
      };
      return params;
    },
    ...mapActions("report", ["getDashboardWinlose", "getGraphReport"]),
    async getDataGraph() {
      try {
        let params = {
          type: this.typeOverview
        };
        let { data } = await this.getGraphReport(params);

        this.graphRender = data.sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        this.mapchart(this.graphRender);
      } catch (error) {
        console.log(error);
      }
    },
    async getDashboarddata() {
      let params = this.getParameter();
      try {
        let { data: response } = await this.getDashboardWinlose(params);
        this.betValue = response.bet;
        this.payoutValue = response.payout;
        this.winloseValue = response.winlose;
        this.itembytype = response.programs
          .sort(function(a, b) {
            return b.bet - a.bet;
          })
          .slice(0, 5);
        this.itempayout = response.programs
          .sort(function(a, b) {
            return b.payout - a.payout;
          })
          .slice(0, 5);
      } catch (error) {
        console.log(error);
      }
    },
    async testtodo(data) {
      console.log(data);
    },
    randomcolor(value) {
      let colorprogress = "";
      if (value == 0) {
        colorprogress = "success";
      } else if (value == 1) {
        colorprogress = "red";
      } else if (value == 2) {
        colorprogress = "purple";
      } else if (value == 3) {
        colorprogress = "blue";
      } else {
        colorprogress = "warning";
      }
      return colorprogress;
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
