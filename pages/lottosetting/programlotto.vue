<template>
  <v-flex>
    <v-row>
      <v-container>
        <h1 class="mt-2">Program Lotto List</h1>

        <div class="ma-2 pa-6 white rounded-lg">
          <v-row class="select-item "
            ><v-select class="col-6 col-md-2" label="Type Category"></v-select>
            <v-text-field
              dense
              solo-inverted
              label="Title"
              required
              class="col-6 col-md-3"
              ><v-btn slot="append" color="success" fab dark x-small>
                <v-icon>mdi-magnify</v-icon></v-btn
              ></v-text-field
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded dark @click="modal_add = true">
              <v-icon>mdi-plus</v-icon>add</v-btn
            ></v-row
          >
          <v-card class="mx-auto mt-5 justify-center classtable">
            <v-data-table
              :server-items-length="pagination.rowsNumber"
              :items-per-page.sync="pagination.rowsPerPage"
              :page.sync="pagination.page"
              :headers="headers"
              :items="itemexample"
              :options.sync="options"
              hide-default-footer
              :loading="isLoading"
            >
              <template #[`item.no`]="{index}">
                {{
                  pagination.rowsPerPage * (pagination.page - 1) + (index + 1)
                }}
              </template>
              <template #[`item.action`]>
                <v-btn class="mx-auto" fab dark x-small color="warning">
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <template #[`item.type`]="{item}">
                <span v-if="item.TypeCategory_Id">{{
                  item.TypeCategory_Id.LottoType_Id.title
                }}</span>
              </template>
              <template #[`item.status`]="{item}">
                <v-chip
                  v-if="item.status == 1"
                  class="ma-2"
                  color="success"
                  outlined
                >
                  <v-icon left>
                    mdi-circle
                  </v-icon>
                  active
                </v-chip>
                <v-chip
                  v-if="item.status == 0"
                  class="ma-2"
                  color="error"
                  outlined
                >
                  <v-icon left>
                    mdi-circle
                  </v-icon>
                  unactive
                </v-chip>
              </template>
              <template #[`item.permaxbet`]="{item}">
                {{ item.permaxbet }} %
              </template></v-data-table
            >
          </v-card>
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
        <v-dialog full-width v-model="modal_add" max-width="800">
          <v-card class="pa-4">
            <v-card-title class="text-h5"> List Lotto - ADD</v-card-title>
            <v-card class="pa-2">
              <v-form>
                <v-select
                  v-model="form.selecttype"
                  :items="typeList"
                  item-text="title"
                  item-value="id"
                  label="ประเภทหวย"
                  outlined
                  class="col-12 col-md-6 col-lg-4"
                  dense
                  hide-details="auto"
                ></v-select>
                <v-select
                  v-model="form.title"
                  item-text="title"
                  item-value="title"
                  label=""
                  outlined
                  class="col-12 col-md-6 col-lg-4 my-1"
                  dense
                  placeholder="ชื่อหวย"
                  hide-details="auto"
                ></v-select>
                <div class="align-baseline align-center mt-2">
                  <v-row class="ma-3">
                    <v-col cols="6" class="pa-0">วันที่เปิดรับ</v-col>
                    <v-col cols="6" class="pa-0">เวลาเปิดรับ</v-col>
                    <v-col cols="6" class="pa-0">วันที่ปิดรับ</v-col>
                    <v-col cols="6" class="pa-0">เวลาปิดรับ</v-col>
                    <v-col cols="6" class="pa-0">วันที่ออกผล</v-col>
                    <v-col cols="6" class="pa-0">เวลาออกผล</v-col>
                  </v-row>
                  <div class="d-flex align-baseline">
                    รอบที่ออกผล :
                    <v-text-field
                      class="col-auto col-md-6 col-lg-4 mx-2"
                      dense
                      label="รอบที่ออกผล"
                      outlined
                    ></v-text-field>
                  </div>
                  <span class="font-weight-bold primary--text">ออกผลเเบบ</span>
                  <v-radio-group
                    row
                    hide-details="auto"
                    class="mb-2"
                    v-model="typedate"
                  >
                    <v-radio label="รายเดือน" value="mounth"></v-radio>
                    <v-radio label="รายวัน" value="day"></v-radio>
                  </v-radio-group>
                  <div class="row">
                    <div class="col-12 col-md-8" v-if="typedate == 'day'">
                      <span class="primary--text font-weight-bold"
                        >เดือนที่ออกผล</span
                      >
                      <div class="row">
                        <div class="col-6">
                          <v-checkbox
                            hide-details="auto"
                            v-model="form.jan"
                            label="มกราคม"
                          ></v-checkbox>
                          <v-checkbox
                            label="กุมภาพันธ์"
                            v-model="form.feb"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="มีนาคม"
                            v-model="form.mar"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="เมษายน"
                            v-model="form.apr"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="พฤษภาคม"
                            v-model="form.may"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="มิถุนายน"
                            v-model="form.jun"
                            hide-details="auto"
                          ></v-checkbox>
                        </div>
                        <div class="col-6">
                          <v-checkbox
                            label="กรกฎาคม"
                            v-model="form.jul"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="สิงหาคม"
                            v-model="form.aug"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="กันยายน"
                            v-model="form.sep"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="ตุลาคม"
                            v-model="form.oct"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="พฤศจิกายน"
                            v-model="form.nov"
                            hide-details="auto"
                          ></v-checkbox>
                          <v-checkbox
                            label="ธันวาคม"
                            v-model="form.dec"
                            hide-details="auto"
                          ></v-checkbox>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6" v-if="typedate == 'mounth'">
                      <span class="purple--text font-weight-bold"
                        >วันที่ออกผล</span
                      >
                      <v-checkbox
                        hide-details="auto"
                        v-model="form.monday"
                        label="วันจันทร์"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.tuesday"
                        label="วันอังคาร"
                        hide-details="auto"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.wednesday"
                        label="วันพุธ"
                        hide-details="auto"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.thursday"
                        label="วันพฤหัสบดี"
                        hide-details="auto"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.friday"
                        label="วันศุกร์"
                        hide-details="auto"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.saturday"
                        label="วันเสาร์"
                        hide-details="auto"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.sunday"
                        label="วันอาทิตย์"
                        hide-details="auto"
                      ></v-checkbox>
                    </div>
                  </div>
                </div>
              </v-form>
              <v-card-actions class="justify-center">
                <v-btn color="primary" dark @click="modal_add = false"
                  >บันทึก</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-card>
        </v-dialog>
      </v-container>
    </v-row>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  watch: {
    typedate(newVal, oldVal) {
      if (newVal) {
        this.form = {
          jan: false,
          feb: false,
          mar: false,
          apr: false,
          may: false,
          jun: false,
          jul: false,
          aug: false,
          sep: false,
          oct: false,
          nov: false,
          dec: false
        };
      }
    }
  },
  data() {
    return {
      typedate: "mounth",
      typeList: [],
      isLoading: false,
      pageSizes: [5, 10, 15, 25],
      options: {},
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      dataEdit: [],
      modal_edit: false,
      select_status: "inactive",
      modal_add: false,
      form: {
        selecttype: "",
        typecategory_id: "",
        title: "",
        open_day: 0,
        open_time: "15:20",
        close_day: 0,
        close_time: "15:30",
        lotto_day: 0,
        lotto_time: "15:20",
        plan_type: 0,
        lotto_round: "รอบเดียว",
        status: 0,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        jan: false,
        feb: false,
        mar: false,
        apr: false,
        may: false,
        jun: false,
        jul: false,
        aug: false,
        sep: false,
        oct: false,
        nov: false,
        dec: false
      },
      headers: [
        {
          text: "No.",
          value: "no",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "150px"
        },
        {
          text: "ชื่อหวย",
          align: "center",
          filterable: false,
          value: "title"
        },
        {
          text: "รอบหวย",
          value: "lotto_round",
          filterable: false
        },
        {
          text: "ประเภทหวย",
          align: "center",
          filterable: false,
          value: "type"
        },
        {
          text: "สถานะ",
          align: "center",
          filterable: false,
          value: "status",
          width: "150px"
        },

        { text: "Action", value: "action", align: "center" }
      ],
      itemexample: []
    };
  },

  watch: {
    options: {
      async handler() {
        await this.getdataRender();
      },
      deep: true
    }
  },
  async mounted() {
    this.getdataRender();
    this.gettypelist();
  },

  methods: {
    ...mapActions("lottosetting", ["getTypeCategoryDetail", "getLottotype"]),
    async gettypelist() {
      try {
        let response = await this.getLottotype();
        console.log(response);
        this.typeList = response.result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getdataRender() {
      this.isLoading = true;
      try {
        let params = {
          currentPage: this.pagination.page,
          limit: this.pagination.rowsPerPage
        };
        const response = await this.getTypeCategoryDetail(params);
        this.itemexample = response.result[0].data;
        this.pagination.rowsNumber = response.result[0].total;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    showdetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    },
    addstatus() {},
    openEdit(data) {
      this.dataEdit = data;
      this.modal_edit = true;
    },
    async handlePageSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = size;
      this.getdataRender();
    }
  }
};
</script>

<style></style>
