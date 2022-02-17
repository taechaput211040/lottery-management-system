<template>
	<v-flex>
    <div class="d-flex justify-center"><h2>อัตราจ่ายหวยเพลา</h2></div>
		
		<div class="white rounded-lg">
			<div class="rounded-lg white">
				<div class="d-flex justify-content-end"><v-button> </v-button></div>
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward" >
					<template #[`item.action`]="{item}" >
            <v-btn rounded color="warning" small @click="dialogdetail = true"
              ><v-icon left>mdi-pen</v-icon> edit
            </v-btn>
        	</template>
        </v-data-table>
    	</div>
    </div>

		<!-- edit modal card-->
		<!-- TODO : change after edit -->
		<!-- TODO : change and cancel button -->
    <v-dialog v-model="dialogdetail" max-width="800">
      <v-card class="pa-3">
        <v-container fluid>
					
				</v-container>
  		</v-card>
			
			<!-- button -->
			<v-btn color="success" @click="dialogdetail = false">แก้ไข</v-btn>
			<v-btn color="error" @click="dialogdetail = false">ปิด</v-btn>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
			row:'',
			select2Date: false,
      dialogdetail: false,
      headersdatelotto: [
        {
          text: "No.",
          value: "num",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
					align: "center"
        },
				{
          text: "ชนิดหวย",
          value: "title",
          class: "font-weight-bold",
					align: "center"
        },
				{
          text: "อัตราจ่าย",
          value: "pay_rate",
          class: "font-weight-bold",
					align: "center"
        },
        {
          text: "ส่วนลด",
          value: "discount",
          class: "font-weight-bold",
					align: "center"
        },
        {
          text: "Action",
          value: "action",
          class: "font-weight-bold",
					align: "center"
        },
      ],
      itemtypeaward: [
        {
					num: "ๅ",
					title: "2 ตัวบน",
					pay_rate: "92",
					discount: "8",
        },{
					num: "2",
					title: "3 ตัวบน",
					pay_rate: "800",
					discount: "15",
				}
      ],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
	
};
</script>

