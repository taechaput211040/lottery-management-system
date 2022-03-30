<template>
  <div>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="mt-2">Lotto Number Type</h1>

          <div class="ma-2 white pa-6 rounded-lg">
            <v-row class="select-item ">
              <v-text-field
                solo-inverted
                label="Title"
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
                    <v-text-field label="Name" dense outlined></v-text-field>
                    <v-text-field
                      label="Number"
                      dense
                      outlined
                    ></v-text-field> </v-form
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
                      label="Name"
                      v-model="dataEdit.name"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Number"
                      v-model="dataEdit.number"
                      dense
                      outlined
                    ></v-text-field> </v-form
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          text: "name",
          align: "center",
          filterable: false,
          value: "name"
        },
        { text: "number", value: "number", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      itemexam: [
        {
          name: "หวยลาว",
          number: "999999"
        }
      ]
    };
  },
  methods: {
    openEdit(data) {
      this.dataEdit = data;
      this.modal_edit = true;
    }
  }
};
</script>

<style></style>
