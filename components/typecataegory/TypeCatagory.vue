<template>
  <div>
    <h1 class="text-center mt-2">Type Category</h1>
    <hr class="mt-4 mb-4" />
    <v-card class="ma-2 pa-6">
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
          :headers="headers"
          :items="itemexample"
          hide-default-footer
        >
          <template #[`item.no`]="{index}">
            {{ index + 1 }}
          </template>
          <template #[`item.action`]="{item}">
            <v-btn
              class="mx-auto"
              fab
              dark
              x-small
              color="warning"
              @click="openEdit(item)"
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <template #[`item.type_Category_detail`]="{item}">
            <v-btn
              color="grey darken-4 "
              dark
              small
              @click="showdetail(item.id)"
              >SHOWMORE</v-btn
            >
          </template>
          <template #[`item.status`]="{item}">
            <v-chip
              v-if="item.status == 'active'"
              class="ma-2"
              color="success"
              outlined
            >
              <v-icon left>
                mdi-circle
              </v-icon>
              {{ item.status }}
            </v-chip>
            <v-chip
              v-if="item.status == 'inactive'"
              class="ma-2"
              color="error"
              outlined
            >
              <v-icon left>
                mdi-circle
              </v-icon>
              {{ item.status }}
            </v-chip>
          </template>
          <template #[`item.permaxbet`]="{item}">
            {{ item.permaxbet }} %
          </template></v-data-table
        >
        <!-- add -->
        <v-dialog full-width v-model="modal_add" max-width="600">
          <v-card class="pa-4">
            <v-card-title class="text-h5">
              List Lotto - ADD
            </v-card-title>
            <v-card class="pa-4 ma-3">
              <v-form>
                <v-select label="lotto type"></v-select>
                <v-text-field label="title" dense outlined></v-text-field>
                <v-text-field label="flax" dense outlined></v-text-field>

                <v-switch
                  v-model="select_status"
                  false-value="inactive"
                  true-value="active"
                  :label="`STATUS : ${select_status.toString()}`"
                  @click="addstatus"
                  flat
                ></v-switch>
              </v-form>
            </v-card>
            <v-row class="pa-2">
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                small
                class="mx-2"
                @click="modal_add = false"
                >ADD</v-btn
              ><v-btn color="error" small @click="modal_add = false"
                >CANCLE</v-btn
              >
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- addd -->
        <!-- edit  -->
        <v-dialog full-width v-model="modal_edit" max-width="600">
          <v-card class="pa-4">
            <v-card-title class="text-h5">
              List Lotto - EDIT
            </v-card-title>
            <v-card class="pa-4 ma-3">
              <v-form>
                <v-select label="lotto type"></v-select>
                <v-text-field
                  v-model="dataEdit.title"
                  label="title"
                  filled
                  disabled
                  dense
                ></v-text-field>
                <v-text-field label="flax" dense outlined></v-text-field>

                <v-switch
                  v-model="dataEdit.status"
                  false-value="inactive"
                  true-value="active"
                  :label="`STATUS : ${dataEdit.status}`"
                  @click="addstatus"
                  flat
                ></v-switch>
              </v-form>
            </v-card>
            <v-row class="pa-2">
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                small
                class="mx-2"
                @click="modal_edit = false"
                >SAVE</v-btn
              ><v-btn color="error" small @click="modal_edit = false"
                >CANCLE</v-btn
              >
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- edit  -->
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataEdit: [],
      modal_edit: false,
      select_status: "inactive",
      modal_add: false,
      headers: [
        {
          text: "No.",
          value: "no",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "Title",
          align: "center",
          filterable: false,
          value: "title"
        },
        {
          text: "Type Category Detail",
          align: "center",
          filterable: false,
          value: "type_Category_detail"
        },
        {
          text: "status",
          align: "status",
          filterable: false,
          value: "status"
        },
        { text: "Create Date ", value: "create_date", align: "center" },
        { text: "Create By", value: "create_by", align: "center" },
        { text: "Upload Date", value: "upload_date", align: "center" },
        { text: "Upload By", value: "upload_by", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      itemexample: [
        {
          title: "หวยฮานอย",
          id: "1234",
          type_Category_detail: [
            { open_datetime: "datsadsaa" },
            { close_datetime: "datsadsaa" },
            { prize: "datsadsaa" },
            { plan_type: "datsadsaa" }
          ],
          status: "inactive",
          create_date: "2021/12/12",
          create_by: "admin",
          upload_date: "2021/12/12",
          upload_by: "admin"
        },
        {
          title: "หวยร้าบาล",
          id: "1235",
          type_Category_detail: [
            { open_datetime: "datsadsaa" },
            { close_datetime: "datsadsaa" },
            { prize: "datsadsaa" },
            { plan_type: "datsadsaa" }
          ],
          status: "active",
          create_date: "2021/12/12",
          create_by: "admin",
          upload_date: "2021/12/12",
          upload_by: "admin"
        }
      ]
    };
  },
  methods: {
    showdetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    },
    addstatus() {},
    openEdit(data) {
      this.dataEdit = data;
      this.modal_edit = true;
    }
  }
};
</script>

<style></style>
