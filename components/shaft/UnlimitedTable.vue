<template>
  <div class="">
    <v-btn color="red" class="ma-3" small dark @click="$router.go(-1)"
      >ย้อนกลับ</v-btn
    >
    <div class="d-flex align-baseline">
      <h3 class="primary--text font-weight-bold my-4">หวยของตัวเอง</h3>
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
        <template #[`item.unlimitedNumber`]="{item}">
          <v-btn rounded color="primary" dark small @click="limitDetail(item)"
            ><v-icon left>mdi-plus</v-icon>เพิ่มเลขอั้น
          </v-btn>
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

        <div>
          <v-text-field
            outlined
            label="เลข"
            class="my-2"
            dense
            v-model="form.lottonumber_name"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            outlined
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
            dense
            v-model="form.self_receive_amount"
            hide-details="auto"
          ></v-text-field>
        </div>
        <v-card-actions>
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
            v-model="form.lottonumber_name"
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
          <v-btn small rounded color="success" @click="submitForm()"
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
          value: "lottonumber_name",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "อัตราจ่าย",
          value: "out_come_rate",
          class: "font-weight-bold",
          align: "start"
        },

        {
          text: "ยอดที่เปิดรับ",
          value: "self_receive_amount",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "ยอดที่รับแล้ว",
          value: "self_receive_balance",
          class: "font-weight-bold",
          align: "start"
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
    limitDetail(item) {
    
      this.$router.push(
        `${this.$route.fullPath}&lottonumbertype_id=${item.lottonumbertype_id}`
      );
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
    async submitForm() {
      let body = {
        typecategory_id: this.$route.query.id,
        lottonumbertype_id: this.$route.query.lottonumbertype_id,
        lottonumbers: [
          {
            lottonumber_name: this.form.lottonumber_name,
            out_come_rate: this.form.out_come_rate,
            self_receive_amount: this.form.self_receive_amount
          }
        ]
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
      this.form = item;
      this.editlimitedDialog = true;
    }
  }
};
</script>
