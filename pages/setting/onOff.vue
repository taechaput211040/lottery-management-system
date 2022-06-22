<template>
  <div>
    <h2>เปิดปิดหวย</h2>

    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <div v-else>
      <div class="rounded-lg white ma-0 mb-3">
        <div class="col-12 col-md-12 pa-0">
          <h3 class="pa-3">ค้นหาหวย</h3>
          <v-divider></v-divider>
          <div class="d-flex">
            <div class="col-4 rounded-lg white">
              ชื่อหวยที่จ้องการค้นหา
              <div class="col-12" style="padding: 10px 0 !important">
                <v-text-field
                  dense
                  solo-inverted
                  hide-details="auto"
                  label="ค้นหา"
                  v-model="inputTitle"
                  class="mb-3"
                ></v-text-field>
              </div>
            </div>
            <div class="col rounded-lg white">
              สถานะหวยที่ต้องการค้นหา
              <v-radio-group
                hide-details="auto"
                class="my-3"
                v-model="inputStatus"
                row
                style="padding: 15px 0 !important"
              >
                <v-radio label="ทั้งหมด" value="All"></v-radio>
                <v-radio label="เปิด" value="true"></v-radio>
                <v-radio label="ปิด" value="false"></v-radio>
                <!-- {{ inputStatus }} -->
                <v-btn
                  color="primary"
                  @click="searchdata()"
                  rounded
                  class="btn_search"
                >
                  <v-icon left>mdi-magnify</v-icon> ค้นหา
                </v-btn>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="white rounded-lg mt-2">
        <div class="rounded-lg white">
          <v-data-table
            hide-default-footer
            :headers="headerOnOff"
            :loading="isLoading"
            :server-items-length="pagination.total"
            :items="itemtypeaward.data"
            :page.sync="pagination.page"
            :items-per-page.sync="pagination.itemsPerPage"
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
            <template #[`item.no`]="{ index }">
              {{
                pagination.itemsPerPage * (pagination.page - 1) + (index + 1)
              }}
            </template>
            <template #[`item.self_status`]="{ item }">
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

            <template #[`item.actions`]="{ item }">
              <v-btn
                dark
                color="warning"
                class="btn_edit text--white"
                rounded
                small
                @click="configStatus(item)"
                ><v-icon left>mdi-pencil</v-icon> จัดการสถานะ</v-btn
              >
            </template>
          </v-data-table>
          <v-row align="baseline" class="ma-3">
            <v-col cols="12" sm="2" lg="2" xl="1">
              <v-select
                outlined
                hide-details="auto "
                dense
                @change="changepagesize"
                v-model="pagination.itemsPerPage"
                :items="pageSizes"
                label="รายการต่อหน้า"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="10" lg="10">
              <v-pagination
                v-model="pagination.page"
                @input="handlePageChange(pagination.page)"
                :total-visible="7"
                :length="Math.ceil(pagination.total / pagination.itemsPerPage)"
              ></v-pagination>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <!-- edit modal card-->
    <!-- TODO : change after edit -->
    <!-- TODO : change and cancel button -->
    <v-dialog v-model="dialogConfig" max-width="300">
      <v-card class="pa-3">
        <v-card-title class="justify-center font-weight-bold"
          >จัดการสถานะ</v-card-title
        >
        <div class="elevation-3 rounded-lg pa-3">
          <v-text-field
            :value="editItem.title"
            disabled
            filled
            hide-details="auto"
            dense
            label="ชื่อหวย"
          ></v-text-field>
          <div class="d-column mt-2">
            สถานะ
            <v-switch
              v-model="editItem.self_status"
              hide-details="auto"
            ></v-switch>
          </div>
        </div>

        <!-- button -->
        <v-card-actions class="justify-center">
          <v-btn
            color="success"
            :loading="loading_btn"
            @click="updatesatatus(editItem)"
            >แก้ไข</v-btn
          >
          <v-btn color="error" @click="dialogConfig = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
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
      pageSizes: [5, 10, 15, 25],
      inputTitle: "",
      inputStatus: "All",
      isLoading: false,
      editItem: {},
      row: "",
      select2Date: false,
      dialogConfig: false,
      headerOnOff: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "80px",
          sortable: false,
        },
        {
          text: "ชื่อ",
          value: "title",
          class: "font-weight-bold",
          align: "left",
        },
        {
          text: "สถานะการใช้งาน",
          value: "self_status",
          class: "font-weight-bold",
          align: "center",
          width: "180px",
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          class: "font-weight-bold",
          align: "center",
          width: "200px",
          sortable: false,
        },
      ],
      pagination: {
        page: 1,
        itemsPerPage: 10,
        total: 0,
      },
      itemtypeaward: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: "",
      },
    };
  },
  watch: {
    inputStatus(val) {
      if (val) {
        this.searchdata();
      }
    },
  },
  async fetch() {
    this.isLoading = true;
    this.getListOnof();
  },
  methods: {
    ...mapActions("seller", [
      "getAllsetting",
      "changeStaussetting",
      "getSettingByPage",
    ]),
    searchdata() {
      this.pagination.page = 1;
      this.getListOnof();
    },
    getParameter() {
      let param = {
        currentPage: this.pagination.page,
        limit: this.pagination.itemsPerPage,
        title:
          this.inputTitle.length <= 0 || !this.inputTitle
            ? undefined
            : this.inputTitle,
        self_status: this.inputStatus === "All" ? undefined : this.inputStatus,
      };
      return param;
    },
    changepagesize(value) {
      this.pagination.page = 1;
      this.pagination.itemsPerPage = value;
      this.getListOnof();
    },
    handlePageChange(size) {
      this.pagination.page = size;
      this.getListOnof();
    },
    async getListOnof() {
      try {
        let param = this.getParameter();
        const { data } = await this.getSettingByPage(param);
        this.itemtypeaward = data.result;
        this.pagination.total = this.itemtypeaward.total;
        console.log(this.itemtypeaward, "result");

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async configStatus(item) {
      this.editItem = Object.assign({}, item);
      this.dialogConfig = true;
    },
    async updatesatatus(item) {
      this.loading_btn = true;
      try {
        await this.changeStaussetting(item);
        this.loading_btn = false;
        this.dialogConfig = false;
        this.$fetch();
      } catch (error) {
        this.loading_btn = false;
        console.log(error);
      }
    },
  },
};
</script>
