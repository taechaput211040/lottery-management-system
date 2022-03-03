<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="mt-2">Lotto Type List</h1>
          <div class="white rounded-lg ma-2 pa-6">
            <v-row class="select-item ">
              <v-text-field
                solo-inverted
                label="search"
                dense
                class="col-6 col-md-3"
                required
              ></v-text-field
              ><v-btn color="success" class="mx-2" dark>
                <v-icon>mdi-magnify</v-icon>ค้นหา</v-btn
              ><v-spacer></v-spacer
              ><v-btn color="primary" rounded dark @click="modal_add = true">
                <v-icon>mdi-plus</v-icon>add</v-btn
              >
            </v-row>
            <v-card class="mx-auto mt-5 justify-center classtable">
              <v-data-table
                :headers="headers"
                :items="dataRender"
                :loading="isLoading"
                hide-default-footer
              >
                <template #[`item.no`]="{index}">
                  {{ index + 1 }}
                </template>
                <template #[`item.status`]="{item}">
                  <v-chip
                    v-if="item.status == '1'"
                    class="ma-2"
                    color="success"
                    outlined
                  >
                    <v-icon left>
                      mdi-circle
                    </v-icon>
                    active
                  </v-chip>
                  <v-chip
                    v-if="item.status == '0'"
                    class="ma-2"
                    color="error"
                    outlined
                  >
                    <v-icon left>
                      mdi-circle
                    </v-icon>
                    inactive
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
                    <span>แก้ไขหวย</span>
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
                    <span>ปิดหวย</span>
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
                    <span>ลบหวย</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card>
            <!-- add -->
            <v-dialog v-model="modal_add" max-width="400">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  List Lotto - ADD
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form ref="formcreate" v-model="valid">
                    <v-text-field
                      label="Lotto Type"
                      dense
                      :rules="titleRules"
                      v-model="formCreate.title"
                      required
                      outlined
                    ></v-text-field> </v-form
                ></v-card>
                <v-row class="pa-2">
                  <v-spacer></v-spacer>
                  <v-btn color="success" small class="mx-2" @click="addConfig()"
                    >ADD</v-btn
                  ><v-btn color="error" small @click="closeCreateconfig()"
                    >CANCLE</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-row>
              </v-card>
            </v-dialog>
            <!-- add -->
            <!-- edit -->
            <v-dialog v-model="modal_edit" max-width="400">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  List Lotto - EDIT
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-text-field
                      filled
                      label="Lotto Type"
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
                      STATUS :
                      <span v-if="dataEdit.status == 1">เปิด</span>
                      <span v-else>ปิด</span>
                    </div>
                  </v-form></v-card
                >
                <v-row class="pa-2">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    small
                    class="mx-2"
                    @click="editConfig(dataEdit)"
                    >SAVE</v-btn
                  ><v-btn color="error" small @click="closeEditconfig"
                    >CANCLE</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-row>
              </v-card>
            </v-dialog>
            <!-- edit -->
          </div>
        </v-container>
      </v-row>
    </div>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
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
          text: "ID.",
          value: "id",
          align: "center",
          class: "font-weight-bold",
          width: "350px"
        },
        {
          text: "Lotto Type",
          align: "center",
          filtertable: false,
          value: "title"
        },
        { text: "status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center", width: "200px" }
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
      this.dataEdit = data;
      this.modal_edit = true;
    },
    async editConfig(item) {
      try {
        let response = await this.updateLottotype(item);
        console.log(response);
        this.modal_edit = false;
        this.$swal({
          icon: "success",
          title: "แก้ไขเรียบร้อย",
          showConfirmButton: false,
          timer: 1500
        });
        this.$fetch();
      } catch (error) {
        console.log(error);
      }
    },
    closeEditconfig() {
      this.modal_edit = false;
      this.$fetch();
    },
    async closeConfig(item) {
      try {
        this.$swal({
          title: "แน่ใจหรือไม่ว่าต้องการปิดหวย?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ปิดหวย"
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
          } else {
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
          confirmButtonText: "ลบ"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.deleteLottotype(item);
            this.$swal(
              "ลบเรียบร้อย!",
              "Your file has been deleted.",
              "success"
            );
            this.$fetch();
          } else {
            this.$fetch();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addConfig() {
      if (this.$refs.formcreate.validate()) {
        try {
          await this.createLottotype(this.formCreate);
          this.$swal({
            icon: "success",
            title: "สร้างหวยเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          this.modal_add = false;
          this.$fetch();
        } catch (error) {
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
      this.$fetch();
    }
  }
};
</script>

<style></style>
