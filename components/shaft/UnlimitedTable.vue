<template>
  <div class="">
    <div class="d-flex align-baseline">
      <v-btn color="red" @click="$router.go(-1)" small dark
        ><v-icon left>mdi-code-less-than</v-icon> ย้อนกลับ</v-btn
      >
      <h3 class="font-weight-bold my-4">
        <span class="purple--text ">{{ this.$route.query.title }}</span> :
        <span class="error--text ">{{ this.$route.query.typename }}</span>
      </h3>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="openadd_limited()"
        ><v-icon>mdi-plus</v-icon>เพิ่มเลขอั้น</v-btn
      >
    </div>
    <div class="rounded-lg white">
      <v-data-table
        class="elevation-2"
        hide-default-footer
        :options.sync="option"
        :headers="headersunlimited"
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
        </template>
        <template #[`item.no`]="{index}">
          {{ option.itemsPerPage * (option.page - 1) + (index + 1) }}
        </template>

        <template #[`item.action`]="{item}">
          <div class="d-flex justify-center">
            <v-btn
              rounded
              color="black"
              class="mx-1"
              dark
              small
              @click="openEdit(item)"
              ><v-icon left>mdi-cog</v-icon>แก้ไขเลขอั้น
            </v-btn>
            <v-btn
              rounded
              color="error"
              class="mx-1"
              dark
              small
              @click="deletenumber(item)"
              ><v-icon left>mdi-delete</v-icon> ลบ
            </v-btn>
          </div>
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
            label="รายการต่อหน้า"
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

    <v-dialog v-model="addlimitedDialog" persistent max-width="600px">
      <v-form ref="formlimit" v-model="valid">
        <v-card class="pa-3">
          <v-card-title class="justify-center font-weight-bold"
            >เพิ่มเลขอั้น</v-card-title
          >
          <div class="elevation-3 rounded-lg pa-3">
            <v-data-table
              :headers="headersetlimited"
              :items="inputformlimit"
              hide-default-footer
              class="elevation-1"
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
              <template #[`item.lotto_number`]="{ item }">
                <div class="pa-2">
                  <v-text-field
                    outlined
                    :rules="[
                      v => !!v || 'กรุณากรอกให้ครบถ้วน',
                      v =>
                        (v && v.length >= $route.query.number) ||
                        `กรุณากรอกหมายเลช ${$route.query.number} ตัว`
                    ]"
                    dense
                    label="เลข"
                    @keydown="e => rangeInput(e, item.lottonumber_name)"
                    :counter="$route.query.number"
                    @keypress="e => checkpositive(e)"
                    v-model="item.lottonumber_name"
                    type="number"
                  />
                </div>
              </template>
              <template #[`item.out_come_rate`]="{ item }">
                <div class="pa-2">
                  <v-text-field
                    outlined
                    :rules="[v => !!v || 'กรุณากรอกให้ครบถ้วน']"
                    dense
                    @keypress="e => checkpositive(e)"
                    label="อัตราจ่าย"
                    v-model.number="item.out_come_rate"
                    type="number"
                  />
                </div>
              </template>
              <template #[`item.self_receive_amount`]="{ item }">
                <div class="pa-2">
                  <v-text-field
                    :rules="[v => !!v || 'กรุณากรอกให้ครบถ้วน']"
                    outlined
                    @keypress="e => checkpositive(e)"
                    dense
                    label="รับของ"
                    v-model.number="item.self_receive_amount"
                    type="number"
                  />
                </div>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn
                small
                @click="addField(inputformlimit)"
                color="purple"
                dark
                rounded
                ><v-icon>mdi-plus</v-icon>กรอกเพิ่มเติม
              </v-btn>
              <v-btn
                small
                v-show="inputformlimit.length > 1"
                @click="removeField(inputformlimit)"
                color="error"
                rounded
                ><v-icon>mdi-delete</v-icon>ลบ
              </v-btn>
            </v-card-actions>
          </div>

          <v-card-actions class="mt-3 justify-center">
            <v-btn color="success" @click="submitForm()">เพิ่มเลขอั้น</v-btn>
            <v-btn color="error" @click="closeForm()">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card></v-form
      >
    </v-dialog>
    <v-dialog v-model="editlimitedDialog" persistent max-width="600px">
      <v-form ref="formlimitEdit" v-model="validEditform">
        <v-card class="pa-3">
          <v-card-title class="justify-center font-weight-bold"
            >แก้ไขเลขอั้น</v-card-title
          >

          <div class="rounded-lg elevation-3 pa-2">
            <v-text-field
              outlined
              label="เลข"
              type="number"
              dense
              @keydown="e => rangeInput(e, form.lotto_number)"
              @keypress="e => checkpositive(e)"
              :counter="$route.query.number"
              :rules="[
                v => !!v || 'กรุณากรอกให้ครบถ้วน',
                v =>
                  (v && v.length >= $route.query.number) ||
                  `กรุณากรอกหมายเลช ${$route.query.number} ตัว`
              ]"
              v-model="form.lotto_number"
            ></v-text-field>
            <v-text-field
              outlined
              @keypress="e => checkpositive(e)"
              type="number"
              :rules="[v => !!v || 'กรุณากรอกให้ครบถ้วน']"
              label="อัตราจ่าย"
              dense
              v-model.number="form.out_come_rate"
            ></v-text-field>
            <v-text-field
              outlined
              @keypress="e => checkpositive(e)"
              :rules="[v => !!v || 'กรุณากรอกให้ครบถ้วน']"
              label="รับของ"
              type="number"
              dense
              v-model.number="form.self_receive_amount"
            ></v-text-field>
          </div>
          <v-card-actions class="justify-center">
            <v-btn color="success" @click="submitUpdate()">แก้ไขเลขอั้น</v-btn>
            <v-btn color="error" @click="editlimitedDialog = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
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
      validEditform: false,
      valid: false,
      headersetlimited: [
        {
          text: "เลข",
          value: "lotto_number",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "อัตราจ่าย",
          value: "out_come_rate",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "รับของ",
          value: "self_receive_amount",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        }
      ],
      inputformlimit: [
        { lottonumber_name: "", out_come_rate: "", self_receive_amount: "" }
      ],
      form: {
        lottonumber_name: "",
        out_come_rate: "",
        self_receive_amount: ""
      },
      editlimitedDialog: false,
      addlimitedDialog: false,
      uplinedItem: [],
      isLoading: true,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersunlimited: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
        {
          text: "เลข",
          value: "lotto_number",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "อัตราจ่าย",
          value: "out_come_rate",
          class: "font-weight-bold",
          align: "center"
        },

        {
          text: "รับของ",
          value: "self_receive_amount",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "รับของปัจจุบัน",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "ดำเนินการ",
          value: "action",
          class: "font-weight-bold",
          align: "center",
          width: "200"
        }
      ],
      datarender: [],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
  async fetch() {
    this.getSelfeData();
  },
  methods: {
    async deletenumber(item) {
      console.log(item);

      try {
        this.$swal({
          title: "แน่ใจหรือไม่ว่าต้องการลบ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            await this.$axios.delete(
              "https://sm-lotto.com/v1alpha/lotto/lotto_setting_seller/api/seller/delete_limited_number/",
              {
                data: {
                  typecategory_id: this.$route.query.id,
                  lottonumbertype_id: this.$route.query.lottonumbertype_id,
                  lotto_number: item.lotto_number
                }
              }
            );
            this.$swal("ลบเรียบร้อย!", "ดำเนินการเสร็จสิ้น", "success");
            this.$fetch();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    closeEdit() {
      this.editlimitedDialog = false;
      this.$fetch();
    },
    addField(form) {
      form.push({
        lottonumber_name: "",
        out_come_rate: "",
        self_receive_amount: ""
      });
    },
    removeField(fieldType) {
      fieldType.splice(-1);
    },
    ...mapActions("shaft", [
      "getAllsettingseller",
      "getAllunlimited",
      "Addlimited",
      "deleteLimitnumber"
    ]),
    async getSelfeData() {
      this.isLoading = true;
      try {
        let params = {
          typecategory_id: this.$route.query.id,
          lottonumbertype_id: this.$route.query.lottonumbertype_id
        };
        let { data } = await this.getAllunlimited(params);
        if (data.result) {
          this.datarender = data.result;
          this.isLoading = false;
        } else {
          this.datarender = [];
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
      }
    },
    async openadd_limited() {
      this.form = {};
      this.addlimitedDialog = true;
    },
    async submitUpdate() {
      let body = {
        typecategory_id: this.$route.query.id,
        lottonumbertype_id: this.$route.query.lottonumbertype_id,
        lottonumbers: [
          {
            lottonumber_name: this.form.lotto_number,
            out_come_rate: this.form.out_come_rate,
            self_receive_amount: this.form.self_receive_amount
          }
        ]
      };
      if (this.$refs.formlimitEdit.validate()) {
        try {
          await this.Addlimited(body);
          this.editlimitedDialog = false;
          this.$fetch();
        } catch (error) {
          this.editlimitedDialog = false;
          console.log(error);
          this.$fetch();
        }
      } else {
        this.$swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");
      }
    },

    async submitForm() {
      let body = {
        typecategory_id: this.$route.query.id,
        lottonumbertype_id: this.$route.query.lottonumbertype_id,
        lottonumbers: this.inputformlimit
      };

      if (this.$refs.formlimit.validate()) {
        try {
          await this.Addlimited(body);
          this.addlimitedDialog = false;
          this.$fetch();
        } catch (error) {
          this.addlimitedDialog = false;
          console.log(error);
          this.$fetch();
        }
      } else {
        this.$swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");
      }
    },
    async closeForm() {
      this.addlimitedDialog = false;
      this.$refs.formlimit.reset();
      this.$refs.formlimit.resetValidation();
      this.inputformlimit = [
        { lottonumber_name: "", out_come_rate: "", self_receive_amount: "" }
      ];
    },
    openEdit(item) {
      console.log(item);
      this.form = Object.assign({}, item);
      this.editlimitedDialog = true;
    },
    rangeInput(self, itemmodel) {
      // console.log(itemmodel);
      if (itemmodel == undefined) {
        itemmodel = "";
      } else if (
        /[0-9]/g.test(self.key) &&
        itemmodel.length >= this.$route.query.number
      ) {
        self.preventDefault();
      }
    },
    checkpositive(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>
