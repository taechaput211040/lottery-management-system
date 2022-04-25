<template>
  <div>
    <h2>
      รายการสมาชิก
      <span class="font-weight-bold primary--text" v-if="thisUser != ''">
        - {{ thisUser }}</span
      >
    </h2>
    <div v-if="isLoading"><loading-page></loading-page></div>
    <div v-else class="white rounded-lg mt-3">
      <v-btn
        color="red back_btn"
        class="ma-3"
        @click="backPrevpath()"
        v-if="showBackbtn()"
        rounded
        small
        dark
        ><v-icon left>mdi-arrow-left-drop-circle</v-icon> ย้อนกลับ</v-btn
      >
      <v-data-table
        :options.sync="options"
        :headers="headertable()"
        :items="accountRendering"
        :server-items-length="pagination.rowsNumber"
        :items-per-page.sync="pagination.rowsPerPage"
        :page.sync="pagination.page"
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

        <template #[`item.no`]="{index}"> {{ index + 1 }}</template>
        <template #[`item.actions`]="{item}">
          <v-btn
            color="black white--text"
            small
            rounded
            @click="viewOther(item)"
            :disabled="item.level == 6"
          >
            ดูรายการสมาชิกใน{{ item.position }}</v-btn
          ></template
        >
      </v-data-table>
      <v-row align="baseline" class="ma-3 ">
        <v-col cols="12" sm="2" lg="2" xl="1">
          <v-select
            outlined
            hide-details="auto "
            dense
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
            :length="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../components/form/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      prevUser: null,
      isLoading: false,
      pageSizes: [5, 10, 15, 25],
      options: {},
      thisUser: "",
      currentUser: "",
      accountRendering: [],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      headerAccount: [
        {
          text: "ลำดับ",
          value: "no",
          class: "font-weight-bold",
          align: "center",
          width: "100px",
          cellClass: "font-weight-bold",
          sortable: false
        },
        {
          text: "Username",
          value: "username",
          class: "font-weight-bold",
          cellClass: "primary--text font-weight-bold",
          align: "center",
          sortable: false
        },
        {
          text: "ระดับตำเเหน่ง",
          value: "position",
          align: "center",
          sortable: false
        },
        {
          text: "การดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ]
    };
  },

  async fetch() {
    sessionStorage.removeItem("pathPrev");
    sessionStorage.removeItem("userPrev");

    this.getMember();
  },
  watch: {
    options: {
      async handler() {
        await this.getMember(this.thisUser);
      },
      deep: true
    }
  },
  methods: {
    showBackbtn() {
      if (
        !sessionStorage.getItem("userPrev") ||
        JSON.parse(sessionStorage.getItem("userPrev")).length <= 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ...mapActions("report", ["getAccountReport"]),
    getParameter(value) {
      let params = {
        username: value,
        currentPage: this.pagination.page,
        limit: this.pagination.rowsPerPage
      };
      return params;
    },
    async getMember(item) {
      let params = undefined;
      if (!item) {
        params = this.getParameter();
      } else {
        params = this.getParameter(item);
      }

      let { result } = await this.getAccountReport(params);

      this.accountRendering = result.data;
      this.pagination.rowsNumber = result.total;
      if (!item) {
        this.thisUser = "";
      } else {
        this.thisUser = item;
      }
      this.isLoading = false;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getMember(this.thisUser);
    },
    async viewOther(item) {
      this.isLoading = true;
      this.thisUser = item.username;
      this.getMember(item.username);
      if (
        !sessionStorage.getItem(`userPrev`) ||
        JSON.parse(sessionStorage.getItem(`userPrev`)).length <= 0
      ) {
        this.prevUser = this.$store.state.auth.username;
        let form_path = [
          { username: this.$store.state.auth.username },
          { username: item.username }
        ];
        sessionStorage.setItem(`userPrev`, JSON.stringify(form_path));
      } else {
        let form_path = JSON.parse(sessionStorage.getItem("userPrev"));
        form_path.push({ username: this.thisUser });
        sessionStorage.setItem(`userPrev`, JSON.stringify(form_path));
      }
    },
    headertable() {
      return this.headerAccount;
    },
    async backPrevpath() {
      const form_path = JSON.parse(sessionStorage.getItem("userPrev"));
      const prevUsers = form_path.slice(0, form_path.length - 1);
      let userdata = prevUsers[prevUsers.length - 1];
      if (userdata) {
        this.getMember(userdata.username);
      } else {
        this.getMember(form_path[0]?.username);
      }
      console.log("form", form_path.length - 1);
      console.log("prev", prevUsers.length);
      sessionStorage.setItem("userPrev", JSON.stringify(prevUsers));
    }
  }
};
</script>

<style></style>
