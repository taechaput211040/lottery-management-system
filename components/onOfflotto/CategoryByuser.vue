<template>
  <div>
    <v-btn color="red" @click="$router.go(-1)" dark small class="ma-3"
      >Back</v-btn
    >
    <div class="rounded-lg white">
      <v-data-table :headers="headerDetail" :items="dataDetail">
        <template #[`item.no`]="{index}">
          <!-- {{item.upline_status}} -->
          {{ index + 1 }}
        </template>
        <template #[`item.actions`]="{item}">
          <v-btn color="warning" rounded small @click="openEdit(item)"
            ><v-icon small>mdi-pencil</v-icon> จัดการสถานะ</v-btn
          >
        </template>
        <template #[`item.self_status`]="{item}">
          <!-- {{item.upline_status}} -->
          <v-chip color="success" small v-if="item.self_status == true"
            ><v-icon left>mdi-circle</v-icon> เปิดใช้งาน</v-chip
          >
          <v-chip color="error" small v-else-if="item.self_status == false"
            ><v-icon left>mdi-circle</v-icon> ปิดใช้งาน</v-chip
          >
          <v-chip color="grey" small v-else
            ><v-icon left>mdi-circle</v-icon> ไม่เปิดใช้งาน</v-chip
          >
        </template>
      </v-data-table>
      <v-dialog v-model="dialogEdit" max-width="290">
        <v-card class="pa-3">
          <v-card-title primary-title>
            <h3>จัดการสถานะ</h3>
          </v-card-title>
          <div class="pa-4 ">
            สถานะการใช้งาน
            <v-switch v-model="edititem.status"></v-switch>
          </div>
          <v-card-actions class="justify-center">
            <v-btn color="success" small @click="confirmToEdit()">ยืนยัน</v-btn>
            <v-btn color="red" dark small @click="dialogEdit = false"
              >ยกเลิก</v-btn
            >
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
      dialogEdit: false,
      edititem: {
        username: "",
        typecategory_id: "",
        status: false
      },
      dataDetail: [],
      headerDetail: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "80px"
        },
        {
          text: "ชื่อ",
          value: "title",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "สถานะ",
          value: "self_status",
          class: "font-weight-bold",
          align: "center",
          width: "180px"
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          class: "font-weight-bold",
          align: "center",
          width: "200px"
        }
      ]
    };
  },
  async fetch() {
    this.renderDetail();
  },
  methods: {
    ...mapActions("seller", ["getTypeByUser", "changeStausDownline"]),
    async renderDetail() {
      let { data } = await this.getTypeByUser(this.$route.query.username);
      this.dataDetail = data.result;
    },
    openEdit(item) {
      if (item.self_status == true && item.upline_status == true) {
        this.edititem.status = true;
      } else {
        this.edititem.status = false;
      }
      this.edititem.username = this.$route.query.username;
      this.edititem.typecategory_id = item.id;
      this.dialogEdit = true;
    },
    async confirmToEdit() {
      try {
        console.log(this.edititem);
        await this.changeStausDownline(this.edititem);
        this.dialogEdit = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.$fetch();
      }
    }
  }
};
</script>
