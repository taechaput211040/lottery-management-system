<template>
  <v-flex>
    <div><h2>รอบหวย</h2></div>
    <div class="d-flex justify-end">
      <h4 v-if="select2Date" class="pr-2 red--text">
        {{ getStartDate() }} - {{ getEndDate() }}
      </h4>
    </div>
    <div class="my-3 rounded-lg white">
      <h3 class="pa-3">ตัวเลือกการค้นหา</h3>

      <v-divider></v-divider>
      <div class="pa-3">
        <v-radio-group v-model="selecttype" row>
          <v-radio label="วันนี้" value="day"></v-radio>
          <v-radio label="เมื่อวาน" value="yesterday"></v-radio>
          <v-radio label="สัปดาห์นี้" value="week"></v-radio>
          <v-radio label="สัปดาห์ที่แล้ว" value="lastweek"></v-radio>
          <v-radio label="เดือน" value="mounth"></v-radio>
          <v-radio label="วันที่" value="findate"></v-radio>
        </v-radio-group>
        <v-row>
          <v-col cols="12" sm="6" v-if="selecttype == 'mounth'">
            <div class="px-2 font-weight-bold">
              เลือกเดือน :
              <el-date-picker
                type="month"
                v-model.trim="filter.month"
                arrow-control
                placeholder="เลือกเดือน"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" v-if="selecttype == 'findate'">
            <div class="px-2 font-weight-bold row">
              <div class="col-12  col-sm-6 col-lg-3">
                ตั้งเเต่วันที่ :
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.startDate"
                  arrow-control
                  placeholder="เลือกวันที่ต้องการค้นหา"
                >
                </el-date-picker>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                ถึงวันที่ :
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.endDate"
                  arrow-control
                  placeholder="เลือกวันที่ต้องการค้นหา"
                >
                </el-date-picker>
              </div>
            </div>
          </v-col>
          <v-col cols="12"
            ><v-btn color="primary" @click="check2DateSelect()"
              >ค้นหา</v-btn
            ></v-col
          >
        </v-row>
      </div>
    </div>
    <div><h2>รายชื่อโปรแกรมรอบหวย</h2></div>
    <div class="white rounded-lg">
      <div class="rounded-lg white">
        <v-data-table
          :server-items-length="pagination.rowsNumber"
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :options.sync="options"
          hide-default-footer
          :loading="isLoading"
          :headers="headersdatelotto"
          :items="itemtypeaward"
        >
          <template #[`item.no`]="{index}">
            {{
              pagination.rowsPerPage * (pagination.page - 1) + (index + 1)
            }}</template
          >
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
          <template #[`item.status`]="{item}"
            ><v-chip color="success" dark small v-if="item.status == 1"
              ><v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน</v-chip
            ><v-chip color="red" dark small v-else
              ><v-icon x-small left>mdi-circle</v-icon>ปิดใช้งาน</v-chip
            ></template
          >
        </v-data-table>

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
        <v-card-title>
          <h3>แก้ไขรอบหวย</h3>
        </v-card-title>
        <v-container fluid>
          <v-row>
            <v-col cols="4">
              ชื่อหวย
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="ชื่อ"
                placeholder="กรอกชื่อ"
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
                style="width:100%"
                v-model="editing.bet_open_time"
                type="เวลาที่เปิดแทง"
                placeholder="Select date and time"
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
                style="width:100%"
                v-model="editing.bet_close_time"
                type="เวลาที่ปิดแทง"
                placeholder="Select date and time"
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
                style="width:100%"
                v-model="editing.bet_lotto_time"
                type="เวลาที่หวยออก"
                placeholder="Select date and time"
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
        <v-card-actions class="mx-2"
          ><v-btn color="success" @click="editRoundlotto()">แก้ไข</v-btn>
          <v-btn color="error" @click="dialogdetail = false"
            >ปิด</v-btn
          ></v-card-actions
        >
      </v-card>

      <!-- button -->
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
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
          align: "left",
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
          class: "font-weight-bold",
          cellClass: "font-weight-bold green--text"
        },
        {
          text: "วันที่ปิดแทง",
          value: "bet_close_time",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold red--text"
        },
        {
          text: "วันที่ออกผล",
          value: "bet_lotto_time",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold red--text"
        },
        {
          text: "สถานะ",
          value: "status",
          sort: false,
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "ดำเนินการ",
          value: "action",
          sort: false,
          align: "center",
          class: "font-weight-bold"
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

  async fetch() {
    this.getdataRender();
  },
  methods: {
    ...mapActions("lottosetting", [
      "getProgramLotto",
      "updateProgramLotto",
      "deleteProgramLotto",
      "closeProgramLotto"
    ]),
    async getdataRender() {
      this.isLoading = true;
      try {
        let params = {
          currentPage: this.pagination.page,
          limit: this.pagination.rowsPerPage
        };
        let data = await this.getProgramLotto(params);
        this.itemtypeaward = data.result[0].data;
        this.pagination.rowsNumber = data.result[0].total;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    check2DateSelect() {
      if (this.filter.startDate) {
        console.log("filter.startDate");
        console.log(this.filter);
      }
      if (this.filter.endDate) {
        console.log("filter.endDate");
        console.log(this.filter.endDate);
      }
      if (this.filter.startDate && this.filter.endDate) {
        this.select2Date = true;
      } else {
        this.select2Date = false;
      }
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getdataRender();
    },

    openEdit(obj) {
      this.editing = obj;
      console.log(this.editing);
      this.dialogdetail = true;
    },
    async editRoundlotto() {
      try {
        await this.updateProgramLotto(this.editing);
        this.dialogdetail = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
        this.dialogdetail = false;
        this.$fetch();
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
          confirmButtonText: "ลบ"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.deleteProgramLotto(item.id);
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
          title: "แน่ใจหรือไม่ว่าต้องการปิดรอบหวย?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ปิดหวย"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.closeProgramLotto(item.id);
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
  },
  watch: {
    options: {
      async handler() {
        await this.getdataRender();
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
