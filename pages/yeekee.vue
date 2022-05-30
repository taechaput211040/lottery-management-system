<template>
  <div>
    <div>
      <h2 class="text-center">หวยยี่กี่</h2>
      <div v-if="this.existingSetting">
        <div class="pa-3 mt-3 rounded-lg white">
          <h3 class="success--text font-weight-bold pa-2">ตั้งค่า</h3>
          <div> ออกผลแบบพิเศษ (สร้างเลขเอง)</div>
          <v-radio-group
            v-model="face"
            row
          >
            <v-radio
              label="เปิด"
              :value=true
            ></v-radio>
            <v-radio
              label="ปิด"
              :value=false
            ></v-radio>
          </v-radio-group>
          <div> face : {{this.face}}</div>
          <!-- <div> minimum profit : {{this.minimum_profit}}</div> -->
          <!-- {{this.minimum_profit}} -->
          <div>ยอดกำไรต่ำสุด (%)</div>
          <div class="row">
            <div class="col-9 col-sm-4">
              <v-text-field
                placeholder="ยอดกำไรขาดทุน"
                outlined
                dense
                v-model="minimum_profit"
                @change="preventOverflow()"
                type="number"
                hide-details="auto"
              ></v-text-field>
            </div>
            <div class="col-3 col-sm-2">
              <v-btn color="success" @click="confirmEdit()">
                บันทึก
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- <div>There is no existing settting</div> -->
        <div class="col12 text-center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                dark
                v-on="on"
              >
                create new setting
              </v-btn>
            </template>
            <v-card>
              <div class="pa-3 mt-3 rounded-lg white">
                <h3 class="success--text font-weight-bold pa-2">ตั้งค่า</h3>
                <div> ออกผลแบบพิเศษ (สร้างเลขเอง)</div>
                <v-radio-group
                  v-model="face"
                  row
                >
                  <v-radio
                    label="เปิด"
                    :value=true
                  ></v-radio>
                  <v-radio
                    label="ปิด"
                    :value=false
                  ></v-radio>
                </v-radio-group>
                <div>ยอดกำไรต่ำสุด (%)</div>
                <div class="row">
                  <div class="col-12 ">
                    <v-text-field
                      placeholder="ยอดกำไรขาดทุน"
                      outlined
                      dense
                      v-model="minimum_profit"
                      @change="preventOverflow()"
                      type="number"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="createNewSetting()"
                >
                  create
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, } from "vuex";
import axios from "../plugins/axios";
export default {
  data() {
    return {
      dialog : false,
      isLoading: false,
      existingSetting: false,
      settingYeekee: {},
      dataYeekee: [],
      minimum_profit: 0,
      face: false,
      header: [
        {
          text: "ชนิดตัวเลข",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods:{
    ...mapActions("yeekee",["getYeekeesetting","updateYeekeeSetting"]),
    async getYeekeeData(){
      try{
        this.existingSetting = true;
        let {data} = await this.getYeekeesetting();

        this.settingYeekee = data
        this.minimum_profit = data.minimum_profit
        this.face = data.face
        console.log(this.settingYeekee)
      } catch(error) {
        console.log(error)
        this.existingSetting = false;
      }
    },
    async confirmEdit(){
      try {
        this.isLoading = true;

        let body = {
          minimum_profit: parseInt(this.minimum_profit),
          face: this.face
        }
        console.log(body)
        let res = await this.updateYeekeeSetting(body);
        console.log(res);

        this.isLoading = false;

      } catch (error) {
        console.log(error)
      }
    },

    preventOverflow() {
      if (parseInt(this.minimum_profit) > 100) {
        this.minimum_profit = 100;
      }
      if (parseInt(this.minimum_profit) < 0) {
        this.minimum_profit = 0;
      }
    },

    createNewSetting(){
      this.dialog = false
    }
  },
  mounted(){
    this.getYeekeeData()
  }
};
</script>

<style></style>
