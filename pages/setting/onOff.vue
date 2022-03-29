<template>
  <div>
    <h2>เปิดปิดหวย</h2>

    <div class="white rounded-lg mt-2">
      <div class="rounded-lg white">
        <v-data-table
          hide-default-footer
          :options.sync="option"
          :headers="headerOnOff"
          :loading="isLoading"
          :items="itemtypeaward"
        >
          <template #[`item.no`]="{index}">
            {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
          </template>
          <template #[`item.self_status`]="{item}">
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

          <template #[`item.actions`]="{item}">
            <v-btn color="warning" rounded small @click="configStatus(item)"
              ><v-icon>mdi-pencil</v-icon> จัดการสถานะ</v-btn
            >
          </template>
        </v-data-table>
        <v-row align="baseline" class="ma-3 ">
          <v-col cols="12" sm="2" lg="1">
            <v-select
              outlined
              hide-details="auto "
              dense
              v-model="option.itemsPerPage"
              :items="pageSizes"
              label="รายการต่อนหน้า"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="10" lg="11">
            <v-pagination
              v-model="option.page"
              :total-visible="7"
              :length="Math.ceil(itemtypeaward.length / option.itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- edit modal card-->
    <!-- TODO : change after edit -->
    <!-- TODO : change and cancel button -->
    <v-dialog v-model="dialogConfig" max-width="300">
      <v-card class="pa-3">
        <v-card-title class="justify-center font-weight-bold">จัดการสถานะ</v-card-title>
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
          <v-btn color="success" @click="updatesatatus(editItem)">แก้ไข</v-btn>
          <v-btn color="error" @click="dialogConfig = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      option: {},
      pageSizes: [5, 10, 15, 25],
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
          width: "80px"
        },
        {
          text: "ชื่อ",
          value: "title",
          class: "font-weight-bold",
          align: "left"
        },
        {
          text: "สถานะการใช้งาน",
          value: "self_status",
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
      itemtypeaward: [],
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
      const { data } = await this.getAllsetting();

      this.itemtypeaward = data.result;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("seller", ["getAllsetting", "changeStaussetting"]),
    async configStatus(item) {
      this.editItem = Object.assign({}, item);
      this.dialogConfig = true;
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
