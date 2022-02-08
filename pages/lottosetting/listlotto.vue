<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="text-center mt-2">List Lotto</h1>
          <hr class="mt-4 mb-4" />

          <v-card class="ma-2 pa-6">
            <v-row class="select-item ">
              <v-text-field
                solo-inverted
                label="Title"
                dense
                class="col-6 col-md-3"
                required
              ></v-text-field
              ><v-select
                class="col-6 col-md-2"
                label="Type Category"
              ></v-select>
              <v-select
                class="col-6 col-md-2"
                label="lotto number type"
              ></v-select
              ><v-btn color="success" dark>
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
                <template #[`item.permaxbet`]="{item}">
                  {{ item.permaxbet }} %
                </template></v-data-table
              >
            </v-card>
            <!-- add -->
            <v-dialog full-width v-model="modal_add" max-width="600">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  List Lotto - ADD
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-select :items="items" label="Type Category"></v-select>
                    <v-select
                      :items="items"
                      label="lotto number type"
                    ></v-select>
                    <v-text-field
                      label="Reward Prize"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Minimum Bet Prize"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Maximumn Bet Prize"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Maximumn Bet Per Prize"
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
            <v-dialog full-width v-model="modal_edit" max-width="600">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  List Lotto - EDIT
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-text-field
                      label="Title"
                      v-model="dataEdit.title"
                      filled
                      disabled
                    ></v-text-field>
                    <v-select :items="items" label="Type Category"></v-select>
                    <v-select
                      :items="items"
                      label="lotto number type"
                    ></v-select>
                    <v-text-field
                      label="Reward Prize"
                      v-model="dataEdit.reward"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Minimum Bet Prize"
                      v-model="dataEdit.minbet"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Maximumn Bet Prize"
                      v-model="dataEdit.maxbet"
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Maximumn Bet Per Prize"
                      v-model="dataEdit.permaxbet"
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
          </v-card>
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
          text: "Title",
          align: "center",
          filterable: false,
          value: "title"
        },
        { text: "Reward Prize", value: "reward", align: "center" },
        { text: "Minimum Bet prize", value: "minbet", align: "center" },
        { text: "Maximum Bet prize", value: "maxbet", align: "center" },
        { text: "Maximum Bet per prize", value: "permaxbet", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      itemexam: [
        {
          title: "หวยอูกันด้า",
          reward: 300,
          minbet: 40,
          maxbet: 100,
          permaxbet: 7
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
