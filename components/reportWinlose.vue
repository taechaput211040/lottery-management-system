<template>
  <div>
    <div v-if="!isLoading">
      <template>
        <v-card class="ma-2 pa-6">
          <v-row class="select-item py-2">
            <h2 class="px-4">รายงานผลประกอบการ</h2>
          </v-row>
          <v-row class="select-item py-2">
            <h4 class="pa-4">ประเภทเกม:</h4>
            <v-col>
              <v-row>
                <v-checkbox
                  class="my-0 mx-1"
                  v-for="(item, index) in groupList"
                  :key="index"
                  v-model="group_select"
                  :value="item.code"
                  :label="item.name"
                ></v-checkbox>
              </v-row>
              <v-card-actions>
                <v-btn
                  v-if="seen1 == true"
                  dark
                  color="teal"
                  size="small"
                  toggle-color="teal"
                  @click="selectall('game')"
                  >เลือกทั้งหมด
                </v-btn>
                <v-btn
                  dark
                  v-if="seen2 == true"
                  size="small"
                  color="deep-orange"
                  toggle-color="teal"
                  @click="unselectAll('game')"
                  >ไม่เลือกทั้งหมด
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-divider class="pt-5"></v-divider>
          <v-row class="select-item py-2">
            <h4 class="pa-4">ผู้ให้บริการ:</h4>

            <v-col>
              <v-row>
                <v-checkbox
                  class="my-0 mx-1"
                  v-for="(item, index) in providerList"
                  :key="index"
                  v-model="provider_select"
                  :value="item.code"
                  :label="item.name"
                ></v-checkbox>
              </v-row>
              <v-card-actions>
                <v-btn
                  v-if="seen3 == true"
                  dark
                  color="teal"
                  size="small"
                  toggle-color="teal"
                  @click="selectall('provider')"
                  >เลือกทั้งหมด
                </v-btn>
                <v-btn
                  dark
                  v-if="seen4 == true"
                  size="small"
                  color="deep-orange"
                  toggle-color="teal"
                  @click="unselectAll('provider')"
                  >ไม่เลือกทั้งหมด
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row></v-card
        >

        <v-card class=" ma-2 pa-6 mt-5">
          <div class="card">
            <v-row align="center" justify="start">
              <div class="col-md-7 col-12">
                <date-filter-search :filter="dateFilter"></date-filter-search>
              </div>
              <div class="col-4">
                <v-btn color="success">
                  <v-icon left>
                    mdi-magnify
                  </v-icon>
                  Edit
                </v-btn>
              </div>
            </v-row>
          </div></v-card
        >
        <v-card class="mx-auto mt-5 justify-center classtable">
          <v-data-table
            :headers="headers"
            :items="itemexam"
            hide-default-header
            hide-default-footer
            :items-per-page="100"
          >
            <template v-slot:header>
              <thead class="v-data-table-header">
                <tr>
                  <th rowspan="1" colspan="4" class="bg-blue-9 text-white">
                    ยูสเซอร์เนม
                  </th>
                  <th colspan="1" class="bg-blue-10 text-white">สมาชิก</th>
                  <th colspan="1" class="bg-blue-10 text-white">เอเย่น</th>
                  <th colspan="1" class="bg-blue-10 text-white">ซิเนียร์</th>
                  <th colspan="1" class="bg-blue-10 text-white">ผู้ถือหุ้น</th>
                  <th colspan="1" class="bg-blue-10 text-white">คอมปะนี</th>
                  <th colspan="1" class="bg-blue-10 text-white">Smart Bet</th>
                </tr>
                <tr>
                  <th class="color_subtitle">
                    username
                  </th>
                  <th class="color_subtitle">
                    Bet
                  </th>
                  <th class="color_subtitle">
                    Turn Over
                  </th>
                  <th class="color_subtitle">
                    Payout
                  </th>
                  <th class="color_winlose">
                    W/L
                  </th>
                  <th class="color_winlose">
                    W/L
                  </th>
                  <th class="color_winlose">
                    W/L
                  </th>
                  <th class="color_winlose">
                    W/L
                  </th>
                  <th class="color_winlose">
                    W/L
                  </th>
                  <th class="color_winlose">
                    W/L
                  </th>
                </tr>
              </thead>
            </template>
          </v-data-table>
        </v-card>
      </template>
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
export default {
  data() {
    return {
      group_select: [],
      seen1: true,
      seen2: false,
      seen3: true,
      seen4: false,
      provider_select: [],
      dateFilter: {
        // startDate: new Date().setDate(1),
        // startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        // endDate: new Date(
        //   new Date().getFullYear(),
        //   new Date().getMonth() + 1
        // ).setDate(0),
        // endTime: new Date(new Date().setHours(23, 59, 59, 999))
        startDate:
          new Date().getDate() !== 1
            ? new Date().setDate(1)
            : new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1
              ).setDate(1),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().setDate(new Date().getDate() - 1),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
      providerList: [],
      groupList: [],
      role: 6,
      isLoading: false,
      itemexam: [{ username: "" }],
      headers: [
        {
          text: "Username",
          align: "center",
          filterable: false,
          value: "username",
          children: [
            { text: "username" },
            { text: "bet" },
            { text: "turnover" },
            { text: "payout" }
          ]
        },
        { text: "สมาชิก", value: "member" },
        { text: "เอเย่น", value: "agent" },
        { text: "ซีเนียร์", value: "senior" },
        { text: "คอมปะนี", value: "company" }
      ]
    };
  },
  async created() {
    try {
      this.isLoading = true;
      this.getProvider();
      this.getGroup();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions("provider", { load_provider: "load" }),
    ...mapActions("group", ["load_list"]),
    async getGroup() {
      try {
        const {
          data: { results }
        } = await this.load_list();
        if (results) {
          this.groupList = results.filter(
            (item, index) =>
              results.findIndex(r => r.code == item.code) == index
          );
          sessionStorage.setItem("group_list_filter", this.groupList);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    async getProvider() {
      try {
        const { data } = await this.load_provider();
        if (data) {
          this.providerList = data
            .filter(
              (item, index) => data.findIndex(r => r.code == item.code) == index
            )
            .map(x => {
              return {
                code: x.code,
                name: x.name
              };
            });
          sessionStorage.setItem("provider_list_filter", this.providerList);
          // this.provider_code = this.providerList
          //   .filter(
          //     (item, index) =>
          //       this.providerList.findIndex(r => r.code == item.code) == index
          //   )
          //   .map(x => x.code);
        }
        this.isLoading = false;
      } catch (ex) {
        console.log(ex);
        this.isLoading = false;
      }
    },

    getSubHeader(headers) {
      let result = [];
      headers
        .filter(i => i.children)
        .forEach(v => {
          result = result.concat(v.children);
        });
      return result;
    },
    selectall(typeselect) {
      if (typeselect === "game") {
        this.group_select = this.groupList
          .filter(
            (item, index) =>
              this.groupList.findIndex(r => r.code == item.code) == index
          )
          .map(x => x.code);
        this.group_select.push(this.fishing, this.cardboard);
        this.seen1 = false;
        this.seen2 = true;
      } else if (typeselect === "provider") {
        this.provider_select = this.providerList
          .filter(
            (item, index) =>
              this.providerList.findIndex(r => r.code == item.code) == index
          )
          .map(x => x.code);
        this.seen3 = false;
        this.seen4 = true;
      }
    },
    unselectAll(typeselect) {
      if (typeselect === "game") {
        this.group_select = [];
        this.seen1 = true;
        this.seen2 = false;
      } else if (typeselect === "provider") {
        this.provider_select = [];
        this.seen3 = true;
        this.seen4 = false;
      }
    }
  }
};
</script>
<style lang="scss">

.select-item {
  align-items: baseline;
}


</style>
