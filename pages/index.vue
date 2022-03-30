<template>
  <div>
    <div v-if="!isLoading">
      <v-row>
        <v-col cols="12" sm="4"
          ><card-view
            title="รวมยอดแทง"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/edit.png"
            value="100"
            value_class="primary--text font-weight-bold"
          ></card-view
        ></v-col>
        <v-col cols="12" sm="4"
          ><card-view
            title="รวมยอดรางวัล"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/reward.png"
            value="100"
            value_class="success--text font-weight-bold"
          ></card-view
        ></v-col>
        <v-col cols="12" sm="4"
          ><card-view
            title="กำไรขาดทุน"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/profit.png"
            value="B 100 "
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
        <v-col cols="12" lg="6" xl="4">
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
                          <span class="font-weight-bold">{{ item.type }}</span>
                        </div>
                        <v-progress-linear
                          height="10"
                          rounded
                          :color="randomcolor(index)"
                          class="mt-2"
                          :value="item.summary"
                        ></v-progress-linear>
                      </div>
                    </template>
                  </v-data-table>
                </div></div
            ></v-col>
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
                          <span class="font-weight-bold">{{ item.type }}</span>
                        </div>
                        <v-progress-linear
                          height="10"
                          rounded
                          :color="randomcolor(index)"
                          class="mt-2"
                          :value="item.summary"
                        ></v-progress-linear>
                      </div>
                    </template>
                  </v-data-table>
                </div></div
            ></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6" xl="8">
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
import VueApexCharts from "vue-apexcharts";
import CardView from "../components/form/CardView.vue";
export default {
  components: { VueApexCharts, CardView },
  data() {
    return {
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
          value: "summary",
          filterable: false,
          sortable: false,
          align: "center",
          cellClass: "font-weight-bold",
          width: "100px"
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
          align: "center"
        },
        {
          text: "ชนิดหวย",
          value: "category",
          sortable: false,
          filterable: false,
          align: "center"
        },
        {
          text: "รับของ",
          value: "recieve",
          sortable: false,
          filterable: false,
          align: "center"
        },
        {
          text: "ยอดเเทง",
          value: "bet",
          sortable: false,
          filterable: false,
          align: "center"
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
