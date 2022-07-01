<template>
  <div>
    <h2>
      เปิดปิดหวยในสายงาน
      <span class="purple--text" v-show="$route.query.username">
        - {{ $route.query.username }}</span
      >
    </h2>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <div v-else>
      <div class="white rounded-lg mt-2" v-if="!this.$route.query.username">
        <div class="col-12 col-md-6 row my-3">
          <v-text-field
            v-model="search"
            label="ค้นหาชื่อในสายงาน"
            class="m-4 mx-3"
            outlined
            dense
            hide-details="auto"
          ></v-text-field>
          <v-btn
            color="primary"
            @click="searchdata()"
            rounded
            class="btn_search"
          >
            <v-icon left>mdi-magnify</v-icon> ค้นหา
          </v-btn>
        </div>

        <div class="rounded-lg white">
          <v-data-table
            hide-default-footer
            :search="search"
            :paginations.sync="pagination"
            :headers="headerOnOff"
            :items="itemtypeaward.data"
            :page.sync="pagination.page"
            :items-per-page.sync="pagination.itemsPerPage"
            :loading="isLoading"
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
            <template #[`item.actions`]="{ item }">
              <v-btn
                class="btn_edit white--text"
                rounded
                small
                @click="showdetial(item)"
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
                :total-visible="7"
                :length="Math.ceil(pagination.total / pagination.itemsPerPage)"
                @input="handlePageChange(pagination.page)"
              ></v-pagination>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="white rounded-lg" v-else>
        <category-byuser></category-byuser>
      </div>
    </div>

    <!-- edit modal card-->
    <!-- TODO : change after edit -->
    <!-- TODO : change and cancel button -->
    <v-dialog v-model="dialogConfig" max-width="600">
      <v-card class="pa-3">
        <v-card-title class="justify-center">จัดการสถานะ</v-card-title>
        <div class="elevation-3 rounded-lg pa-3">
          <v-text-field
            :value="editItem.title"
            disabled
            filled
            dense
            label="ชื่อหวย"
          ></v-text-field>
          <div class="mt-2 d-column">
            self_status
            <v-switch
              v-model="editItem.self_status"
              hide-details="auto"
            ></v-switch>
          </div>
        </div>
        <!-- button -->
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="updatesatatus(editItem)">แก้ไข</v-btn>
          <v-btn color="error" @click="dialogConfig = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../../components/form/LoadingPage.vue";
import CategoryByuser from "../../components/onOfflotto/CategoryByuser.vue";
export default {
  components: { CategoryByuser, LoadingPage },
  data() {
    return {
      search: "",
      pagination: {},
      pageSizes: [5, 10, 15, 25],
      pagination: {
        page: 1,
        itemsPerPage: 10,
        total: 0,
      },
      itemdetail: [],
      isLoading: false,
      dataDetail: [],
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
        },
        {
          text: "ชื่อ",
          value: "username",
          class: "font-weight-bold",
          align: "left",
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          class: "font-weight-bold",
          align: "center",
          width: "200px",
        },
      ],

      itemtypeaward: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: "",
      },
    };
  },
  async fetch() {
    this.getDataInfo();
  },
  methods: {
    ...mapActions("seller", [
      "getLottoDownlineFilter",
      "changeStaussetting",
      "getTypeByJser",
    ]),
    searchdata() {
      this.pagination.page = 1;
      this.getDataInfo();
    },

    getParameter() {
      let param = {
        currentPage: this.pagination.page,
        limit: this.pagination.itemsPerPage,
        username: !this.search ? undefined : this.search,
      };
      return param;
    },
    changepagesize(value) {
      this.pagination.page = 1;
      this.pagination.itemsPerPage = value;
      this.getDataInfo();
    },
    handlePageChange(size) {
      this.pagination.page = size;
      this.getDataInfo();
    },

    async getDataInfo() {
      this.isLoading = true;
      try {
        let param = this.getParameter();
        const { data } = await this.getLottoDownlineFilter(param);
        this.isLoading = false;
        this.itemtypeaward = data.result;
        this.pagination.total = this.itemtypeaward.total;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async showdetial(data) {
      this.$router.push(`${this.$route.path}?username=${data.username}`);
      this.dataDetail = data.typecategory;
    },
    async updatesatatus(item) {
      try {
        await this.changeStaussetting(item);
        this.dialogConfig = false;
        this.$fetch();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
