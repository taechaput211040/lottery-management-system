<template>
  <div class="my-3 rounded-lg white">
    <h3 class="pa-3">วันที่ที่ต้องการค้นหา</h3>
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
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="filter.startDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    v-model="filter.startDate"
                    label="จากวันที่ :"
                    prepend-icon="mdi-calendar"
                    readonly
                    hide-details="auto"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="filter.startDate"
                  :max="filter.endDate"
                  no-title
                  scrollable
                  locale="th"
                  @input="$refs.menu.save(filter.startDate)"
                >
                </v-date-picker>
              </v-menu>
              <!-- <el-date-picker
                class="full-width"
                v-model.trim="filter.startDate"
                arrow-control
                placeholder="เลือกวันที่ต้องการค้นหา"
              >
              </el-date-picker> -->
            </div>
            <div class="col-12 col-sm-6 col-lg-auto col-xl-auto">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="filter.endDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="filter.endDate"
                    label="ถึงวันที่"
                    dense
                    outlined
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details="auto"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="filter.endDate"
                  no-title
                  scrollable
                  :min="filter.startDate"
                  locale="th"
                  @input="$refs.menu2.save(filter.endDate)"
                >
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </v-col>
        <v-col cols="12 pt-1">
          <v-btn
            color="primary"
            @click="searchbyfillter"
            class="btn_search"
            rounded
            ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      menu2: false,
      itemdate: [
        { text: "เดือนนี้", value: "thismounth" },
        { text: "สัปดาห์นี้", value: "week" },
        { text: "วันที่", value: "findate" }
      ],
      selecttype: "thismounth",
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
      return this.$moment(date).format("YYYY-MM-DD");
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

          var curr = new Date; // get current date
          var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
          var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6 + 1));

          this.filter = {
            startDate: this.getDateTime(
              new Date(firstday).setHours(0, 0, 0, 0)
            ),
            endDate: this.getDateTime(
              new Date(lastday).setHours(23, 59, 59, 999)
            )
          };
          break;
        case "thismounth":
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
        default:
          break;
      }
      this.$emit("search", this.filter);
    }
  }
};
</script>

<style></style>
