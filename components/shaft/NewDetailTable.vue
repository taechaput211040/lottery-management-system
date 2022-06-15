<template>
  <div>
    <div class="my-3 ">
      <v-row class="pa-1">
        <v-col cols="12" >
          <div class="rounded-lg white" style="height: 100%">
            <div class="primary--text font-weight-bold pa-2">
              เลือกประเภทหวย
            </div>
            <v-divider></v-divider>
            <div class="pa-2">
              <v-radio-group
                hide-details="auto"
                class="my-3"
                v-model="selectType"
                row
                @change="selectCatebytype"
              >
                <v-radio
                  v-for="(item, i) in this.listtype"
                  :key="i"
                  :label="item.title"
                  :value="item.id"
                ></v-radio>
              </v-radio-group>
              <v-select
                :items="itemcategory"
                item-text="typecategory_title"
                item-value="typecategory_id"
                class="col-12"
                :disabled="selectType == null"
                outlined
                v-model="selectCate"
                @change="selectSeller"
                return-object
                label="เลือกชนิดหวย"
                dense
                placeholder="กรุณาเลือกชนิดของหวย"
              ></v-select>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <div>
      <!-- normal lotto -->
      <div
        v-if="
          selectCate != null &&
          selectCate.typecategory_id !== '031d2311-ddc8-40ce-be39-342926748163'
        "
        class="rounded-lg white pa-3"
      >
        <div class="d-flex">
          <h4 class="my-2">หวยของตัวเอง</h4>
        </div>

        <v-data-table
          class="elevation-2"
          hide-default-footer
          :options.sync="option"
          :headers="headersdatelotto"
          :loading="isLoading"
          :items="dataOutcome"
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
          <template #[`item.no`]="{ index }">
            {{ index + 1 }}
          </template>
          <template #[`item.maximum_out_come_rate`]="{ item }">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>
          <template #[`item.minimum_bet_prize`]="{ item }">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.maximum_bet_prize`]="{ item }">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
          <template #[`item.self_receive_amount`]="{ item }">
            {{ numberWithCommas(item.self_receive_amount) }}
          </template>
          <template #[`item.self_receive_balance`]="{ item }">
            {{ numberWithCommas(item.self_receive_balance) }}
          </template>
          <template #[`item.discount_amount`]="{ item }">
            {{ item.discount_amount }} %
          </template>
          <template #[`item.unlimitedNumber`]="{ item }">
            <v-btn
              rounded
              color="primary"
              dark
              small
              @click="unlimitDetail(item)"
              ><v-icon left>mdi-pencil</v-icon>จัดการเลขอั้น
            </v-btn>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              rounded
              class="btn_setting"
              color="black"
              dark
              small
              @click="openupdateComerate(item)"
              ><v-icon left>mdi-cog</v-icon> ตั้งค่า
            </v-btn>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
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
              :length="Math.ceil(dataOutcome.length / option.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>

      <!-- yeekee lotto -->
      <div
        v-if="
          selectCate != null &&
          selectCate.typecategory_id == '031d2311-ddc8-40ce-be39-342926748163'
        "
        class="rounded-lg white pa-3"
      >
        <div class="d-flex">
          <h4 class="my-2">หวยของตัวเอง</h4>
        </div>

        <v-data-table
          class="elevation-2"
          hide-default-footer
          :options.sync="option"
          :headers="headersyeekeelotto"
          :loading="isLoading"
          :items="dataOutcome"
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
          <template #[`item.no`]="{ index }">
            {{ index + 1 }}
          </template>
          <template #[`item.maximum_out_come_rate`]="{ item }">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>
          <template #[`item.minimum_bet_prize`]="{ item }">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.maximum_bet_prize`]="{ item }">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
          <template #[`item.self_receive_amount`]="{ item }">
            {{ numberWithCommas(item.self_receive_amount) }}
          </template>
          <template #[`item.self_receive_balance`]="{ item }">
            {{ numberWithCommas(item.self_receive_balance) }}
          </template>
          <template #[`item.discount_amount`]="{ item }">
            {{ item.discount_amount }} %
          </template>
          <template #[`item.unlimitedNumber`]="{ item }">
            <v-btn
              rounded
              color="primary"
              dark
              small
              @click="unlimitDetail(item)"
              ><v-icon left>mdi-pencil</v-icon>จัดการเลขอั้น
            </v-btn>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              rounded
              class="btn_setting"
              color="black"
              dark
              small
              @click="openupdateComerateYeekee(item)"
              ><v-icon left>mdi-cog</v-icon> ตั้งค่า
            </v-btn>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
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
              :length="Math.ceil(dataOutcome.length / option.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>

      <div v-if="selectCate != null" class="rounded-lg white pa-3 mt-3">
        <h4 class="my-2">อัตราจ่ายที่ได้รับมา</h4>
        <v-data-table
          class="elevation-2"
          :headers="headersUpline"
          :loading="isLoading"
          :items="dataUpline"
          hide-default-footer
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
          <template #[`item.maximum_out_come_rate`]="{ item }">
            {{ numberWithCommas(item.maximum_out_come_rate) }}
          </template>

          <template #[`item.minimum_bet_prize`]="{ item }">
            {{ numberWithCommas(item.minimum_bet_prize) }}
          </template>
          <template #[`item.minimum_out_come_rate`]="{ item }">
            {{ numberWithCommas(item.minimum_out_come_rate) }}
          </template>

          <template #[`item.maximum_bet_prize`]="{ item }">
            {{ numberWithCommas(item.maximum_bet_prize) }}
          </template>
          <template #[`item.no`]="{ index }">
            {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
          </template>
          <template #[`item.unlimitedNumber`]="{ item }">
            <v-btn
              rounded
              color="primary"
              dark
              small
              @click="unlimitDetail(item)"
              ><v-icon left>mdi-pencil</v-icon>จัดการเลขอั้น
            </v-btn>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="optionupline.itemsPerPage"
              :items="pageSizesupline"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="optionupline.page"
              :total-visible="7"
              :length="Math.ceil(dataUpline.length / optionupline.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- normal setting -->
    <v-dialog max-width="600px" v-model="dlupdate" persistent>
      <v-form ref="edtform">
        <v-card class="pa-3">
          <v-card-title primary-title class="justify-center font-weight-bold">
            ตั้งค่าหวยเพลา
          </v-card-title>
          <div class="rounded-lg pa-2 elevation-3">
            <!-- ชื่อ -->
            <v-text-field
              filled
              label="ชื่อหวย"
              hide-details="auto"
              class="my-2"
              outlined
              dense
              disabled
              v-model="formupdate.lottonumbertype_name"
            ></v-text-field>
            <!-- อัตราจ่ายสูงสุด -->
            <v-text-field
              outlined
              label="อัตราจ่ายสูงสุด"
              dense
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราการจ่ายสูงสุด"
              @keypress="(e) => checkpositive(e)"
              :rules="[
                (v) => !!v || 'กรุณากรอกอัตราจ่ายสูงสุด',
                (v) =>
                  (v && v >= formupdate.maximum_out_come_rate) ||
                  'กรุณากรอกอัตราจ่ายสูงสุดให้มากกว่าอัตราจ่ายต่ำสุด',
              ]"
              hide-details="auto"
              v-model.number="formupdate.maximum_out_come_rate"
            ></v-text-field>
            <!-- อัตราจ่ายต่ำสุด -->
            <v-text-field
              outlined
              label="แทงต่ำสุด"
              dense
              :rules="[
                (v) => !!v || 'กรุณากรอกอัตราแทงต่ำสุด',
                (v) =>
                  (v && v <= formupdate.maximum_out_come_rate) ||
                  'กรุณากรอกอัตราแทงต่ำสุดน้อยกว่าอัตราแทงสูงสุด',
              ]"
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราแทงต่ำสุด"
              @keypress="(e) => checkpositive(e)"
              hide-details="auto"
              v-model.number="formupdate.minimum_bet_prize"
            ></v-text-field>

            <!-- <v-text-field
              outlined
              label="แทงต่ำสุด"
              type="number"
              @keypress="e => checkpositive(e)"
              placeholder="กรุณากรอกยอดแทงต่ำสุด"
              :rules="[
                v => !!v || 'กรุณากรอกยอดแทงต่ำสุด',
                v =>
                  (v && v <= formupdate.maximum_bet_prize) ||
                  'กรุณากรอกยอดแทงต่ำสุดให้น้อยกว่ายอดแทงสูงสุด'
              ]"
              dense
              class="my-2"
              hide-details="auto"
              v-model.number="formupdate.minimum_bet_prize"
            ></v-text-field> -->
            <!-- แทงสูงสุด -->
            <v-text-field
              outlined
              @keypress="(e) => checkpositive(e)"
              placeholder="กรุณากรอกยอดแทงสูงสุด"
              label="แทงสูงสุด"
              class="my-2"
              type="number"
              :rules="[
                (v) => !!v || 'กรุณากรอกยอดแทงต่ำสุด',
                (v) =>
                  (v && v >= formupdate.minimum_bet_prize) ||
                  'กรุณากรอกยอดเเทงสูงสุดให้มากกว่ายอดแทงต่ำสุด',
              ]"
              dense
              hide-details="auto"
              v-model.number="formupdate.maximum_bet_prize"
            ></v-text-field>
            <!-- รัยบของ -->
            <v-text-field
              hide-details="auto"
              v-model.number="formupdate.self_receive_amount"
              @keypress="(e) => checkpositive(e)"
              label="รับของ"
              dense
              class="my-2"
              outlined
              required
            ></v-text-field>
            <!-- ส่วนลด -->
            <v-text-field
              hide-details="auto"
              v-model.number="formupdate.discount_amount"
              label="ยอดส่วนลด (%)"
              @keypress="(e) => checkpositive(e)"
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
              @click="submitEdit(formupdate)"
              >บันทึก</v-btn
            >
            <v-btn color="error" @click="closeEdit()">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card></v-form
      >
    </v-dialog>

    <!-- yeekee setting -->
    <v-dialog max-width="600px" v-model="dlupdateYeekee" persistent>
      <v-form ref="edtformYeekee">
        <v-card class="pa-3">
          <v-card-title primary-title class="justify-center font-weight-bold">
            ตั้งค่าหวยเพลา
          </v-card-title>
          <div class="rounded-lg pa-2 elevation-3">
            <!-- ชื่อ -->
            <v-text-field
              filled
              label="ชื่อหวย"
              hide-details="auto"
              class="my-2"
              outlined
              dense
              disabled
              v-model="formupdateYeekee.lottonumbertype_name"
            ></v-text-field>
            <!-- อัตราจ่ายสูงสุด -->
            <v-text-field
              outlined
              label="อัตราจ่ายสูงสุด"
              dense
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราการจ่ายสูงสุด"
              @keypress="(e) => checkpositive(e)"
              :rules="[
                (v) => !!v || 'กรุณากรอกอัตราจ่ายสูงสุด',
                (v) =>
                  (v && v >= formupdateYeekee.maximum_out_come_rate) ||
                  'กรุณากรอกอัตราจ่ายสูงสุดให้มากกว่าอัตราจ่ายต่ำสุด',
              ]"
              hide-details="auto"
              v-model.number="formupdateYeekee.maximum_out_come_rate"
            ></v-text-field>
            <!-- อัตราแทงต่ำสุด -->
            <v-text-field
              outlined
              label="แทงต่ำสุด"
              dense
              :rules="[
                (v) => !!v || 'กรุณากรอกอัตราแทงต่ำสุด',
                (v) =>
                  (v && v <= formupdateYeekee.maximum_out_come_rate) ||
                  'กรุณากรอกอัตราแทงต่ำสุดน้อยกว่าอัตราแทงสูงสุด',
              ]"
              type="number"
              class="my-2"
              placeholder="กรุณากรอกอัตราแทงต่ำสุด"
              @keypress="(e) => checkpositive(e)"
              hide-details="auto"
              v-model.number="formupdateYeekee.minimum_bet_prize"
            ></v-text-field>
            <v-text-field
              outlined
              @keypress="(e) => checkpositive(e)"
              placeholder="กรุณากรอกยอดแทงสูงสุด"
              label="แทงสูงสุด"
              class="my-2"
              type="number"
              :rules="[
                (v) => !!v || 'กรุณากรอกยอดแทงต่ำสุด',
                (v) =>
                  (v && v >= formupdateYeekee.minimum_bet_prize) ||
                  'กรุณากรอกยอดเเทงสูงสุดให้มากกว่ายอดแทงต่ำสุด',
              ]"
              dense
              hide-details="auto"
              v-model.number="formupdateYeekee.maximum_bet_prize"
            ></v-text-field>
            <!-- ส่วนลด -->
            <v-text-field
              hide-details="auto"
              v-model.number="formupdateYeekee.discount_amount"
              label="ยอดส่วนลด (%)"
              @keypress="(e) => checkpositive(e)"
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
              @click="submitEditYeekee(formupdateYeekee)"
              >บันทึก</v-btn
            >
            <v-btn color="error" @click="closeEdit()">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card></v-form
      >
    </v-dialog>
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
      valid: false,
      option: {},
      pageSizes: [5, 10, 15, 25],
      optionupline: {},
      pageSizesupline: [5, 10, 15, 25],
      formset: {
        profit: 0,
        flexodd: 0,
      },
      max_profit_lost: 0,
      current_cat_id: "",
      current_cat_title: "",
      adddl: false,
      dlupdate: false,
      formupdate: {},
      dlupdateYeekee: false,
      formupdateYeekee: {},
      selectCate: "cfe77d55-e0f4-4a28-8dca-897005d2f77b",
      selectType: "02770ee9-3448-4258-8d40-a7a13c7d1257",
      listtype: [],
      isLoading: true,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "รับของทั้งหมด",
          value: "self_receive_amount",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "รับของปัจจุบัน",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แก้ไขเลขอั้น",
          value: "unlimitedNumber",
          class: "font-weight-bold",
          align: "center",
        },

        {
          text: "ดำเนินการ",
          value: "action",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "เเก้ไขล่าสุด",
          value: "updated_by",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
        },
      ],
      headersyeekeelotto: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ดำเนินการ",
          value: "action",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "เเก้ไขล่าสุด",
          value: "updated_by",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
        },
      ],
      headersUpline: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ชนิดหวย",
          value: "lottonumbertype_name",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "อัตราจ่าย",
          value: "maximum_out_come_rate",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "ส่วนลด",
          value: "discount_amount",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงต่ำสุด",
          value: "minimum_bet_prize",
          class: "font-weight-bold",
          align: "center",
        },
        {
          text: "แทงสูงสุด",
          value: "maximum_bet_prize",
          class: "font-weight-bold",
          align: "center",
        },
      ],
      itemcategory: [],
      filter: {
        startDate: "",
        endDate: "",
      },
      dataOutcome: [],
      dataUpline: [],
      percentFlexOdd: {},
    };
  },
  async fetch() {
    try {
      this.listtype = this.$store.state.lottosetting.lottotype;

      this.getPerMaxloss();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("shaft", [
      "getSellerAll",
      "getAllsettingUpline",
      "getAllsettingseller",
      "updateSettingseller",
    ]),
    ...mapActions("flexodd", [
      "getTypelottoAll",
      "getCategoryflexbyid",
      "getOutcomerate",
      "updateFlexOutcomerate",
      "setflexoddProfit",
      "getPerflex",
      "getMaxLoss",
      "configMaxLoss",
    ]),
    unlimitDetail(item) {
      // console.log(item);
      // console.log(this.itemcategory)
      this.$router.push(
        `${this.$route.fullPath}?id=${this.current_cat_id}&title=${this.current_cat_title}&lottonumbertype_id=${item.lottonumbertype_id}&typename=${item.lottonumbertype_name}&number=${item.lottonumbertype_number}`
      );
    },
    async getPerMaxloss() {
      this.isLoading = true;
      try {
        let { data: perMaxlsoe } = await this.getMaxLoss();
        this.max_profit_lost = perMaxlsoe.max_profit_lost;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    getDetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    },
    async setprofit() {
      if (this.$refs.formProfit.validate()) {
        try {
          this.$swal({
            title: "ตั้งค่ากำไรขั้นต่ำและอัตราน้ำไหลขั้นต่ำ?",
            icon: "primary",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตั้งค่า",
            cancelButtonText: "ยกเลิก",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await this.setflexoddProfit(this.formset);
              this.$swal({
                icon: "success",
                title: "ตั้งค่าเรียบร้อย",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async setprofitLoss() {
      let body = this.max_profit_lost;
      if (this.$refs.formMax_profit_lost.validate()) {
        try {
          this.$swal({
            title: "ตั้งค่ายอดขาดทุนสูงสุด?",
            icon: "primary",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตั้งค่า",
            cancelButtonText: "ยกเลิก",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await this.configMaxLoss(body);
                this.$swal({
                  icon: "success",
                  title: "ตั้งค่าเรียบร้อย",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } catch (error) {
                this.$swal({
                  icon: "error",
                  title: `${error.response.data.message}`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              this.getPerMaxloss();
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async selectCatebytype() {
      this.selectCate = "";
      this.isLoading = true;
      try {
        console.log("debug");
        const { data } = await this.getSellerAll(this.selectType);
        console.log(data);
        this.itemcategory = data.result;

        // this.selectCate = "cfe77d55-e0f4-4a28-8dca-897005d2f77b";
        console.log(this.selectCate)
        // selectSeller({
        //   typecategory_id: "",
        //   typecategory_title: "",
        // });
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    closeEdit() {
      this.dlupdate = false;
      this.dlupdateYeekee = false;
    },

    async selectSeller(value, loading = false) {
      // console.log(value.typecategory_id)
      // console.log(value.typecategory_title)

      // console.log(this.selectCate)
      this.current_cat_id = value.typecategory_id;
      this.current_cat_title = value.typecategory_title;
      await this.getUplinebyid(value.typecategory_id, loading);
      await this.getSellerSetting(value.typecategory_id, loading);
    },
    async getSellerSetting(id, loading) {
      this.isLoading = true;
      try {
        const { data } = await this.getAllsettingseller(id);
        this.dataOutcome = data.result;
        console.log(this.dataOutcome);
        this.isLoading = loading;
      } catch (error) {
        console.log(error);
        this.isLoading = loading;
      }
    },
    async getUplinebyid(id, loading) {
      try {
        this.isLoading = true;
        // console.log(id);
        const { data } = await this.getAllsettingUpline(id);
        // console.log(data)
        this.dataUpline = data.result;
        console.log(this.dataUpline);
        this.isLoading = loading
      } catch (error) {
        console.log(error);
        this.isloading = loading;
      }
    },
    openupdateComerate(item) {
      this.dlupdate = true;
      this.formupdate = Object.assign({}, item);
      // this.formupdate = item;
    },
    openupdateComerateYeekee(item) {
      this.dlupdateYeekee = true;
      this.formupdateYeekee = Object.assign({}, item);
      // this.formupdate = item;
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
    async submitEdit(item) {
      this.loading_btn = true;
      item = JSON.parse(JSON.stringify(item));
      if (this.$refs.edtform.validate()) {
        try {
          let body = {
            typecategory_id: this.current_cat_id,
            lotto_numbertype: [
              {
                lottonumbertype_id: item.lottonumbertype_id,
                maximum_out_come_rate: item.maximum_out_come_rate,
                minimum_bet_prize: item.minimum_bet_prize,
                maximum_bet_prize: item.maximum_bet_prize,
                self_receive_amount: item.self_receive_amount,
                discount_amount: item.discount_amount,
              },
            ],
          };
          console.log(body);
          await this.updateSettingseller(body);
          await this.selectSeller({
            typecategory_id: this.current_cat_id,
            typecategory_title: this.current_cat_title,
          });
          this.loading_btn = false;
          this.dlupdate = false;
        } catch (error) {
          console.log(error.response.data.message);
          this.$swal({
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.loading_btn = false;
          this.dlupdate = false;
        }
      } else {
        this.$swal({
          icon: "error",
          title: `กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.loading_btn = false;
      }
    },
    async submitEditYeekee(item) {
      this.loading_btn = true;
      console.log("this is yeekee submit")
      item = JSON.parse(JSON.stringify(item));
      if (this.$refs.edtformYeekee.validate()) {
        try {
          let body = {
            typecategory_id: this.selectCate.typecategory_id,
            lotto_numbertype: [
              {
                lottonumbertype_id: item.lottonumbertype_id,
                maximum_out_come_rate: item.maximum_out_come_rate,
                minimum_bet_prize: item.minimum_bet_prize,
                maximum_bet_prize: item.maximum_bet_prize,
                discount_amount: item.discount_amount,
              },
            ],
          };
          console.log(body);
          await this.updateSettingseller(body);
          await this.selectSeller(this.selectCate);
          this.loading_btn = false;
          this.dlupdateYeekee = false;
        } catch (error) {
          console.log(error.response.data.message);
          this.$swal({
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.loading_btn = false;
          this.dlupdate = false;
        }
      } else {
        this.$swal({
          icon: "error",
          title: `กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.loading_btn = false;
      }
    },
    numberWithCommas(x) {
      var parts = parseFloat(x).toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  async created() {
    this.isloading = true;
    this.selectCatebytype("cfe77d55-e0f4-4a28-8dca-897005d2f77b");
    this.selectCate = "cfe77d55-e0f4-4a28-8dca-897005d2f77b";
    await this.selectSeller({
      typecategory_id: "cfe77d55-e0f4-4a28-8dca-897005d2f77b",
      typecategory_title: "หวยรัฐบาล",
    }, true);
    this.isLoading = false;
  },
};
</script>
