<template>
  <div class="">
    <div class="d-flex align-baseline">
      <v-btn
        rounded
        color="red back_btn"
        class="ma-3"
        @click="$router.go(-1)"
        small
        dark
        ><v-icon left>mdi-arrow-left-drop-circle</v-icon> ย้อนกลับ</v-btn
      >
      <h3 class="primary--text font-weight-bold my-4">
        หวยของตัวเอง :
        <span class="purple--text "> {{ this.$route.query.title }}</span>
      </h3>
    </div>
    <div v-if="isLoading"><loading-page></loading-page></div>
    <div>
      <div class="rounded-lg white">
        <v-data-table
          class="elevation-2"
          hide-default-footer
          :options.sync="option"
          :headers="headersdatelotto"
          :loading="isLoading"
          :items="datarender"
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
            {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
          </template>
          <template #[`item.maximum_out_come_rate`]="{item}">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>
          <template #[`item.self_receive_amount`]="{item}">
            {{ numberWithCommas(item.self_receive_amount) }}
          </template>
          <template #[`item.self_receive_balance`]="{item}">
            {{ numberWithCommas(item.self_receive_balance) }}
          </template>
          <template #[`item.minimum_bet_prize`]="{item}">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.maximum_bet_prize`]="{item}">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
          <template #[`item.discount_amount`]="{item}">
            {{ item.discount_amount }}%
          </template>
          <template #[`item.unlimitedNumber`]="{item}">
            <v-btn
              rounded
              color="primary"
              dark
              small
              @click="unlimitDetail(item)"
              ><v-icon left>mdi-pencil</v-icon>จัดการเลขอั้น
            </v-btn>
          </template>
          <template #[`item.action`]="{item}">
            <v-btn
              rounded
              color="black"
              dark
              class="btn_setting"
              small
              @click="openDialogupdate(item)"
              ><v-icon left>mdi-cog</v-icon> ตั้งค่า
            </v-btn>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="option.itemsPerPage"
              :items="pageSizes"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="option.page"
              :total-visible="7"
              :length="Math.ceil(datarender.length / option.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
      <h3 class="primary--text font-weight-bold my-4">หวย upline</h3>
      <div class="rounded-lg white ">
        <v-data-table
          class="elevation-2"
          hide-default-footer
          :headers="headersUpline"
          :items="uplinedItem"
          :loading="isLoading"
          :options.sync="optionupline"
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
            {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
          </template>
          <template #[`item.maximum_out_come_rate`]="{item}">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>
          <template #[`item.self_receive_amount`]="{item}">
            {{ numberWithCommas(item.self_receive_amount) }}
          </template>
          <template #[`item.minimum_bet_prize`]="{item}">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.discount_amount`]="{item}">
            {{ item.discount_amount }}%
          </template>
          <template #[`item.maximum_bet_prize`]="{item}">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="optionupline.itemsPerPage"
              :items="pageSizes"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="optionupline.page"
              :total-visible="7"
              :length="
                Math.ceil(uplinedItem.length / optionupline.itemsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
      <v-dialog max-width="600px" v-model="updateDiaglog">
        <v-card class="pa-3">
          <v-card-title class="justify-center font-weight-bold"
            >ตั้งค่าหวยเพลา</v-card-title
          >

          <div class="elevation-3 rounded-lg pa-3">
            <v-text-field
              hide-details="auto"
              v-model="form_edit.lottonumbertype_name"
              label="ชื่อหวย"
              outlined
              disabled
              filled
              dense
              class="my-2"
            ></v-text-field>
            <v-text-field
              hide-details="auto"
              v-model.number="form_edit.maximum_out_come_rate"
              label="อัตราจ่ายสูงสุด"
              outlined
              dense
              @keypress="e => checkpositive(e)"
              class="my-2"
            ></v-text-field>
            <v-text-field
              hide-details="auto"
              v-model.number="form_edit.minimum_bet_prize"
              label="อัตราแทงขั้นต่ำ"
              @keypress="e => checkpositive(e)"
              dense
              outlined
              class="my-2"
            ></v-text-field>
            <v-text-field
              hide-details="auto"
              v-model.number="form_edit.maximum_bet_prize"
              @keypress="e => checkpositive(e)"
              label="อัตราแทงสูงสุด"
              dense
              outlined
              class="my-2"
            ></v-text-field>
            <v-text-field
              hide-details="auto"
              v-model.number="form_edit.self_receive_amount"
              @keypress="e => checkpositive(e)"
              label="รับของ"
              dense
              class="my-2"
              outlined
            ></v-text-field>
            <v-text-field
              hide-details="auto"
              v-model.number="form_edit.discount_amount"
              label="ยอดส่วนลด"
              @keypress="e => checkpositive(e)"
              outlined
              class="my-2"
              dense
            ></v-text-field>
          </div>
          <v-card-actions class="justify-center">
            <v-btn
              class="btn_setting"
              color="success"
              :loading="loading_btn"
              @click="submitUpdate()"
              >บันทึก</v-btn
            >
            <v-btn class="error" @click="clostupdate()">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../form/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      loading_btn: false,
      optionupline: {},
      option: {},
      pageSizes: [5, 10, 15, 25],
      pageSizesupline: [5, 10, 15, 25],
      updateDiaglog: false,
      form_edit: {},
      uplinedItem: [],
      isLoading: false,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersUpline: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center"
        },

        {
          text: "รับของทั้งหมด",
          value: "self_receive_amount",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center"
        }
      ],
      headersdatelotto: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center",
          cellClass: "font-weight-bold"
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "รับของทั้งหมด",
          value: "self_receive_amount",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "รับของปัจจุบัน",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "แก้ไขเลขอั้น",
          value: "unlimitedNumber",
          class: "font-weight-bold",
          align: "center"
        },

        {
          text: "ดำเนินการ",
          value: "action",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "เเก้ไขล่าสุด",
          value: "updated_by",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center"
        }
      ],
      datarender: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      },
      payrateValue: ""
    };
  },
  async fetch() {
    this.getSelfeData();
    this.getUplinedata();
  },
  methods: {
    unlimitDetail(item) {
      console.log(item);
      this.$router.push(
        `${this.$route.fullPath}&lottonumbertype_id=${item.lottonumbertype_id}&typename=${item.lottonumbertype_name}&number=${item.lottonumbertype_number}`
      );
    },
    ...mapActions("shaft", [
      "getAllsettingseller",
      "getAllsettingUpline",
      "updateSettingseller"
    ]),
    async clostupdate() {
      this.updateDiaglog = false;
    },
    async getSelfeData() {
      this.isLoading = true;
      try {
        let { data } = await this.getAllsettingseller(this.$route.query.id);
        this.datarender = data.result;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
    async getUplinedata() {
      this.isLoading = true;
      try {
        let { data } = await this.getAllsettingUpline(this.$route.query.id);
        this.uplinedItem = data.result;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
    openDialogupdate(item) {
      this.payrateValue = item;
      this.updateDiaglog = true;
      this.form_edit = Object.assign({}, item);
    },
    checkpositive(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    numberWithCommas(x) {
      var parts = x
        .toFixed(2)
        .toString()
        .split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    async submitUpdate() {
      this.loading_btn = true;
      try {
        let body = {
          typecategory_id: this.$route.query.id,
          lotto_numbertype: [
            {
              lottonumbertype_id: this.form_edit.lottonumbertype_id,
              maximum_out_come_rate: parseFloat(
                this.form_edit.maximum_out_come_rate
              ),
              minimum_bet_prize: parseFloat(this.form_edit.minimum_bet_prize),
              maximum_bet_prize: parseFloat(this.form_edit.maximum_bet_prize),
              self_receive_amount: parseFloat(
                this.form_edit.self_receive_amount
              ),
              discount_amount: parseFloat(this.form_edit.discount_amount)
            }
          ]
        };
        await this.updateSettingseller(body);

        this.loading_btn = false;
        this.updateDiaglog = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.$swal({
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.$swal({
            icon: "error",
            title: `กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน`,
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.loading_btn = false;
        this.updateDiaglog = false;
        this.$fetch();
      }
    }
  }
};
</script>
