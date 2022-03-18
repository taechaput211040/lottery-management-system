<template>
  <div class="">
    <div class="d-flex align-baseline">
      <v-btn color="red" class="ma-3" small dark @click="$router.go(-1)"
        >ย้อนกลับ</v-btn
      >
      <h3 class="font-weight-bold my-4">
        <span class="purple--text "> {{ this.$route.query.title }}</span> :
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
        :headers="headersunlimited"
        :loading="isLoading"
        :items="datarender"
      >
        <template #[`item.no`]="{index}">
          {{ index + 1 }}
        </template>

        <template #[`item.action`]="{item}">
          <v-btn rounded color="black" dark small @click="openEdit(item)"
            ><v-icon left>mdi-cog</v-icon> ตั้งค่า
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="addlimitedDialog" persistent max-width="600px">
      <v-card class="pa-3">
        <v-card-title>เพิ่มเลขอั้น</v-card-title>
        <v-data-table
          :headers="headersetlimited"
          :items="inputformlimit"
          hide-default-footer
          class="elevation-1"
        >
          <template #[`item.lotto_number`]="{ item }">
            <div class="pa-2">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                label="เลข"
                v-model="item.lottonumber_name"
                type="number"
              />
            </div>
          </template>
          <template #[`item.out_come_rate`]="{ item }">
            <div class="pa-2">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                label="อัตราจ่าย"
                v-model="item.out_come_rate"
                type="number"
              />
            </div>
          </template>
          <template #[`item.self_receive_amount`]="{ item }">
            <div class="pa-2">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                label="รับของ"
                v-model="item.self_receive_amount"
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
        <v-divider></v-divider>
        <v-card-actions class="mt-3 justify-center">
          <v-btn small rounded color="success" @click="submitForm()"
            >เพิ่มเลขอั้น</v-btn
          >
          <v-btn small rounded color="error" @click="addlimitedDialog = false"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editlimitedDialog" persistent max-width="600px">
      <v-card class="pa-3">
        <v-card-title>แก้ไขเลขอั้น</v-card-title>

        <div>
          <v-text-field
            outlined
            label="เลข"
            class="my-2"
            type="number"
            dense
            v-model="form.lotto_number"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            outlined
            type="number"
            class="my-2"
            label="อัตราจ่าย"
            dense
            v-model="form.out_come_rate"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            outlined
            class="my-2"
            label="รับของ"
            type="number"
            dense
            v-model="form.self_receive_amount"
            hide-details="auto"
          ></v-text-field>
        </div>
        <v-card-actions>
          <v-btn small rounded color="success" @click="submitUpdate()"
            >แก้ไขเลขอั้น</v-btn
          >
          <v-btn small rounded color="error" @click="editlimitedDialog = false"
            >ยกเลิก</v-btn
          >
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
          align: "center"
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
      "Addlimited"
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
      try {
        await this.Addlimited(body);
        this.editlimitedDialog = false;
        this.$fetch();
      } catch (error) {
        this.editlimitedDialog = false;
        console.log(error);
        this.$fetch();
      }
    },
    async submitForm() {
      let body = {
        typecategory_id: this.$route.query.id,
        lottonumbertype_id: this.$route.query.lottonumbertype_id,
        lottonumbers: this.inputformlimit
      };
      try {
        await this.Addlimited(body);
        this.addlimitedDialog = false;
        this.$fetch();
      } catch (error) {
        this.addlimitedDialog = false;
        console.log(error);
        this.$fetch();
      }
    },
    openEdit(item) {
      console.log(item);
      this.form = item;
      this.editlimitedDialog = true;
    }
  }
};
</script>
