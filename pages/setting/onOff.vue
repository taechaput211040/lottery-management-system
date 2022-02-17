<template>
	<v-flex>
    <div class="d-flex justify-center"><h2>เปิดปิดหวย</h2></div>
		
		<div class="white rounded-lg">
			<div class="rounded-lg white">
        <v-data-table :headers="headerOnOff" :items="itemtypeaward" >
					<template #[`item.upline_status`]="{item}"  >
						<!-- {{item.upline_status}} -->
            <v-radio-group v-model="item.upline_status" row  >
							<v-radio
								label="on"
								:value="true"
							></v-radio>
							<v-radio
								label="off"
								:value="false"
							></v-radio>
						</v-radio-group>
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
      headerOnOff: [
        {
          text: "No.",
          value: "num",
          class: "font-weight-bold",
          cellClass: "font-weight-bold",
          align: "center"
        },
        {
          text: "ชื่อ",
          value: "title",
          class: "font-weight-bold",
          align: "center"
        },
        {
          text: "สถานะ",
          value: "upline_status",
          class: "font-weight-bold",
          align: "center"
        },
      ],
      itemtypeaward: [
        {
					num: "4",
          id:"asd2-52gmp-mo51-3fxcwmql4611111",
					title: "ฮานอยสตาร์",
					upline_status: true
        },{
					num:"3",
					id:"asd2-52gmp-mo51-3fxcwmql461ps6lx",
					title: "ฮานอยสตาร์",
					upline_status: false        
				}
      ],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
    
  },
  methods: {
    _type(object) {
      return typeof obejct
    }
  }
	
};
</script>

