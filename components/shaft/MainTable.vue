<template>
  <div>
    <div class="pa-1 rounded-lg white my-3 pa-2">
      เลือกประเภทหวย

      <v-radio-group
        hide-details="auto"
        class="my-3"
        v-model="selectType"
        row
        @change="selectCatebytype"
      >
        <v-radio
          v-for="(item, i) in this.listtype"
          :key="i"
          :label="item.title"
          :value="item.id"
        ></v-radio>
      </v-radio-group>
    </div>
    <div class="rounded-lg white" v-if="selectType != null">
      <v-data-table
        class="elevation-2"
        hide-default-footer
        :options.sync="option"
        :headers="headersdatelotto"
        :loading="isLoading"
        :items="datarender"
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
        </template>s
        <template #[`item.no`]="{index}">
          {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
        </template>
        <template #[`item.action`]="{item}">
          <v-btn rounded color="black" dark small @click="getDetail(item)"
            ><v-icon left>mdi-cog</v-icon> ตั้งค่า
          </v-btn>
        </template>
      </v-data-table>
      <v-row align="baseline" class="ma-3 ">
        <v-col cols="12" sm="2" lg="2" xl="1">
          <v-select
            outlined
            hide-details="auto "
            dense
            v-model="option.itemsPerPage"
            :items="pageSizes"
            label="รายการต่อนหน้า"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="10" lg="10">
          <v-pagination
            v-model="option.page"
            :total-visible="7"
            :length="Math.ceil(datarender.length / option.itemsPerPage)"
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
      option: {},
      pageSizes: [5, 10, 15, 25],
      isLoading: true,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
        {
          text: "ชนิดหวย",
          value: "typecategory_title",
          class: "font-weight-bold text-left",
          align: "start"
        },
        {
          text: "ดำเนินการ",
          value: "action",
          class: "font-weight-bold",
          align: "center",
          width: "300px"
        }
      ],
      datarender: [],
      selectType: null,
      filter: {
        startDate: "",
        endDate: ""
      },
      listtype: []
    };
  },
  async fetch() {
    this.isLoading = true;
    try {
      const { data } = await this.getTypelottoAll();
      this.listtype = data.result;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("shaft", ["getSellerAll"]),
    ...mapActions("flexodd", ["getTypelottoAll"]),
    getDetail(item) {
      this.$router.push(
        `${this.$route.path}?id=${item.typecategory_id}&title=${item.typecategory_title}`
      );
    },
    async selectCatebytype() {
      try {
        const { data } = await this.getSellerAll(this.selectType);
        this.datarender = data.result;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    }
  }
};
</script>
