<template>
  <div class="white rounded-lg">
    <div class="rounded-lg white">
     
      <v-data-table :headers="headersdatelotto" :items="datarender">
        <template #[`item.no`]="{index}">
          {{ index + 1 }}
        </template>
        <template #[`item.action`]="{item}">
          <v-btn
            rounded
            color="black"
            dark
            small
            @click="getDetail(item.title_id)"
            ><v-icon left>mdi-cog</v-icon> ตั้งค่า
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
      row: "",
      select2Date: false,
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "No.",
          value: "no",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center",
          width: "100px"
        },
        {
          text: "ชนิดหวย",
          value: "title",
          class: "font-weight-bold",
          align: "start"
        },
        {
          text: "Action",
          value: "action",
          class: "font-weight-bold",
          align: "center",
          width: "300px"
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
    this.isLoading = true;
    try {
      const { data } = await this.getSellerAll();
      this.datarender = data.result;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("shaft", ["getSellerAll"]),
    getDetail(id) {
      this.$router.push(`${this.$route.path}?id=${id}`);
    }
  }
};
</script>
