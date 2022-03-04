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
        <v-dialog full-width v-model="modal_add" max-width="800" persistent>
          <v-card class="pa-4">
            <v-card-title class="text-h5"> List Lotto - ADD</v-card-title>
            <pre>{{ form }}</pre>

            <v-card class="pa-2">
              <v-form ref="form" v-model="validForm">
                <v-select
                  v-model="selecttype"
                  :items="typeList"
                  item-text="title"
                  item-value="id"
                  :rules="formRules.selecttype"
                  @change="rendertypecate"
                  label="ประเภทหวย"
                  outlined
                  class="col-12 col-md-6 col-lg-4"
                  dense
                  hide-details="auto"
                ></v-select>
                <v-select
                  @change="selectTitle(typeCateList, form.title)"
                  v-model="form.title"
                  :disabled="form.selecttype == ''"
                  :items="typeCateList"
                  :rules="formRules.title"
                  item-text="title"
                  item-value="title"
                  label=""
                  outlined
                  class="col-12 col-md-6 col-lg-4 my-1"
                  dense
                  placeholder="ชื่อหวย"
                  hide-details="auto"
                ></v-select>
                <div class="align-baseline align-center my-2">
                  <v-row class="ma-3">
                    <v-col cols="6" class="pa-0 align-baseline"
                      >วันที่เปิดรับ
                      <v-text-field
                        dense
                        :rules="formRules.open_day"
                        placeholder="กรุณากรอกวันที่เปิดรับ"
                        hide-details="auto"
                        outlined
                        required
                        type="number"
                        class=" col-12 col-sm-6"
                        v-model="form.open_day"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-0"
                      ><div>เวลาเปิดรับ</div>
                      <el-time-select
                        :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:59'
                        }"
                        class=""
                        :rules="formRules.open_time"
                        format="HH:mm"
                        arrow-control
                        placeholder="เวลาเปิดรับ"
                        v-model="form.open_time"
                      >
                      </el-time-select>
                    </v-col>
                    <v-col cols="6" class="pa-0  align-baseline"
                      >วันที่ปิดรับ
                      <v-text-field
                        dense
                        required
                        outlined
                        :rules="formRules.close_day"
                        placeholder="กรุณากรอกวันที่ปิดรับ"
                        hide-details="auto"
                        class=" col-12 col-sm-6"
                        type="number"
                        v-model="form.close_day"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" class="pa-0"
                      ><div>เวลาปิดรับ</div>
                      <el-time-select
                        class=""
                        :rules="formRules.close_time"
                        format="HH:mm"
                        :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:59'
                        }"
                        arrow-control
                        placeholder="เวลาปิดรับ"
                        v-model="form.close_time"
                      >
                      </el-time-select>
                    </v-col>
                    <v-col cols="6" class="pa-0  align-baseline"
                      >วันที่ออกผล
                      <v-text-field
                        dense
                        outlined
                        required
                        :rules="formRules.lotto_day"
                        placeholder="กรุณากรอกวันที่ออกผล"
                        hide-details="auto"
                        class=" col-12 col-sm-6"
                        type="number"
                        v-model="form.lotto_day"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" class="pa-0"
                      ><div>เวลาออกผล</div>
                      <el-time-select
                        :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:59'
                        }"
                        class=""
                        format="HH:mm"
                        :rules="formRules.lotto_time"
                        arrow-control
                        placeholder="เวลาออกผล"
                        v-model="form.lotto_time"
                      >
                      </el-time-select>
                    </v-col>
                  </v-row>
                  <div class="d-flex align-baseline">
                    รอบที่ออกผล :
                    <v-text-field
                      class="col-auto col-md-6 col-lg-4 mx-2"
                      dense
                      label="รอบที่ออกผล"
                      outlined
                      :rules="formRules.lotto_round"
                      v-model="form.lotto_round"
                    ></v-text-field>
                  </div>
                  <span class="font-weight-bold primary--text">ออกผลเเบบ</span>
                  <v-radio-group
                    row
                    hide-details="auto"
                    class="mb-2"
                    v-model="form.plan_type"
                  >
                    <v-radio label="รายเดือน" :value="0"></v-radio>
                    <v-radio label="รายวัน" :value="1"></v-radio>
                  </v-radio-group>
                  <div class="row">
                    <div class="col-12 col-md-8" v-if="form.plan_type == 0">
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
                    <div class="col-12 col-md-6" v-if="form.plan_type == 1">
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
                <v-btn color="success" @click="submitForm()">สร้าง</v-btn>
              </v-form>

              <!-- detail  -->
            </v-card>
          </v-card>
        </v-dialog>
        <!-- dllisttype -->
        <v-dialog max-width="600"
          ><div>
            <div class="d-flex">
              รายละเอียดตัวเลข / หวยไทย <v-spacer></v-spacer
              ><v-btn color="primary" rounded small @click="createNumprize()"
                ><v-icon>mdi-plus</v-icon>เพิ่มตัวเลข</v-btn
              >
            </div>

            <v-data-table
              :header="headerGenlotto"
              class="elevation-2 rounded-lg my-5"
            ></v-data-table></div
        ></v-dialog>
        <v-dialog full-width v-model="dlcreateNum" max-width="600">
          <v-card class="pa-4">
            <v-card-title><h4>สร้างตัวเลข</h4></v-card-title>
            <div>ชื่อหวย</div>
            <div>จำนวนตัวเลข</div>
            <div>จำนวนรางวัล</div>
          </v-card>
        </v-dialog>
      </v-container>
    </v-row>
  </v-flex>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { mapActions } from "vuex";
export default {
  components: {
    FormWizard,
    TabContent
  },
  watch: {
    typeSelect: {
      handler() {
        this.getTypeCategoryList();
      },
      deep: true
    },
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
      dlcreateNum: false,
      validForm: true,
      selecttype: "",
      formRules: {
        selecttype: [v => !!v || "Item is required"],
        title: [v => !!v || "Name is required"],
        open_day: [v => !!v || "Name is required"],
        close_day: [v => !!v || "Name is required"],
        lotto_day: [v => !!v || "Name is required"],
        lotto_round: [v => !!v || "Name is required"]
      },
      typeCateList: [],
      typedate: "0",
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
        typecategory_id: "",
        title: "",
        open_day: "",
        open_time: "00:00",
        close_day: "",
        close_time: "00:00",
        lotto_day: "",
        lotto_time: "00:00",
        plan_type: 0,
        lotto_round: "",
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
      headerGenlotto: [
        {
          text: "ชื่อหวย.",
          value: "name",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          width: "150px"
        },
        {
          text: "จำนวนตัวเลข",
          value: "number",
          filterable: false
        },
        {
          text: "จำนวนรางวัล",
          value: "amount_reward",
          filterable: false
        },
        {
          text: "สถานะ",
          align: "status",
          filterable: false,
          value: "type"
        },
        {
          text: "สร้างหวยเมื่อ",
          value: "created_at",
          filterable: false,
          width: "150px"
        },
        {
          text: "แก้ไขล่าสุด",
          value: "update_at",
          filterable: false,
          width: "150px"
        },
        {
          text: "สร้างโดย",
          value: "created_by",
          filterable: false,
          width: "150px"
        },
        {
          text: "แก้ไขโดย",
          value: "update_by",
          filterable: false,
          width: "150px"
        },
        {
          text: "ดำเนินการ",
          value: "action",
          filterable: false,
          width: "150px"
        }
      ],
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
    createNumprize() {
      this.dlcreateNum = true;
    },
    async submitForm() {
      if (!this.$refs.form.validate()) {
        return false;
      } else {
        try {
          await this.createTypeCategory(this.form);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async selectTitle(listitem, title) {
      let data = listitem.find(x => {
        return x.title === title;
      });
      console.log(data);
      this.form.typecategory_id = data.id;
    },
    async rendertypecate(value) {
      try {
        let params = {
          currentPage: 1,
          limit: 1000,
          type_id: value
        };
        let response = await this.getTypeCategory(params);

        this.typeCateList = response.result[0].lottotype_id.data;
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions("lottosetting", [
      "getTypeCategoryDetail",
      "getLottotype",
      "getTypeCategory",
      "createTypeCategory"
    ]),
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
