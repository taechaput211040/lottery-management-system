<template>
  <div>
    <div><h2>รอบหวย</h2></div>

    <div class="d-flex justify-end">
      <h4 v-if="select2Date" class="pr-2 red--text">
        {{ getStartDate() }} - {{ getEndDate() }}
      </h4>
    </div>
    <div class="my-3 rounded-lg white">
      <h3 class="pa-3">รายละเอียดการค้นหา</h3>
      <v-divider></v-divider>
      <div class="pa-3 row align-center">
        <div class="pa-2  col-12 col-sm-6 col-lg-4">
          <v-text-field
            outlined
            dense
            @keyup.enter="searchlotto()"
            placeholder="กรอกชื่อหวยที่ต้องการจะค้นหา"
            v-model="title_lotto"
            hide-details="auto"
          ></v-text-field>
        </div>
        <div class="pa-2 col-12 col-sm-6 col-lg-4">
          <v-btn
            color="primary"
            rounded
            class="mx-2 btn_search"
            @click="searchlotto()"
            ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
          >
        </div>
      </div>
    </div>
    <div class="d-flex align-center">
      <h2>รายการรอบหวย</h2>
    </div>
    <v-dialog v-model="dlInsert" persistent max-width="800">
      <v-card class="pa-3">
        <v-form v-model="validform" ref="formcreate">
          <v-card-title class="justify-center text-center font-weight-bold">
            เพิ่มรอบหวย
          </v-card-title>
          <v-container fluid class="elevation-3 rounded-lg pa-3">
            <v-row>
              <v-col cols="4">
                ประเภทหวย
              </v-col>
              <v-col cols="8">
                <v-select
                  :items="$store.state.lottosetting.lottotype"
                  item-text="title"
                  item-value="id"
                  v-model="insertForm.lottotype_id"
                  hide-details="auto"
                  @change="selectTypelotto"
                  outlined
                  dense
                  placeholder="กรุณาเลือกประเภทหวย"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                ชื่อหวย
              </v-col>
              <v-col cols="8">
                <v-autocomplete
                  :items="itemcategory"
                  item-text="title"
                  hide-details="auto"
                  item-value="id"
                  :rules="[v => !!v || 'กรุณาเลือกหวย']"
                  :disabled="insertForm.lottotype_id == null"
                  v-model="insertForm.typecategory_id"
                  outlined
                  dense
                  placeholder="กรุณาเลือกหวย"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                รอบหวย
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="จำนวนรอบ"
                  :rules="[v => !!v || 'กรุณากรอกชื่อรอบ']"
                  dense
                  outlined
                  hide-details="auto"
                  v-model="insertForm.lotto_round"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- start time -->
            <v-row>
              <v-col cols="4">
                วัน และ เวลาที่เปิดแทง
              </v-col>
              <v-col cols="8">
                <el-date-picker
                  v-model="insertForm.bet_open_time"
                  type="datetime"
                  placeholder="วัน และ เวลาที่เปิดแทง"
                  style="width:100%"
                >
                </el-date-picker>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                วัน และ เวลาที่ปิดแทง
              </v-col>
              <v-col cols="8">
                <el-date-picker
                  type="datetime"
                  style="width:100%"
                  v-model="insertForm.bet_close_time"
                  placeholder="เลือกวัน และ เวลาที่ปิดแทง"
                >
                </el-date-picker>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                วัน และ เวลาที่หวยออก
              </v-col>
              <v-col cols="8">
                <el-date-picker
                  type="datetime"
                  style="width:100%"
                  v-model="insertForm.bet_lotto_time"
                  placeholder="เลือก วัน และ เวลาที่หวยออก"
                >
                </el-date-picker>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-center">
            <v-btn
              color="success"
              :loading="loading_btn"
              @click="submitInsert()"
              >แก้ไข</v-btn
            >
            <v-btn color="error" @click="closeCreateconfig()"
              >ยกเลิก</v-btn
            ></v-card-actions
          ></v-form
        >
      </v-card>
    </v-dialog>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <div class="white rounded-lg">
      <div class="text-right" v-if="this.$store.state.auth.role == 'LOTTO'">
        <v-btn color="primary" @click="openInsert()" rounded class="ma-3"
          ><v-icon left>mdi-plus</v-icon>เพิ่มรอบหวย</v-btn
        >
      </div>

      <div class="rounded-lg white">
        <v-data-table
          :server-items-length="pagination.rowsNumber"
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :options.sync="options"
          hide-default-footer
          :loading="isLoading"
          :headers="setHeader"
          :items="itemtypeaward"
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
            {{
              pagination.rowsPerPage * (pagination.page - 1) + (index + 1)
            }}</template
          >
          <template #[`item.action`]="{item}">
            <div class="d-flex justify-center">
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
                <span>แก้ไขรอบหวย</span>
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
                <span>ลบรอบหวย</span>
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
                <span>ปิดรอบหวย</span>
              </v-tooltip>
            </div>
          </template>
          <template #[`item.bet_open_time`]="{item}">
            {{ dateformat(item.bet_open_time) }}
          </template>
          <template #[`item.bet_close_time`]="{item}">
            {{ dateformat(item.bet_close_time) }}
          </template>
          <template #[`item.bet_lotto_time`]="{item}">
            {{ dateformat(item.bet_lotto_time) }}
          </template>
          <template #[`item.status`]="{item}"
            ><v-chip color="success" dark small v-if="item.status == 1"
              ><v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน</v-chip
            ><v-chip color="red" dark small v-else
              ><v-icon x-small left>mdi-circle</v-icon>ปิดใช้งาน</v-chip
            ></template
          >
        </v-data-table>

        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              dense
              hide-details="auto"
              v-model="pagination.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChange"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="pagination.page"
              :total-visible="7"
              :length="
                Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- edit modal card-->
    <!-- TODO : change after edit -->
    <!-- TODO : change and cancel button -->
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card class="pa-3">
        <v-card-title class="justify-center">
          <h3>แก้ไขรอบหวย</h3>
        </v-card-title>
        <v-container fluid class="elevation-3 rounded-lg pa-3">
          <v-row>
            <v-col cols="4">
              ชื่อหวย
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="ชื่อ"
                placeholder="กรอกชื่อ"
                hide-details="auto"
                dense
                disabled
                outlined
                :value="editing.title"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              รอบหวย
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="จำนวนรอบ"
                dense
                outlined
                hide-details="auto"
                :value="editing.lotto_round"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- start time -->
          <v-row>
            <v-col cols="4">
              วัน และ เวลาที่เปิดแทง
            </v-col>
            <v-col cols="8">
              <el-date-picker
                v-model="editing.bet_open_time"
                type="datetime"
                placeholder="วัน และ เวลาที่เปิดแทง"
                style="width:100%"
              >
              </el-date-picker>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              วัน และ เวลาที่ปิดแทง
            </v-col>
            <v-col cols="8">
              <el-date-picker
                type="datetime"
                style="width:100%"
                v-model="editing.bet_close_time"
                placeholder="เลือกวัน และ เวลาที่ปิดแทง"
              >
              </el-date-picker>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              วัน และ เวลาที่หวยออก
            </v-col>
            <v-col cols="8">
              <el-date-picker
                type="datetime"
                style="width:100%"
                v-model="editing.bet_lotto_time"
                placeholder="เลือก วัน และ เวลาที่หวยออก"
              >
              </el-date-picker>
            </v-col>
          </v-row>

          <!-- radio button -->
          <v-row>
            <v-col cols="4">
              สถานะ
            </v-col>
            <v-col cols="8">
              <v-radio-group v-model="editing.status" row>
                <v-radio label="เปิด" :value="1"></v-radio>
                <v-radio label="ปิด" :value="0"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-center "
          ><v-btn
            color="success"
            @click="editRoundlotto()"
            :loading="loading_btn"
            >แก้ไข</v-btn
          >
          <v-btn color="error" @click="dialogdetail = false"
            >ยกเลิก</v-btn
          ></v-card-actions
        >
      </v-card>

      <!-- button -->
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../../components/form/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      loading_btn: false,
      sortBy: "",
      validform: false,
      sortDesc: false,
      itemcategory: [],
      selectType: "",
      insertForm: {},
      dlInsert: false,
      title_lotto: undefined,
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
      select2Date: false,
      dialogdetail: false,
      editing: {},
      headersdatelotto: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "ชื่อหวย",
          value: "title",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "รอบหวย",
          value: "lotto_round",
          align: "left",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "วันที่เปิดแทง",
          value: "bet_open_time",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "วันที่ปิดแทง",
          value: "bet_close_time",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "วันที่ออกผล",
          value: "bet_lotto_time",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "status",
          sort: false,
          align: "center",
          class: "font-weight-bold",
          sortable: false
        },
        {
          text: "ดำเนินการ",
          value: "action",
          sort: false,
          align: "center",
          class: "font-weight-bold",
          sortable: false
        }
      ],
      itemtypeaward: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
  computed: {
    setHeader() {
      let headerender = this.headersdatelotto;
      if (this.$store.state.auth.role != "LOTTO") {
        headerender = [
          {
            text: "ลำดับ",
            value: "no",
            align: "center",
            class: "font-weight-bold",
            cellClass: "font-weight-bold"
          },
          {
            text: "ชื่อหวย",
            value: "title",
            align: "left",
            class: "font-weight-bold",
            cellClass: "font-weight-bold"
          },
          {
            text: "รอบหวย",
            value: "lotto_round",
            align: "left",
            class: "font-weight-bold"
          },
          {
            text: "วันที่เปิดแทง",
            value: "bet_open_time",
            align: "center",
            class: "font-weight-bold"
          },
          {
            text: "วันที่ปิดแทง",
            value: "bet_close_time",
            align: "center",
            class: "font-weight-bold"
          },
          {
            text: "วันที่ออกผล",
            value: "bet_lotto_time",
            align: "center",
            class: "font-weight-bold"
          },
          {
            text: "สถานะ",
            value: "status",
            sort: false,
            align: "center",
            class: "font-weight-bold"
          }
        ];
        return headerender;
      } else {
        return this.headersdatelotto;
      }
    }
  },
  async fetch() {
    await this.getdataRender();
  },
  methods: {
    ...mapActions("lottosetting", [
      "getProgramLotto",
      "updateProgramLotto",
      "deleteProgramLotto",
      "closeProgramLotto",
      "getTypeCategory",
      "createProgramLotto"
    ]),
    openInsert() {
      this.dlInsert = true;
    },

    async searchlotto(e) {
      let order = this.getOptionalOrder();
      if (
        !this.title_lotto ||
        this.title_lotto === undefined ||
        this.title_lotto === ""
      ) {
        await this.getdataRender();
      } else {
        try {
          let params = {
            title: this.title_lotto ? this.title_lotto : undefined,
            currentPage: this.pagination.page,
            limit: this.pagination.rowsPerPage,
            order_by: order == undefined ? undefined : order.sortBy,
            order_mode: order == undefined ? undefined : order.sortDesc
          };
          let data = await this.getProgramLotto(params);
          this.pagination.rowsNumber = 0;
          if (!data.result[0].title.data) {
            this.itemtypeaward = [];
            this.$swal({
              icon: "warning",
              title: "กรุณากรอกชื่อหวยให้ถูกต้อง",
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            this.itemtypeaward = data.result[0].title.data;
            this.pagination.rowsNumber = data.result[0].title.total;
          }
        } catch (err) {
          console.log(err);

          this.$swal({
            icon: "warning",
            title: "กรุณากรอกชื่อหวยให้ถูกต้อง",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
      this.isLoading = false;
    },
    async submitInsert() {
      let body = {
        bet_open_time: this.insertForm.bet_open_time,
        bet_close_time: this.insertForm.bet_close_time,
        bet_lotto_time: this.insertForm.bet_lotto_time,
        lottotype_id: this.insertForm.lottotype_id,
        typecategory_id: this.insertForm.typecategory_id,
        lotto_round: this.insertForm.lotto_round
      };
      if (this.$refs.formcreate.validate()) {
        this.loading_btn = true;
        try {
          await this.createProgramLotto(body);
          this.$swal({
            icon: "success",
            title: "สร้างรอบหวยเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          this.loading_btn = false;
          this.dlInsert = false;
          this.$fetch();
        } catch (error) {
          this.loading_btn = false;
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "error",
          title: "กรุณากรอกรายละเอียดให้ครบถ้วน",
          showConfirmButton: false,
          timer: 1000
        });
        this.loading_btn = false;
        console.log("nope");
      }
    },
    getOptionalOrder() {
      let order = {};
      if (this.options.sortBy[0]) {
        order.sortBy = this.options.sortBy[0];
        if (this.options.sortDesc[0] === false) {
          order.sortDesc = "ASC";
        } else {
          order.sortDesc = "DESC";
        }
      } else {
        order = undefined;
        console.log("noooo");
      }
      return order;
    },
    async getdataRender() {
      this.isLoading = true;
      let order = this.getOptionalOrder();
      console.log(order, "oreder");
      try {
        let params = {
          currentPage: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          order_by: order == undefined ? undefined : order.sortBy,
          order_mode: order == undefined ? undefined : order.sortDesc
        };
        let data = await this.getProgramLotto(params);
        this.itemtypeaward = data.result[0].data;
        this.pagination.rowsNumber = data.result[0].total;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async selectTypelotto(value) {
      this.itemcategory = [];
      this.selectTypeCategory = "";

      try {
        let params = {
          type_id: value,
          currentPage: 1,
          limit: 500
        };

        const response = await this.getTypeCategory(params);
        this.itemcategory = response.result[0].lottotype_id.data;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getdataRender();
    },
    dateformat(date) {
      return this.$moment(String(date)).format("YYYY/MM/DD เวลา HH:mm:ss");
    },
    openEdit(obj) {
      this.editing = Object.assign({}, obj);
      this.dialogdetail = true;
    },
    async editRoundlotto() {
      this.loading_btn = true;
      try {
        await this.updateProgramLotto(this.editing);
        this.loading_btn = false;
        this.dialogdetail = false;
        this.$swal({
          icon: "success",
          title: "เเก้ไขเรียบร้อย",
          showConfirmButton: false,
          timer: 1500
        });
        if (this.title_lotto) {
          this.loading_btn = false;
          this.searchlotto();
        } else {
          this.loading_btn = false;
          this.$fetch();
        }
      } catch (error) {
        console.log(error);
        this.loading_btn = false;
        this.dialogdetail = false;
        if (this.title_lotto) {
          this.searchlotto();
        } else {
          this.$fetch();
        }
      }
    },
    async deleteConfig(item) {
      try {
        this.$swal({
          title: "แน่ใจหรือไม่ว่าต้องการลบรอบหวย?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.deleteProgramLotto(item.id);
            this.$swal("ลบเรียบร้อย!", "ดำเนินการเสร็จสิ้น", "success");
            if (this.title_lotto) {
              this.searchlotto();
            } else {
              this.$fetch();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    closeCreateconfig() {
      this.dlInsert = false;
      this.$refs.formcreate.reset();
      this.$refs.formcreate.resetValidation();
    },
    async closeConfig(item) {
      try {
        this.$swal({
          title: "แน่ใจหรือไม่ว่าต้องการปิดรอบหวย?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ปิดหวย",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.closeProgramLotto(item.id);
            this.$swal({
              icon: "success",
              title: "ปิดเรียบร้อย",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.title_lotto) {
              this.searchlotto();
            } else {
              this.$fetch();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    options: {
      async handler() {
        if (this.title_lotto) {
          await this.searchlotto();
        } else {
          await this.getdataRender();
        }
      },
      deep: true
    },
    selecttype(newVal) {
      if (newVal) {
        this.filter = {
          startDate: "",
          endDate: ""
        };
      }
    }
  }
};
</script>

<style></style>
