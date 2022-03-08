<template>
  <div>
    <h1 class=" mt-2">ชนิดของหวย : {{ $route.query.type }}</h1>
    <div class="ma-2 pa-6 white rounded-lg">
      <v-row class="select-item "
        ><v-btn color="red" @click="$router.go(-1)" small dark>back</v-btn
        ><v-select class="col-6 col-md-2" label="Type Category"></v-select>
        <v-text-field
          dense
          solo-inverted
          label="Title"
          required
          class="col-6 col-md-3"
          ><v-btn slot="append" color="success" fab dark x-small>
            <v-icon>mdi-magnify</v-icon></v-btn
          ></v-text-field
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded dark @click="openAdddialog()">
          <v-icon>mdi-plus</v-icon>เพิ่มชนิดของหวย</v-btn
        ></v-row
      >
      <v-card class="mx-auto mt-5 justify-center classtable">
        <v-data-table
          :server-items-length="pagination.rowsNumber"
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :headers="headers"
          :items="itemexample"
          :options.sync="options"
          hide-default-footer
          :loading="isLoading"
        >
          <template #[`item.no`]="{index}">
            {{ pagination.rowsPerPage * (pagination.page - 1) + (index + 1) }}
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
                  ><v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn></template
              >
              <span>แก้ไขหวย</span>
            </v-tooltip>
            <v-tooltip bottom color="red">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-1"
                  fab
                  dark
                  x-small
                  color="red"
                  @click="deleteConfig(item)"
                  ><v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn></template
              >
              <span>ลบหวย</span>
            </v-tooltip>
            <v-tooltip bottom color="black">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="black"
                  class="mx-1"
                  fab
                  dark
                  x-small
                  @click="closeConfig(item)"
                  ><v-icon dark>
                    mdi-lock
                  </v-icon>
                </v-btn></template
              >
              <span>ปิดหวย</span>
            </v-tooltip>
          </template>

          <template #[`item.status`]="{item}">
            <v-chip small v-if="item.status == 1" class="ma-2" color="success">
              <v-icon left>
                mdi-circle
              </v-icon>
              เปิดใช้งาน
            </v-chip>
            <v-chip small v-if="item.status == 0" class="ma-2" color="error">
              <v-icon left>
                mdi-circle
              </v-icon>
              ปิดใช้งาน
            </v-chip>
          </template>
          <template #[`item.permaxbet`]="{item}">
            {{ item.permaxbet }} %
          </template></v-data-table
        >
        <!-- add -->
        <v-dialog full-width v-model="modal_add" max-width="600">
          <v-card class="pa-4">
            <v-card-title>
              <h3>เพิ่มชนิดของหวย</h3>
            </v-card-title>
            <v-card class="pa-4 ma-3">
              <v-form>
                <v-text-field
                  label="ชื่อหวย"
                  v-model="formCreate.title"
                  dense
                  outlined
                ></v-text-field>
                <v-text-field
                  label="กฏกติกา"
                  v-model="formCreate.rule_play"
                  dense
                  outlined
                ></v-text-field>
              </v-form>
            </v-card>
            <v-row class="pa-2">
              <v-spacer></v-spacer>
              <v-btn color="success" small class="mx-2" @click="addCategpry()"
                >ADD</v-btn
              ><v-btn color="error" small @click="modal_add = false"
                >CANCLE</v-btn
              >
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- addd -->
        <!-- edit  -->
        <v-dialog full-width v-model="modal_edit" max-width="600">
          <v-card class="pa-4">
            <v-card-title>
              <h3>แก้ไขชนิดของหวย</h3>
            </v-card-title>
            <v-card class="pa-4 ma-3">
              <v-form>
                <v-text-field
                  v-model="dataEdit.title"
                  label="title"
                  filled
                  disabled
                  dense
                ></v-text-field>
                <v-text-field
                  label="กฎกติกา"
                  v-model="dataEdit.rule_play"
                  dense
                  outlined
                ></v-text-field>
                สถานะการใช้งาน
                <v-switch
                  v-model="dataEdit.status"
                  :false-value="0"
                  :true-value="1"
                  @click="addstatus"
                ></v-switch>
              </v-form>
            </v-card>
            <v-row class="pa-2">
              <v-spacer></v-spacer>
              <v-btn color="success" small class="mx-2" @click="confirmEdit()"
                >SAVE</v-btn
              ><v-btn color="error" small @click="modal_edit = false"
                >CANCLE</v-btn
              >
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- edit  -->
      </v-card>
      <v-row align="baseline" class="ma-3 ">
        <v-col cols="12" sm="2" lg="1">
          <v-select
            v-model="pagination.rowsPerPage"
            :items="pageSizes"
            @change="handlePageSizeChange"
            label="Items per Page"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="10" lg="11">
          <v-pagination
            v-model="pagination.page"
            :total-visible="7"
            :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formCreate: {
        title: "",
        lotto_flag: "",
        rule_play: ""
      },
      isLoading: false,
      pageSizes: [5, 10, 15, 25],
      options: {},
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      dataEdit: [],
      modal_edit: false,
      select_status: "inactive",
      modal_add: false,
      headers: [
        {
          text: "No.",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชื่อ",
          align: "center",
          filterable: false,
          value: "title",
          cellClass: "font-weight-bold"
        },

        {
          text: "สถานะ",
          align: "status",
          filterable: false,
          value: "status"
        },
        { text: "สร้างเมื่อ ", value: "created_at", align: "center" },
        { text: "สร้างโดย", value: "created_by", align: "center" },
        { text: "แก้ไขเมื่อ", value: "updated_at", align: "center" },
        { text: "แก้ไขโดย", value: "updated_by", align: "center" },
        { text: "ดำเนินการ", value: "action", align: "center" }
      ],
      itemexample: []
    };
  },

  watch: {
    options: {
      async handler() {
        await this.getdataRender();
      },
      deep: true
    }
  },
  async fetch() {
    this.getdataRender();
  },

  methods: {
    ...mapActions("lottosetting", [
      "getTypeCategory",
      "createType",
      "updateTypeCategory",
      "deleteTypeCategory",
      "closeTypeCategory"
    ]),
    async addCategpry() {
      try {
        let body = {
          title: this.formCreate.title,
          lotto_flag: this.formCreate.lotto_flag,
          rule_play: this.formCreate.rule_play,
          lottotype_id: this.$route.query.id
        };
        await this.createType(body);
        this.modal_add = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.modal_add = false;
        this.$fetch();
      }
    },
    async getdataRender() {
      this.isLoading = true;
      try {
        let params = {
          type_id: this.$route.query.id,
          currentPage: this.pagination.page,
          limit: this.pagination.rowsPerPage
        };
        const response = await this.getTypeCategory(params);
        this.itemexample = response.result[0].lottotype_id.data;
        this.pagination.rowsNumber = response.result[0].lottotype_id.total;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    showdetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    },
    addstatus() {},
    openEdit(data) {
      this.dataEdit = data;
      this.modal_edit = true;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getdataRender();
    },
    openAdddialog() {
      this.modal_add = true;
    },
    async confirmEdit() {
      try {
        let body = {
          id: this.dataEdit.id,
          title: this.dataEdit.title,
          status: this.dataEdit.status,
          lotto_flag: this.dataEdit.lotto_flag,
          rule_play: this.dataEdit.rule_play,
          lottotype_id: this.$route.query.id
        };
        await this.updateTypeCategory(body);
        this.$fetch();
        this.modal_edit = false;
      } catch (error) {
        console.log(error);
        this.modal_edit = false;
        this.$fetch();
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
            await this.deleteTypeCategory(item.id);
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
            await this.closeTypeCategory(item.id);
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
    }
  }
};
</script>

<style></style>
