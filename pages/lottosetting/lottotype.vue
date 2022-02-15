<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="mt-2">Lotto Type List</h1>
          <div class="white rounded-lg ma-2 pa-6">
            <v-row class="select-item ">
              <v-text-field
                solo-inverted
                label="search"
                dense
                class="col-6 col-md-3"
                required
              ></v-text-field
              ><v-btn color="success" class="mx-2" dark>
                <v-icon>mdi-magnify</v-icon>ค้นหา</v-btn
              ><v-spacer></v-spacer
              ><v-btn color="primary" rounded dark @click="modal_add = true">
                <v-icon>mdi-plus</v-icon>add</v-btn
              >
            </v-row>
            <v-card class="mx-auto mt-5 justify-center classtable">
              <v-data-table
                :headers="headers"
                :items="itemexam"
                hide-default-footer
              >
                <template #[`item.no`]="{index}">
                  {{ index + 1 }}
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
              </v-data-table>
            </v-card>
            <!-- add -->
            <v-dialog full-width v-model="modal_add" max-width="400">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  List Lotto - ADD
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-text-field
                      label="Lotto Type"
                      dense
                      outlined
                    ></v-text-field>
                    <v-switch
                      v-model="select_status"
                      false-value="inactive"
                      true-value="active"
                      :label="`STATUS : ${select_status}`"
                      @click="addstatus"
                      flat
                    ></v-switch> </v-form
                ></v-card>
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
            <!-- add -->
            <!-- edit -->
            <v-dialog full-width v-model="modal_edit" max-width="400">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  List Lotto - EDIT
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-text-field
                      filled
                      disabled
                      label="Lotto Type"
                      v-model="dataEdit.lotto_type"
                      dense
                      outlined
                    ></v-text-field>
                    <v-switch
                      v-model="dataEdit.status"
                      false-value="inactive"
                      true-value="active"
                      :label="`STATUS : ${dataEdit.status}`"
                      @click="addstatus"
                      flat
                    ></v-switch></v-form
                ></v-card>
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
            <!-- edit -->
          </div>
        </v-container>
      </v-row>
    </div>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      select_status: "inactive",
      modal_edit: false,
      dataEdit: [],
      modal_add: false,
      isLoading: false,
      headers: [
        {
          text: "No.",
          value: "no",
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "Lotto Type",
          align: "center",
          filterable: false,
          value: "lotto_type"
        },
        { text: "Type Category", value: "type_category", align: "center" },
        { text: "status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      itemexam: [
        {
          lotto_type: "หวยลาว",
          type_category: "หวยฮานอย",
          status: "active"
        }
      ]
    };
  },
  methods: {
    openEdit(data) {
      this.dataEdit = data;
      this.modal_edit = true;
    },
    addstatus() {}
  }
};
</script>

<style></style>
