<template>
  <v-flex>
    <h2>เปิดปิดหวยในสายงาน</h2>
    <div class="white rounded-lg mt-2" v-if="!this.$route.query.username">
      <div class="rounded-lg white">
        <v-data-table
          hide-default-footer
          :options.sync="option"
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
    <div class="white rounded-lg" v-else>
      <category-byuser></category-byuser>
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
import CategoryByuser from "../../components/onOfflotto/CategoryByuser.vue";
export default {
  components: { CategoryByuser },
  data() {
    return {
      option: {},
      pageSizes: [5, 10, 15, 25],
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
      const { data } = await this.getLottoDownline();
      this.isLoading = false;
      this.itemtypeaward = data.result;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
  methods: {
    ...mapActions("seller", [
      "getLottoDownline",
      "changeStaussetting",
      "getTypeByJser"
    ]),

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
