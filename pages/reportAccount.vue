<template>
  <div>
    <h2>
      รายการสมาชิก
      <span class="font-weight-bold primary--text" v-if="thisUser != ''">
        - {{ thisUser }}</span
      >
    </h2>
    <div v-if="isLoader"><loading-page></loading-page></div>
    <div>
      <v-btn
        color="red back_btn"
        class="ma-3"
        @click="backPrevpath()"
        v-show="showBackbtn()"
        rounded
        :loading="loading_btn"
        small
        dark
        ><v-icon left>mdi-arrow-left-drop-circle</v-icon> ย้อนกลับ</v-btn
      >
      <div class="white rounded-lg mt-3">
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

          <template #[`item.no`]="{ index }"> {{ index + 1 }}</template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              color="black white--text"
              small
              rounded
              @click="viewOther(item, 'viewAgent')"
              :disabled="item.level == 6"
            >
              ดูรายชื่อใน {{ item.position }}</v-btn
            >
            <v-btn
              color="black white--text"
              small
              v-if="item.level >= 3 && $store.state.auth.level != 3"
              rounded
              @click="viewOther(item, 'viewMember')"
              :disabled="item.level == 6"
            >
              ดูรายชื่อ Member</v-btn
            ></template
          >
          <template #[`item.toggle`]="{ item}">
            <v-switch
              v-model="item.status"
              color="success"
              inset
              :label="item.status ? 'ON' : 'OFF'"
            ></v-switch>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
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
              :length="
                Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </div>

      <div
        class="mt-5 white"
        v-show="$store.state.auth.level >= 3 && memberRender.length > 0"
      >
        <h3 class="pa-3">
          รายการ member ใน {{ this.$store.state.auth.username }}
        </h3>
        <v-data-table
          :options.sync="optionsMember"
          :headers="headertable()"
          :items="memberRender"
          :server-items-length="paginationMember.rowsNumber"
          :items-per-page.sync="paginationMember.rowsPerPage"
          :page.sync="paginationMember.page"
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

          <template #[`item.no`]="{ index }"> {{ index + 1 }}</template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              color="black white--text"
              small
              rounded
              @click="viewOther(item, 'viewAgent')"
              :disabled="item.level == 6"
            >
              ดูรายการสมาชิกใน{{ item.position }}</v-btn
            >
            <v-btn
              color="black white--text"
              small
              v-if="item.level >= 3"
              rounded
              @click="viewOther(item, 'viewMember')"
              :disabled="item.level == 6"
            >
              ดูรายชื่อ Member</v-btn
            ></template
          >
          <template #[`item.toggle`]="{ item }">
            <v-switch
              v-model="item.status"
              color="success"
              inset
              :label="item.status ? 'ON' : 'OFF'"
            ></v-switch>
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3">
          <v-col cols="12" sm="2" lg="2" xl="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="paginationMember.rowsPerPage"
              :items="pageSizes"
              @change="handlePageSizeChangeMember"
              label="รายการต่อหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="10">
            <v-pagination
              v-model="paginationMember.page"
              :total-visible="7"
              :length="
                Math.ceil(
                  paginationMember.rowsNumber / paginationMember.rowsPerPage
                )
              "
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
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
      switch1: false,
      switch: [],
      Backbtn: false,
      getPrevPath: [],
      loading_btn: false,
      optionsMember: {},
      memberRender: [],
      typeForRender: "viewAgent",
      prevUser: null,
      isLoader: false,
      pageSizes: [5, 10, 15, 25],
      options: {},
      thisUser: this.$store.state.auth.username,
      currentUser: "",
      accountRendering: [],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0,
      },
      paginationMember: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0,
      },
      headerAccount: [
        {
          text: "ลำดับ",
          value: "no",
          class: "font-weight-bold",
          align: "center",
          width: "100px",
          cellClass: "font-weight-bold",
          sortable: false,
        },
        {
          text: "Username",
          value: "username",
          class: "font-weight-bold",
          cellClass: "primary--text font-weight-bold",
          align: "center",
          sortable: false,
        },
        {
          text: "ระดับตำเเหน่ง",
          value: "position",
          align: "center",
          sortable: false,
        },
        {
          text: "การดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
        {
          text: "สถานะ",
          value: "toggle",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  async fetch() {
    sessionStorage.removeItem("pathPrev");
    sessionStorage.removeItem("userPrev");
    this.thisUser = this.$store.state.auth.username;
    //  this.getMember();
    if (this.$store.state.auth.level >= 3) {
      this.getMemberUserbylevel3();
    }
  },
  watch: {
    options: {
      async handler() {
        var member;
        if (this.typeForRender === "viewAgent") {
          await this.getMember(this.thisUser);
        } else if (this.typeForRender === "viewMember") {
          await this.getMemberByuser(this.thisUser);
        }
      },
      deep: true,
    },
  },
  async mounted() {
    sessionStorage.removeItem("pathPrev");
    sessionStorage.removeItem("userPrev");
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    showBackbtn() {
      if (
        (!sessionStorage.getItem("userPrev") && this.thisUser == "") ||
        this.thisUser == this.$store.state.auth.username
      ) {
        return false;
      } else {
        return true;
      }
    },
    ...mapActions("report", ["getAccountReport", "getMemberReportByUser"]),
    getParameter(value) {
      let params = {
        username: value,
        currentPage: this.pagination.page,
        limit: this.pagination.rowsPerPage,
      };
      return params;
    },
    async getMember(item) {
      this.isLoader = true;
      let params = undefined;
      if (!item) {
        params = this.getParameter();
      } else {
        params = this.getParameter(item);
      }
      try {
        let { result } = await this.getAccountReport(params);

        this.accountRendering = result.data;
        this.pagination.rowsNumber = result.total;

        this.isLoader = false;
      } catch (error) {
        console.log(error);
        this.isLoader = false;
      }
      if (!item) {
        this.thisUser = "";
      } else {
        this.thisUser = item;
      }
      // console.log(this.accountRendering);
      this.accountRendering.forEach(x => {
        x.status = false
      });
      // console.log(this.accountRendering);

      // for (const element of this.accountRendering) {
      //   this.switch.push( { id: element.user_id,status: false} )
      //   console.log(element.user_id.toString())
      // }
      console.log(this.switch);
      this.isLoader = false;
      this.loading_btn = false;
    },

    async getMemberByuser(item) {
      this.isLoader = true;
      let params = undefined;
      params = this.getParameter(item);

      let { result } = await this.getMemberReportByUser(params);
      this.accountRendering = result.data;
      this.pagination.rowsNumber = result.total;
      if (!item) {
        this.thisUser = "";
      } else {
        this.thisUser = item;
      }
      // console.log(this.thisUser);
      this.isLoader = false;
      this.loading_btn = false;
    },
    getParameterByMember() {
      let params = {
        username: this.$store.state.auth.username,
        currentPage: this.paginationMember.page,
        limit: this.paginationMember.rowsPerPage,
      };
      return params;
    },
    async getMemberUserbylevel3() {
      console.log("sasd");
      let params = undefined;
      params = this.getParameterByMember();

      let { result } = await this.getMemberReportByUser(params);

      this.memberRender = result.data;
      this.paginationMember.rowsNumber = result.total;
      this.isLoader = false;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getMember(this.thisUser);
    },
    handlePageSizeChangeMember(size) {
      this.paginationMember.page = 1;
      this.paginationMember.rowsPerPage = size;
      this.getMemberUserbylevel3();
    },
    async viewOther(item, type) {
      this.thisUser = item.username;
      if (type == "viewAgent") {
        await this.getMember(item.username);
      } else if (type == "viewMember") {
        await this.getMemberByuser(item.username);
      }

      if (
        !sessionStorage.getItem(`userPrev`) ||
        JSON.parse(sessionStorage.getItem(`userPrev`)).length <= 0
      ) {
        this.prevUser = this.$store.state.auth.username;
        let form_path = [
          { username: this.$store.state.auth.username },
          { username: item.username },
        ];
        sessionStorage.setItem(`userPrev`, JSON.stringify(form_path));
      } else {
        let form_path = JSON.parse(sessionStorage.getItem("userPrev"));
        form_path.push({ username: this.thisUser });
        sessionStorage.setItem(`userPrev`, JSON.stringify(form_path));
      }
      await this.showBackbtn();
    },
    headertable() {
      return this.headerAccount;
    },
    async backPrevpath() {
      this.loading_btn = true;
      const form_path = JSON.parse(sessionStorage.getItem("userPrev"));
      const prevUsers = form_path.slice(0, form_path.length - 1);
      let userdata = prevUsers[prevUsers.length - 1];
      if (userdata) {
        this.getMember(userdata.username);
      } else {
        this.getMember(form_path[0]?.username);
      }

      sessionStorage.setItem("userPrev", JSON.stringify(prevUsers));
      this.loading_btn = false;
    },
  },
};
</script>

<style></style>
