<template>
  <div>
    <div v-if="!this.$route.query.id">
      <h1 class="mt-2">ประเภทของหวย</h1>
      <div v-if="isLoading">
        <loading-page></loading-page>
      </div>
      <div v-else class="white rounded-lg ma-2 py-2">
        <div class="d-flex ma-3">
          <v-spacer></v-spacer
          ><v-btn color="primary" rounded dark @click="modal_add = true">
            <v-icon>mdi-plus</v-icon>เพิ่มประเภทหวย</v-btn
          >
        </div>

        <v-card class="mx-auto  justify-center classtable">
          <v-data-table
            :headers="headers"
            :items="dataRender"
            :loading="isLoading"
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
            <template #[`item.no`]="{index}">
              {{ index + 1 }}
            </template>
            <template #[`item.typcategory`]="{item}">
              <v-btn
                color="grey darken-4 "
                dark
                small
                @click="showdetail(item.id, item.title)"
                >ดูรายชื่อหวยใน{{ item.title }}</v-btn
              >
            </template>
            <template #[`item.status`]="{item}">
              <v-chip
                v-if="item.status == '1'"
                class="ma-2"
                color="success"
                small
              >
                <v-icon left>
                  mdi-circle
                </v-icon>
                เปิดใช้งาน
              </v-chip>
              <v-chip
                v-if="item.status == '0'"
                class="ma-2"
                color="error"
                small
              >
                <v-icon left>
                  mdi-circle
                </v-icon>
                ปิดใช้งาน
              </v-chip>
            </template>
            <template #[`item.action`]="{item}">
              <v-tooltip bottom color="warning">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mx-1"
                    fab
                    dark
                    x-small
                    color="warning"
                    @click="openEdit(item)"
                  >
                    <v-icon dark>
                      mdi-pencil
                    </v-icon>
                  </v-btn></template
                >
                <span>แก้ไขประเภทหวย</span>
              </v-tooltip>

              <v-tooltip bottom color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mx-1"
                    fab
                    dark
                    x-small
                    color="black"
                    @click="closeConfig(item)"
                  >
                    <v-icon dark>
                      mdi-lock
                    </v-icon>
                  </v-btn></template
                >
                <span>ปิดประเภทหวย</span>
              </v-tooltip>
              <v-tooltip bottom color="error">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mx-1"
                    fab
                    dark
                    x-small
                    color="error"
                    @click="deleteConfig(item)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn></template
                >
                <span>ลบประเภทหวย</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>

        <!-- add -->
        <v-dialog v-model="modal_add" max-width="400">
          <v-card class="pa-4">
            <v-form ref="formcreate" v-model="valid">
              <v-card-title>
                <h3>ประเภทของหวย - เพิ่ม</h3>
              </v-card-title>
              <v-card class="pa-4 ma-3">
                <v-text-field
                  label="ประเภทหวย"
                  dense
                  :rules="titleRules"
                  v-model="formCreate.title"
                  required
                  outlined
                ></v-text-field
              ></v-card>
              <v-row class="pa-2">
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  :loading="loading_btn"
                  small
                  class="mx-2"
                  @click="addConfig()"
                  >เพิ่ม</v-btn
                ><v-btn color="error" small @click="closeCreateconfig()"
                  >ยกเลิก</v-btn
                >
                <v-spacer></v-spacer> </v-row
            ></v-form>
          </v-card>
        </v-dialog>
        <!-- add -->
        <!-- edit -->
        <v-dialog v-model="modal_edit" max-width="400">
          <v-card class="pa-4">
            <v-card-title>
              <h3>ประเภทของหวย - แก้ไข</h3>
            </v-card-title>
            <v-card class="pa-4 ma-3">
              <v-form>
                <v-text-field
                  filled
                  label="ประเภทหวย"
                  v-model="dataEdit.title"
                  dense
                  outlined
                ></v-text-field>
                <div class="d-flex align-center">
                  <v-switch
                    hide-details="auto"
                    v-model="dataEdit.status"
                    :false-value="0"
                    :true-value="1"
                    flat
                  ></v-switch>
                  สถานะ :
                  <span v-if="dataEdit.status == 1">เปิด</span>
                  <span v-else>ปิด</span>
                </div>
              </v-form></v-card
            >
            <v-row class="pa-2">
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :loading="loading_btn"
                small
                class="mx-2"
                @click="editConfig(dataEdit)"
                >แก้ไข</v-btn
              ><v-btn color="error" small @click="closeEditconfig"
                >ยกเลิก</v-btn
              >
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- edit -->
      </div>
    </div>
    <type-catagory v-else></type-catagory>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../../components/form/LoadingPage.vue";
import TypeCatagory from "../../components/typecataegory/TypeCatagory.vue";
export default {
  components: { TypeCatagory, LoadingPage },
  watch: {
    modal_add: {
      handler() {
        this.formCreate = {
          title: ""
        };
      },
      deep: true
    }
  },
  data() {
    return {
      loading_btn: false,
      titleRules: [v => !!v || "กรุรากรอกชื่อหวย"],
      valid: true,
      select_status: "0",
      modal_edit: false,
      dataEdit: [],
      modal_add: false,
      isLoading: false,
      formCreate: {
        title: ""
      },
      headers: [
        {
          text: "No.",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "100px"
        },
        {
          text: "ชื่อประเภทของหวย",
          align: "center",
          filtertable: false,
          value: "title",
          cellClass: "font-weight-bold"
        },
        { text: "ชนิดของหวย", value: "typcategory", align: "center" },
        { text: "สถานะ", value: "status", align: "center" },
        { text: "ดำเนินการ", value: "action", align: "center", width: "200px" }
      ],
      dataRender: []
    };
  },

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.getLottotype();
      this.dataRender = response.result.data;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("lottosetting", [
      "getLottotype",
      "createLottotype",
      "updateLottotype",
      "deleteLottotype",
      "closeLottotype"
    ]),
    openEdit(data) {
      this.dataEdit = Object.assign({}, data);
      this.modal_edit = true;
    },
    async editConfig(item) {
      this.loading_btn = true;
      try {
        let response = await this.updateLottotype(item);
        console.log(response);
        this.modal_edit = false;
        this.loading_btn = false;
        this.$swal({
          icon: "success",
          title: "แก้ไขเรียบร้อย",
          showConfirmButton: false,
          timer: 1500
        });
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.loading_btn = false;
      }
    },
    closeEditconfig() {
      this.modal_edit = false;
    },
    async closeConfig(item) {
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
            await this.closeLottotype(item);
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
    },
    async deleteConfig(item) {
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
            await this.deleteLottotype(item);
            this.$swal("ลบเรียบร้อย!", "ดำเนินการเสร็จสิ้น", "success");
            this.$fetch();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addConfig() {
      if (this.$refs.formcreate.validate()) {
        this.loading_btn = true;
        try {
          await this.createLottotype(this.formCreate);
          this.$swal({
            icon: "success",
            title: "สร้างหวยเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          this.loading_btn = false;
          this.modal_add = false;
          this.$fetch();
        } catch (error) {
          this.loading_btn = false;
          this.$swal({
            icon: "error",
            title: "สร้างผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "error",
          title: "กรุณากรอกชื่อหวย",
          showConfirmButton: false,
          timer: 1000
        });
        console.log("nope");
      }
    },
    closeCreateconfig() {
      this.modal_add = false;
      this.$refs.formcreate.reset();
      this.$refs.formcreate.resetValidation();
    },
    showdetail(id, title) {
      this.$router.push(`${this.$route.path}?id=${id}&type=${title}`);
    }
  }
};
</script>

<style></style>
