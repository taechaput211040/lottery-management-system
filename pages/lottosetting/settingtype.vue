<template>
  <div>
    <h1 class="mt-2">ประเภทการแทง</h1>
    <div class="ma-2 white rounded-lg classtable">
      <v-data-table
        :loading="isLoading"
        :headers="headers"
        :items="itemrender"
        hide-default-footer
      >
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
            class="mx-1"
            dark
            rounded
            small
            color="warning"
            @click="openDlupdate(item)"
            ><v-icon dark>
              mdi-pencil
            </v-icon>
            ตั้งค่า
          </v-btn>
        </template></v-data-table
      >
      <v-dialog v-model="updateDialog" max-width="290">
        <v-card class="pa-3">
          <v-card-title>ตั้งค่าการใช้งาน</v-card-title>
          <div v-if="updateform.username == $store.state.auth.username">
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
          <div v-else>
            <v-switch
              label="น้ำไหล"
              v-model="updateform.upline_flex_odd"
              hide-details="auto"
            ></v-switch>
            <v-switch
              label="เพลา"
              v-model="updateform.upline_seller"
              hide-details="auto"
            ></v-switch>
          </div>
          <v-card-actions>
            <v-btn color="success" @click="submitsetting(updateform.username)"
              >ยืนยัน</v-btn
            ><v-btn color="error" @click="updateDialog = false">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    openDlupdate(item) {
      this.updateform = item;
      this.updateDialog = true;
    },
    async submitsetting() {
      try {
        let body = {};
        if (this.updateform.username == this.$store.state.auth.username) {
          body = {
            username: this.updateform.username,
            flex_odd: this.updateform.self_flex,
            seller: this.updateform.self_seller
          };
        } else {
          body = {
            username: this.updateform.username,
            flex_odd: this.updateform.upline_flex_odd,
            seller: this.updateform.upline_seller
          };
        }

        await this.changeStausType(body);
        this.updateDialog = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.updateDialog = false;
        this.$fetch();
      }
    }
  }
};
</script>

<style></style>
