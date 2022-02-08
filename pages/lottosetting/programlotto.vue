<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h1 class="text-center mt-2">Program Lotto List</h1>
          <hr class="mt-4 mb-4" />

          <v-card class="ma-2 pa-6">
            <v-row class="select-item ">
              <v-select class="col-6 col-md-2" label="Lotto type"></v-select>
              <v-select class="col-6 col-md-2" label="Type category"></v-select>

              <v-text-field
                dense
                solo-inverted
                label="Search"
                required
                class="col-6 col-md-3"
                ><v-btn slot="append" color="success" fab dark x-small>
                  <v-icon>mdi-magnify</v-icon></v-btn
                ></v-text-field
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
              </v-data-table>
            </v-card>
            <!-- add -->
            <v-dialog full-width v-model="modal_add" max-width="800">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  Program Lotto - ADD
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-select
                      label="Lotto  type"
                      class="col-12 col-md-6"
                    ></v-select>
                    <v-select
                      label="Type Category"
                      class="col-12 col-md-6"
                    ></v-select>
                    <v-select
                      label="Type Category Detail"
                      class="col-12 col-md-6"
                    ></v-select>

                    <v-row class="px-5" style="align-items: baseline;">
                      <v-col cols="12" md="3" class="text-left text-md-right"
                        >Bet Open Datetime</v-col
                      >

                      <v-col md="5" cols="12">
                        <el-date-picker
                          class="full-width"
                          v-model.trim="filter.startDate"
                          arrow-control
                          placeholder="วันที่"
                          style="width: 100%"
                        />
                      </v-col>
                      <v-col md="4" cols="12">
                        <el-time-picker
                          class="full-width"
                          v-model.trim="filter.startTime"
                          format="HH:mm"
                          arrow-control
                          placeholder="เวลา"
                          style="width: 100%"
                        >
                        </el-time-picker>
                      </v-col>
                    </v-row>
                    <v-row class="px-5" style="align-items: baseline;">
                      <v-col cols="12" md="3" class="text-left text-md-right">
                        Bet Close Datetime</v-col
                      >
                      <v-col md="5" cols="12">
                        <el-date-picker
                          class="full-width"
                          v-model.trim="filter.endDate"
                          arrow-control
                          placeholder="วันที่"
                          style="width: 100%"
                        />
                      </v-col>
                      <v-col md="4" cols="12">
                        <el-time-picker
                          class="full-width"
                          v-model.trim="filter.endTime"
                          format="HH:mm"
                          arrow-control
                          placeholder="เวลา"
                          style="width: 100%"
                        >
                        </el-time-picker>
                      </v-col>
                    </v-row>
                    <v-row class="px-5" style="align-items: baseline;">
                      <v-col cols="12" md="3" class="text-left text-md-right"
                        >Lotto Date</v-col
                      >
                      <v-col md="5" cols="12">
                        <el-date-picker
                          class="full-width"
                          v-model.trim="filter.endDate"
                          arrow-control
                          placeholder="วันที่"
                          style="width: 100%"
                        />
                      </v-col>
                      <v-col md="4" cols="12">
                        <el-time-picker
                          class="full-width"
                          v-model.trim="filter.endTime"
                          format="HH:mm"
                          arrow-control
                          placeholder="เวลา"
                          style="width: 100%"
                        >
                        </el-time-picker>
                      </v-col>
                    </v-row>
                    <v-switch
                      v-model="select_status"
                      false-value="inactive"
                      true-value="active"
                      :label="`STATUS : ${select_status.toString()}`"
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
            <v-dialog full-width v-model="modal_edit" max-width="800">
              <v-card class="pa-4">
                <v-card-title class="text-h5">
                  Program Lotto - EDIT
                </v-card-title>
                <v-card class="pa-4 ma-3">
                  <v-form>
                    <v-select
                      label="Lotto  type"
                      class="col-12 col-md-6"
                    ></v-select>
                    <v-select
                      label="Type Category"
                      class="col-12 col-md-6"
                    ></v-select>
                    <v-select
                      label="Type Category Detail"
                      class="col-12 col-md-6"
                    ></v-select>

                    <v-row class="px-5" style="align-items: baseline;">
                      <v-col cols="12" md="3" class="text-left text-md-right"
                        >Bet Open Datetime</v-col
                      >

                      <v-col md="5" cols="12">
                        <el-date-picker
                          class="full-width"
                          v-model.trim="filter.startDate"
                          arrow-control
                          placeholder="วันที่"
                          style="width: 100%"
                        />
                      </v-col>
                      <v-col md="4" cols="12">
                        <el-time-picker
                          class="full-width"
                          v-model.trim="filter.startTime"
                          format="HH:mm"
                          arrow-control
                          placeholder="เวลา"
                          style="width: 100%"
                        >
                        </el-time-picker>
                      </v-col>
                    </v-row>
                    <v-row class="px-5" style="align-items: baseline;">
                      <v-col cols="12" md="3" class="text-left text-md-right">
                        Bet Close Datetime</v-col
                      >
                      <v-col md="5" cols="12">
                        <el-date-picker
                          class="full-width"
                          v-model.trim="filter.endDate"
                          arrow-control
                          placeholder="วันที่"
                          style="width: 100%"
                        />
                      </v-col>
                      <v-col md="4" cols="12">
                        <el-time-picker
                          class="full-width"
                          v-model.trim="filter.endTime"
                          format="HH:mm"
                          arrow-control
                          placeholder="เวลา"
                          style="width: 100%"
                        >
                        </el-time-picker>
                      </v-col>
                    </v-row>
                    <v-row class="px-5" style="align-items: baseline;">
                      <v-col cols="12" md="3" class="text-left text-md-right"
                        >Lotto Date</v-col
                      >
                      <v-col md="5" cols="12">
                        <el-date-picker
                          class="full-width"
                          v-model.trim="filter.endDate"
                          arrow-control
                          placeholder="วันที่"
                          style="width: 100%"
                        />
                      </v-col>
                      <v-col md="4" cols="12">
                        <el-time-picker
                          class="full-width"
                          v-model.trim="filter.endTime"
                          format="HH:mm"
                          arrow-control
                          placeholder="เวลา"
                          style="width: 100%"
                        >
                        </el-time-picker>
                      </v-col>
                    </v-row>
                    <v-switch
                      v-model="select_status"
                      false-value="inactive"
                      true-value="active"
                      :label="`STATUS : ${select_status.toString()}`"
                      flat
                    ></v-switch> </v-form
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
      filter: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
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
          text: "Agent",
          align: "center",
          filterable: false,
          value: "agent"
        },
        {
          text: "Company",
          align: "center",
          filterable: false,
          value: "company"
        },
        { text: "Bet Open", value: "bet_open", align: "center" },
        { text: "Bet Close", value: "bet_close", align: "center" },
        { text: "Lotto Date", value: "lotto_date", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      itemexam: [
        {
          agent: "betkub",
          company: "smartbet",
          bet_open: "2021/12/12 05:08:00",
          bet_close: "2021/12/12 05:08:00",
          lotto_date: "2021/12/12 05:08:00"
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
