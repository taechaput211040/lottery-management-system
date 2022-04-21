<template>
  <div>
    <h2>ประเภทการแทง</h2>
    <div class="mt-2 white rounded-lg classtable">
      <v-data-table
        hide-default-footer
        :options.sync="option"
        :loading="isLoading"
        :headers="headers"
        :items="itemrender"
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
        <template #[`item.self_flex`]="{item}">
          <v-badge left color="primary" v-if="item.self_flex == true">
            <span slot="badge">เปิด</span>
          </v-badge>
          <v-badge left color="error" v-if="item.self_flex == false">
            <span slot="badge">ปิด</span>
          </v-badge>
          <v-badge left color="error" v-if="item.self_flex == null">
            <span slot="badge"> - </span>
          </v-badge>
        </template>
        <template #[`item.self_seller`]="{item}">
          <v-badge left color="primary" v-if="item.self_seller == true">
            <span slot="badge">เปิด</span>
          </v-badge>
          <v-badge left color="error" v-if="item.self_seller == false">
            <span slot="badge">ปิด</span>
          </v-badge>
          <v-badge left color="error" v-if="item.self_seller == null">
            <span slot="badge"> - </span>
          </v-badge>
        </template>
        <template #[`item.upline_flex_odd`]="{item}">
          <v-badge left color="primary" v-if="item.upline_flex_odd == true">
            <span slot="badge">เปิด</span>
          </v-badge>
          <v-badge left color="error" v-if="item.upline_flex_odd == false">
            <span slot="badge">ปิด</span>
          </v-badge>
          <v-badge left color="grey" v-if="item.upline_flex_odd == null">
            <span slot="badge"> - </span>
          </v-badge>
        </template>
        <template #[`item.upline_seller`]="{item}">
          <v-badge left color="primary" v-if="item.upline_seller == true">
            <span slot="badge">เปิด</span>
          </v-badge>
          <v-badge left color="error" v-if="item.upline_seller == false">
            <span slot="badge">ปิด</span>
          </v-badge>
          <v-badge left color="grey" v-if="item.upline_seller == null">
            <span slot="badge"> - </span>
          </v-badge>
        </template>
        <template #[`item.action`]="{item}">
          <v-btn
            dark
            rounded
            small
            class="btn_setting"
            color="warning"
            @click="openDlupdate(item)"
            ><v-icon dark left>
              mdi-cog
            </v-icon>
            ตั้งค่า
          </v-btn>
        </template></v-data-table
      >
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
            :length="Math.ceil(itemrender.length / option.itemsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-dialog v-model="updateDialog" max-width="300">
        <v-card class="pa-4">
          <v-card-title class="justify-center">ตั้งค่าการใช้งาน</v-card-title>
          <div class="text-center my-2">
            <v-icon fab>mdi-account-box</v-icon> :
            <v-chip small label>{{ updateform.username }}</v-chip>
          </div>
          <div class="elevation-3 pa-2 rounded-lg">
            <v-switch
              label="น้ำไหล"
              v-model="updateform.self_flex"
              hide-details="auto"
            ></v-switch>
            <v-switch
              label="เพลา"
              v-model="updateform.self_seller"
              hide-details="auto"
            ></v-switch>
          </div>

          <v-card-actions class="justify-center">
            <v-btn
              color="success"
              :loading="loading_btn"
              small
              @click="submitsetting()"
              >ยืนยัน</v-btn
            ><v-btn color="error" small @click="updateDialog = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      loading_btn: false,
      option: {},
      pageSizes: [5, 10, 15, 25],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      option: {},
      updateDialog: false,
      updateform: {},
      isLoading: true,
      itemrender: [],
      headers: [
        {
          text: "Username",
          value: "username",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        { text: "น้ำไหล", value: "self_flex", align: "center" },
        { text: "เพลา", value: "self_seller", align: "center" },
        { text: "Upline น้ำไหล", value: "upline_flex_odd", align: "center" },
        { text: "Upline เพลา", value: "upline_seller", align: "center" },
        { text: "ดำเนินการ", value: "action", align: "center" }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["username"])
  },
  async fetch() {
    this.getData();
  },
  methods: {
    ...mapActions("seller", ["gettypeByalluser", "changeStausType"]),
    async getData() {
      this.isLoading = true;
      try {
        let { data: listData } = await this.gettypeByalluser();
        this.itemrender = listData;
        this.pagination.rowsNumber = this.itemrender.length;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    openDlupdate(item) {
      this.updateform = Object.assign({}, item);
      console.log(this.updateform);
      this.updateDialog = true;
    },
    async submitsetting() {
      this.loading_btn = true;
      try {
        let body = {};
        body = {
          username: this.updateform.username,
          flex_odd: this.updateform.self_flex,
          seller: this.updateform.self_seller
        };

        await this.changeStausType(body);
        this.loading_btn = false;
        this.updateDialog = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.loading_btn = false;
        this.updateDialog = false;
        this.$fetch();
      }
    }
  }
};
</script>

<style></style>
