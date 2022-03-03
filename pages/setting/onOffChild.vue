<template>
  <v-flex>
    <div class="d-flex justify-center"><h2>เปิดปิดหวยในสายงาน</h2></div>
    <div class="white rounded-lg" v-if="!this.$route.query.username">
      <div class="rounded-lg white">
        <v-data-table
          :headers="headerOnOff"
          :items="itemtypeaward"
          :loading="isLoading"
        >
          <template #[`item.no`]="{index}">
            <!-- {{item.upline_status}} -->
            {{ index + 1 }}
          </template>
          <template #[`item.actions`]="{item}">
            <v-btn color="warning" rounded small @click="showdetial(item)"
              ><v-icon>mdi-pencil</v-icon> จัดการสถานะ</v-btn
            >
          </template>
        </v-data-table>
      </div>
    </div>
    <div class="white rounded-lg" v-else>
      <v-btn color="red" @click="$router.go(-1)" dark small class="ma-3"
        >Back</v-btn
      >
      <div class="rounded-lg white">
        <v-data-table
          :headers="headerDetail"
          :items="dataDetail"
          :loading="isLoading"
        >
          <template #[`item.no`]="{index}">
            <!-- {{item.upline_status}} -->
            {{ index + 1 }}
          </template>
          <template #[`item.actions`]="{item}">
            <v-btn color="warning" rounded small @click="configStatus(item)"
              ><v-icon>mdi-pencil</v-icon> จัดการสถานะ</v-btn
            >
          </template>
        </v-data-table>
      </div>
    </div>

    <!-- edit modal card-->
    <!-- TODO : change after edit -->
    <!-- TODO : change and cancel button -->
    <v-dialog v-model="dialogConfig" max-width="600">
      <v-card class="pa-3">
        <v-card-title class="justify-center">จัดการสถานะ</v-card-title>
        <v-text-field
          :value="editItem.title"
          disabled
          filled
          dense
          class="ma-3"
          label="ชื่อหวย"
        ></v-text-field>
        <div class="ma-3 d-column">
          self_status
          <v-switch
            v-model="editItem.self_status"
            hide-details="auto"
          ></v-switch>
        </div>
        <!-- button -->
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="updatesatatus(editItem)">แก้ไข</v-btn>
          <v-btn color="error" @click="dialogConfig = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
          width: "80px"
        },
        {
          text: "ชื่อ",
          value: "username",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          class: "font-weight-bold",
          align: "center",
          width: "200px"
        }
      ],
      headerDetail: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "80px"
        },
        {
          text: "ชื่อ",
          value: "title",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "self_status",
          value: "self_status",
          class: "font-weight-bold",
          align: "center",
          width: "180px"
        },
        {
          text: "upline_status",
          value: "upline_status",
          class: "font-weight-bold",
          align: "center",
          width: "180px"
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          class: "font-weight-bold",
          align: "center",
          width: "200px"
        }
      ],
      itemtypeaward: [
        {
          num: "4",
          id: "asd2-52gmp-mo51-3fxcwmql4611111",
          title: "ฮานอยสตาร์",
          upline_status: true
        },
        {
          num: "3",
          id: "asd2-52gmp-mo51-3fxcwmql461ps6lx",
          title: "ฮานอยสตาร์",
          upline_status: false
        }
      ],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
  async fetch() {
    this.isLoading = true;
    try {
      const { data } = await this.getLottoDownline();
      this.isLoading = false;
      this.itemtypeaward = data;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    ...mapActions("seller", ["getLottoDownline", "changeStaussetting"]),
    async configStatus(item) {
      this.editItem = item;
      this.dialogConfig = true;
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
    }
  }
};
</script>
