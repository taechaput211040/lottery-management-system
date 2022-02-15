<template>
  <div>
    <h1 class="mt-2">Type Category Detail</h1>

    <v-btn class="ma-2" color="error" @click="$router.go(-1)">back</v-btn>
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
          :headers="headers"
          :items="itemexample"
          hide-default-footer
        >
          <template #[`item.no`]="{index}">
            {{ index + 1 }}
          </template>
          <template #[`item.action`]>
            <v-btn class="mx-auto" fab dark x-small color="warning">
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <!-- add  -->
        <v-dialog full-width v-model="modal_add" max-width="600">
          <v-card class="pa-4">
            <v-card-title class="text-h5">
              List Lotto - ADD
            </v-card-title>
            <v-card class="pa-4 ma-3">
              <v-form>
                <v-select label="Type category"></v-select>
                <v-text-field label="title" dense outlined></v-text-field>
                <v-text-field
                  label="Lotto Round"
                  dense
                  outlined
                  type="number"
                ></v-text-field>
                <v-divider></v-divider>
                <v-radio-group v-model="select_type" mandatory>
                  <p>Plan Type :</p>
                  <div class="d-flex " style="align-items: baseline;">
                    <v-radio
                      class="mx-2"
                      label="By Day Of Week"
                      value="date_per_week"
                    ></v-radio>
                    <v-radio label="By Date" value="date"></v-radio>
                  </div> </v-radio-group
                ><v-divider></v-divider>
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
        <!-- add  -->
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select_type: "date_per_week",
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
          text: "Open Date-time",
          align: "center",
          filterable: false,
          value: "open_date_time"
        },
        {
          text: "Close Date-time",
          align: "center",
          filterable: false,
          value: "close_date_time"
        },
        {
          text: "Prize",
          align: "center",
          filterable: false,
          value: "prize"
        },
        {
          text: "Plan Prize",
          align: "center",
          filterable: false,
          value: "plan_prize"
        },
        {
          text: "status",
          align: "center",
          filterable: false,
          value: "status"
        },
        {
          text: "Action",
          align: "center",
          filterable: false,
          value: "action"
        }
      ],
      itemexample: [
        {
          title: "หวยฮานอย",
          open_date_time: "2021/07/21 18:00:15",
          close_date_time: "2021/14/21 18:00:15",
          prize: "123",
          plan_prize: "112",
          status: "active"
        }
      ]
    };
  },
  methods: {
    showdetail(id) {
      console.log(id);
    },
    addstatus() {}
  }
};
</script>

<style lang="scss"></style>
