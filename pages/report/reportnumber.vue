<template>
  <v-flex>
    <h2>หวยเพลา / รายงานตัวเลขสูงสุด</h2>
    <div class="pa-1 rounded-lg white my-3 pa-2">
      <div class="row py-3">
        <div class="col-12 col-sm-6 col-md-3">
          เลือกประเภทหวย
          <v-divider></v-divider>
          <v-select
            :items="listtype"
            item-text="title"
            item-value="id"
            hide-details="auto"
            outlined
            v-model="selectType"
            @change="selectTypelotto"
            dense
            placeholder="กรุณาเลือกประเภทหวย"
          ></v-select>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          เลือกชนิดหวย
          <v-autocomplete
            :items="itemcategory"
            item-text="title"
            hide-details="auto"
            item-value="id"
            :disabled="selectType == null"
            outlined
            dense
            placeholder="กรุณาเลือกชนิดของหวย"
          ></v-autocomplete>
        </div>
      </div>
    </div>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      listtype: [],
      selectCate: null,
      selectType: null,
      itemcategory: []
    };
  },
  async fetch() {
    this.isLoading = true;
    try {
      const { result } = await this.getLottotype();
      this.listtype = result.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("lottosetting", ["getLottotype", "getTypeCategory"]),
    async selectTypelotto(value) {
      try {
        let params = {
          type_id: value,
          currentPage: 1,
          limit: 500
        };
        const response = await this.getTypeCategory(params);
        this.itemcategory = response.result[0].lottotype_id.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
