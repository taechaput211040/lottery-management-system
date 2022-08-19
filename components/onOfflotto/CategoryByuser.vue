<template>
  <div>
    <v-btn
      rounded
      color="red back_btn"
      class="ma-3"
      @click="$router.go(-1)"
      small
      dark
      ><v-icon left>mdi-arrow-left-drop-circle</v-icon> ย้อนกลับ</v-btn
    >
    <loading-page v-if="isLoading"></loading-page>
    <div class="rounded-lg white">
      <v-data-table
        hide-default-footer
        :options.sync="option"
        :headers="headerDetail"
        :loading="isLoading"
        :items="dataDetail"
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
          <!-- {{item.upline_status}} -->
          {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
        </template>
        <template #[`item.actions`]="{item}">
          <v-btn
            dark
            color="warning"
            class="btn_edit text--white"
            rounded
            small
            @click="openEdit(item)"
            ><v-icon small>mdi-pencil</v-icon> จัดการสถานะ</v-btn
          >
        </template>
        <template #[`item.upline_status`]="{item}">
          <!-- {{item.upline_status}} -->
          <v-chip color="success" small v-if="item.upline_status == true"
            ><v-icon left>mdi-circle</v-icon> เปิดใช้งาน</v-chip
          >
          <v-chip color="error" small v-else-if="item.upline_status == false"
            ><v-icon left>mdi-circle</v-icon> ปิดใช้งาน</v-chip
          >
          <v-chip color="grey" small v-else
            ><v-icon left>mdi-circle</v-icon> ไม่เปิดใช้งาน</v-chip
          >
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
            :total-visible="20"
           :length="Math.ceil(dataDetail.length / option.itemsPerPage)"

          ></v-pagination>
           <!-- :length="Math.ceil(dataDetail.length / option.itemsPerPage)" -->
        </v-col>
      </v-row>
      <v-dialog v-model="dialogEdit" max-width="300">
        <v-card class="pa-3">
          <v-card-title class="justify-center font-weight-bold">
            <h3>จัดการสถานะ</h3>
          </v-card-title>
          <div class="elevation-3 rounded-lg pa-3">
            <v-text-field
              label="ชื่อชนิดหวย"
              v-model="edititem.title"
              disabled
              dense
              hide-details="auto"
              filled
              outlined
            ></v-text-field>
            <div class="mt-3 d-column">
              สถานะการใช้งาน
              <v-switch
                v-model="edititem.status"
                hide-details="auto"
              ></v-switch>
            </div>
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
import LoadingPage from "../form/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      option: {},
      pageSizes: [5, 10, 15, 25],
      isLoading: false,
      dialogEdit: false,
      edititem: {
        username: "",
        typecategory_id: "",
        status: false
      },
      dataDetail: [],
      dataDetail_lenght:0,
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
          value: "upline_status",
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
      this.isLoading = true;
      try {
        let { data } = await this.getTypeByUser(this.$route.query.username);
        if(data){
           this.dataDetail = data.result.data;
           if(typeof(this.dataDetail)== 'object'){
            this.dataDetail_lenght = 0
           }else{
            this.dataDetail_lenght= this.dataDetail.length
           }
           
 
        }
       
        // if(typeof(this.dataDetail)== 'object') this.dataDetail = [this.dataDetail]
        

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    openEdit(item) {
      this.edititem.title = item.title;
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
