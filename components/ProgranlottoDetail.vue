<template>
  <div>
    <h1>รายละเอียดตัวเลข : {{ this.$route.query.title }}</h1>
    <div class="mx-auto mt-5 justify-center classtable white rounded-lg">
      <div class="d-flex justify-end align-baseline">
        <v-btn small class="mx-2" color="error" @click="$router.go(-1)"
          >back</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="ma-3"
          medium
          rounded
          @click="opencreatetype()"
          ><v-icon left small>mdi-plus</v-icon>สร้างตัวเลข</v-btn
        >
      </div>

      <v-data-table
        :headers="headers"
        :items="itemDetail"
        :options.sync="option"
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
        <template #[`item.created_at`]="{item}">
          {{ dateformat(item.created_at) }}
        </template>
        <template #[`item.updated_at`]="{item}">
          {{ dateformat(item.updated_at) }}
        </template>
        <template #[`item.status`]="{item}">
          <v-chip color="success" v-if="item.status == 1" dark small>
            <v-icon left small>mdi-circle-medium</v-icon>เปิดใช้งาน
          </v-chip>
          <v-chip v-else color="error" dark small>
            <v-icon left small>mdi-circle-medium</v-icon>ปิดใช้งาน
          </v-chip>
        </template>
        <template #[`item.actions`]="{item}">
          <v-btn
            @click="edititem(item)"
            rounded
            class="mx-1"
            small
            color="warning"
          >
            <v-icon left small>mdi-pencil</v-icon> แก้ไข</v-btn
          ><v-btn
            dark
            rounded
            small
            color="red"
            @click="deleteNumber(item)"
            class="mx-1"
            ><v-icon small>mdi-delete</v-icon>ลบ </v-btn
          ><v-btn
            dark
            @click="closeNumbertype(item)"
            rounded
            small
            color="black"
            class="mx-1"
            ><v-icon small>mdi-lock</v-icon>ปิด
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
            label="รายการต่อนหน้า"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="10" lg="10">
          <v-pagination
            v-model="option.page"
            :total-visible="7"
            :length="Math.ceil(itemDetail.length / option.itemsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-dialog full-width v-model="modaladdType" max-width="600">
        <v-form v-model="valid" ref="formnumber">
          <v-card class="pa-5">
            <v-card-actions class="justify-center">
              <h3 class="primary--text">สร้างตัวเลข</h3>
            </v-card-actions>
            <v-select
              dense
              outlined
              :rules="[v => !!v || 'กรุณากรอกรายละเอียดให้ครบถ้วน']"
              class="my-2"
              required
              text
              item-text="name"
              item-value="id"
              :items="itemSelecttype"
              v-model="formNumber.id"
              label="กรอกชื่อตัวเลข"
              hide-details="auto"
            ></v-select>
            <v-text-field
              dense
              :disabled="!formNumber.id"
              v-model="formNumber.amount_reward"
              required
              type="number"
              @keypress="e => checkpositive(e)"
              outlined
              :rules="[v => !!v || 'กรุณากรอกรายละเอียดให้ครบถ้วน']"
              class="my-2"
              label="จำนวนรางวัล"
              hide-details="auto"
            ></v-text-field
            ><v-card-actions class="justify-center">
              <v-btn color="success" @click="confirmCreate()" small
                >สร้างตัวเลข</v-btn
              ><v-btn color="error" small @click="closeCreate()">ปิด</v-btn>
            </v-card-actions>
          </v-card></v-form
        >
      </v-dialog>
      <v-dialog full-width v-model="modlEdit" max-width="600">
        <v-form v-model="validform" ref="formedit">
          <v-card class="pa-5">
            <v-card-actions class="justify-center">
              <h3 class="primary--text">แก้ไขตัวเลข</h3>
            </v-card-actions>
            <v-text-field
              dense
              disabled
              filled
              outlined
              class="my-2"
              required
              v-model="editform.name"
              label="กรอกชื่อตัวเลข"
              hide-details="auto"
            ></v-text-field>

            <v-text-field
              dense
              v-model="editform.amount_reward"
              required
              :rules="[v => !!v || 'กรุณากรอกรายละเอียดให้ครบถ้วน']"
              outlined
              class="my-2"
              @keypress="e => checkpositive(e)"
              type="number"
              label="จำนวนรางวัล"
              hide-details="auto"
            ></v-text-field>
            <div>
              สถานะ:
              <span
                class="success--text font-weight-bold"
                v-if="editform.status == 1"
                >เปิดใช้งาน</span
              ><span class="error--text font-weight-bold" v-else
                >ปิดใช้งาน</span
              >
              <v-switch
                v-model="editform.status"
                :true-value="1"
                :false-value="0"
              ></v-switch>
            </div>

            <v-card-actions class="justify-center">
              <v-btn color="success" @click="confirmEdit(editform)" small
                >แก้ไขตัวเลข</v-btn
              ><v-btn color="error" small @click="closeEdit()">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card></v-form
        >
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      option: {},
      pageSizes: [5, 10, 15, 25],
      validform: false,
      valid: false,
      itemSelecttype: null,
      formNumber: {
        id: "",
        amount_reward: ""
      },
      editform: {
        name: "",
        number: "",
        status: "",
        amount_reward: ""
      },
      title: "",
      modaladdType: false,
      modlEdit: false,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 0
      },
      itemDetail: [],
      headers: [
        {
          text: "ชื่อ",
          align: "center",
          value: "name"
        },
        {
          text: "จำนวนตัวเลข",
          align: "center",
          value: "number"
        },
        {
          text: "จำนวนรางวัล",
          align: "center",
          value: "amount_reward"
        },
        {
          text: "สถานะ",
          align: "center",
          sortable: false,
          value: "status"
        },
        {
          text: "สร้างเมื่อ",
          align: "center",
          value: "created_at"
        },
        {
          text: "แก้ไขล่าสุด",
          align: "center",
          value: "updated_at"
        },
        {
          text: "สร้างโดย",
          align: "center",
          sortable: false,
          value: "created_by"
        },
        {
          text: "แก้ไขโดย",
          align: "center",
          sortable: false,
          value: "updated_by"
        },
        {
          text: "ดำเนินการ",
          align: "center",
          sortable: false,
          value: "actions",
          width: "275px"
        }
      ]
    };
  },
  async fetch() {
    try {
      let params = {
        typecategory_id: this.$route.query.id,
        currentPage: this.pagination.page,
        limit: this.pagination.rowsPerPage
      };
      const response = await this.getLottoNumberType(params);
      this.itemDetail = response.result[0].typecategory_id.data;
      if (!this.itemDetail) {
        this.itemDetail = [];
      }
      this.modaladdType = false;
    } catch (error) {
      this.itemDetail = [];
      console.log(error);
      this.modaladdType = false;
    }
  },
  methods: {
    ...mapActions("lottosetting", [
      "getLottoNumberType",
      "createLottoNumberType",
      "updateLottoNumberTypeByid",
      "deleteLottoNumberType",
      "closeLottoNumberType",
      "getTypeDefult"
    ]),
    closeCreate() {
      this.$refs.formnumber.reset();
      this.modaladdType = false;
    },
    async opencreatetype() {
      try {
        this.formNumber = {};
        let { result } = await this.getTypeDefult();
        console.log(result);
        this.itemSelecttype = result;
      } catch (error) {
        console.log(error);
      }
      this.modaladdType = true;
    },

    dateformat(date) {
      return this.$moment(String(date)).format("YYYY/MM/DD เวลา HH:mm:ss");
    },
    edititem(item) {
      this.modlEdit = true;
      this.editform = Object.assign({}, item);
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
    closeEdit() {
      this.modlEdit = false;
    },
    async confirmCreate() {
      if (this.$refs.formnumber.validate()) {
        try {
          let body = {
            typecategory_id: this.$route.query.id,
            lottonumbertype: [
              {
                lottonumbertype_default_id: this.formNumber.id,
                amount_reward: this.formNumber.amount_reward
              }
            ]
          };
          await this.createLottoNumberType(body);
          this.modaladdType = false;
          this.$fetch();
        } catch (error) {
          console.log(error);
          this.$fetch();
        }
      } else {
        this.$swal("กรุณากรอกรายละเอียดให้ครบถ้วน", "", "warning");
      }
    },
    async confirmEdit(item) {
      if (this.$refs.formedit.validate()) {
        try {
          let body = {
            id: item.id,
            lottonumbertype_default_id: item.lottonumbertype_default_id,
            typecategory_id: this.$route.query.id,

            status: item.status,
            amount_reward: item.amount_reward
          };
          await this.updateLottoNumberTypeByid(body);
          this.modlEdit = false;
          this.$fetch();
        } catch (error) {
          this.modlEdit = false;
          this.$fetch();
          console.log(error);
        }
      } else {
        this.$swal("กรุณากรอกรายละเอียดให้ครบถ้วน", "", "warning");
      }
    },
    async deleteNumber(item) {
      try {
        this.$swal({
          title: "แน่ใจหรือไม่ว่าต้องการลบ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.deleteLottoNumberType(item.id);
            this.$swal("ลบเรียบร้อย!", "ดำเนิการเสร็จสิ้น", "success");
            this.$fetch();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async closeNumbertype(item) {
      try {
        this.$swal({
          title: "แน่ใจหรือไม่ว่าต้องการปิดหวย?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ปิดหวย",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.closeLottoNumberType(item.id);
            this.$swal({
              icon: "success",
              title: "ปิดเรียบร้อย",
              showConfirmButton: false,
              timer: 1500
            });
            this.$fetch();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
