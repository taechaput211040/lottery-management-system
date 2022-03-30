<template>
  <div>
    <h2>
      รายการสมาชิก
      <span class="font-weight-bold primary--text" v-if="thisUser != ''">
        - {{ thisUser }}</span
      >
    </h2>
    <div class="white rounded-lg mt-3">
      <v-btn
        color="red"
        class="ma-3"
        @click="backPrevpath()"
        v-if="showBackbtn()"
        small
        dark
        ><v-icon left>mdi-code-less-than</v-icon> ย้อนกลับ</v-btn
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
          <v-btn color="black" dark small rounded @click="viewOther(item)"
            >ดูรายการสมาชิกใน{{ item.position }}</v-btn
          ></template
        >
      </v-data-table>
      <v-row align="baseline" class="ma-3 ">
        <v-col cols="12" sm="2" lg="1">
          <v-select
            outlined
            hide-details="auto "
            dense
            v-model="pagination.rowsPerPage"
            :items="pageSizes"
            @change="handlePageSizeChange"
            label="รายการต่อนหน้า"
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
      pageSizes: [5, 10, 15, 25],
      options: {},
      thisUser: "",
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
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getMember(this.thisUser);
    },
    async viewOther(item) {
      this.thisUser = item.username;
      if (!sessionStorage.getItem("userPrev")) {
        sessionStorage.setItem("userPrev", item.username);
      }
      sessionStorage.setItem("pathPrev", item.position);
      this.getMember(item.username);
    },
    backPrevpath() {
      let preavpath = sessionStorage.getItem("pathPrev");
      let userPrev = sessionStorage.getItem("userPrev");
      if (preavpath == "COMPANY") {
        sessionStorage.removeItem("pathPrev");
        this.getMember();
      } else if (preavpath == "AGENT") {
        sessionStorage.removeItem("pathPrev");
        sessionStorage.removeItem("userPrev");
        if (this.$store.state.auth.role == "COMPANY") {
          this.getMember();
        } else {
          sessionStorage.setItem("pathPrev", "COMPANY");
          this.getMember(userPrev);
        }
      }
    },
    showBackbtn() {
      if (
        !sessionStorage.getItem("userPrev") &&
        !sessionStorage.getItem("pathPrev")
      ) {
        return false;
      } else {
        return true;
      }
    },
    headertable() {
      let pathPrev = sessionStorage.getItem("pathPrev");
      if (pathPrev === "AGENT") {
        let header = [
          {
            text: "ลำดับ",
            value: "no",
            class: "font-weight-bold",
            align: "center",
            width: "100px"
          },
          {
            text: "แก้ไขเลขอั้น",
            value: "username",
            class: "font-weight-bold",
            cellClass: "primary--text font-weight-bold",
            align: "center"
          },
          {
            text: "ระดับตำเเหน่ง",
            value: "position",
            align: "center"
          }
        ];
        return header;
      } else {
        return this.headerAccount;
      }
    }
  }
};
</script>

<style></style>
