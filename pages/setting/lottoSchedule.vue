<template>
	<v-flex>
    <div class="d-flex justify-center"><h2>รอบหวย</h2></div>
		<div class="d-flex justify-end"><h4 v-if="select2Date" class="pr-2 red--text" >{{getStartDate()}} - {{getEndDate()}}</h4></div>
    <div class="my-3 rounded-lg white">
      <h3 class="pa-3">ตัวเลือกการค้นหา</h3>
      
      <v-divider></v-divider>
      <div class="pa-3">
        <v-radio-group v-model="selecttype" row>
          <v-radio label="วันนี้" value="day"></v-radio>
          <v-radio label="เมื่อวาน" value="yesterday"></v-radio>
          <v-radio label="สัปดาห์นี้" value="week"></v-radio>
          <v-radio label="สัปดาห์ที่แล้ว" value="lastweek"></v-radio>
          <v-radio label="เดือน" value="mounth"></v-radio>
          <v-radio label="วันที่" value="findate"></v-radio>
        </v-radio-group>
        <v-row>
          <v-col cols="12" sm="6" v-if="selecttype == 'mounth'">
            <div class="px-2 font-weight-bold">
              เลือกเดือน :
              <el-date-picker
                type="month"
                v-model.trim="filter.month"
                arrow-control
                placeholder="เลือกเดือน"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" v-if="selecttype == 'findate'">
            <div class="px-2 font-weight-bold row">
              <div class="col-12  col-sm-6 col-lg-3">
                ตั้งเเต่วันที่ :
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.startDate"
                  arrow-control
                  placeholder="เลือกวันที่ต้องการค้นหา"
                >
                </el-date-picker>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                ถึงวันที่ :
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.endDate"
                  arrow-control
                  placeholder="เลือกวันที่ต้องการค้นหา"
                >
                </el-date-picker>
              </div>
            </div>
          </v-col>
          <v-col cols="12"><v-btn color="primary" @click="check2DateSelect()">ค้นหา</v-btn></v-col>
        </v-row>
      </div>
    </div>
    <div class="white rounded-lg">
			<div class="rounded-lg white">
        <v-data-table :headers="headersdatelotto" :items="itemtypeaward" >
          <template #[`item.bet_open_time`]="{item}"><span >{{item.bet_open_time}}</span></template>
					<template #[`item.bet_close_time`]="{item}"><span >{{item.bet_close_time}}</span></template>
					<template #[`item.bet_lotto_time`]="{item}"><span >{{item.bet_lotto_time}}</span></template>
					<template #[`item.action`]="{item}">
            <v-btn rounded color="primary" small @click="openEdit(item)"
              ><v-icon left>mdi-magnify</v-icon>แก้ไข
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
					<v-row>
						<v-col cols="4">
							<v-subheader>ชื่อหวย</v-subheader>
						</v-col>
						<v-col cols="8">
							<v-text-field
								label="ชื่อ"
								placeholder="กรอกชื่อ"
                :value="editing.title"
							></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="4">
							<v-subheader>รอบหวย</v-subheader>
						</v-col>
						<v-col cols="8">
							<v-text-field
								label="จำนวนรอบ"
								:value="editing.lotto_round"
							></v-text-field>
						</v-col>
					</v-row>

					<!-- start time -->
					<v-row>
						<v-col cols="4">
							<v-subheader>วัน และ เวลาที่เปิดแทง</v-subheader>
						</v-col>
						<v-col cols="8">
							<v-text-field
								label="วันที่เปิด"
								:value="editing.bet_open_time"
								type="datetime-local"
							></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="4">
							<v-subheader>วัน และ เวลาที่ปิดแทง</v-subheader>
						</v-col>
						<v-col cols="8">
							<v-text-field
								label="วันที่ปิด"
								:value="editing.bet_close_time"
								type="datetime-local"
							></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="4">
							<v-subheader>วัน และ เวลาที่หวยออก</v-subheader>
						</v-col>
						<v-col cols="8">
							<v-text-field
								label="วันหวยออก"
								:value="editing.bet_lotto_time"
								type="datetime-local"
							></v-text-field>
						</v-col>
					</v-row>

					<!-- radio button -->
					<v-row>
						<v-col cols="4">
							<v-subheader>สถานะ</v-subheader>
						</v-col>
						<v-col cols="8">
							<v-radio-group
								v-model="editing.status"
								row
							>
								<v-radio
									label="เปิด"
									:value="true"
								></v-radio>
								<v-radio
									label="ปิด"
									:value="false"
								></v-radio>
							</v-radio-group>
						</v-col>
					</v-row>
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
			select2Date: false,
      dialogdetail: false,
      editing: {},
      headersdatelotto: [
        {
          text: "ลำดับ",
          value: "id",
          align: "left",
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ชื่อหวย",
          value: "title",
          align: "left",
          class: "font-weight-bold"
        },
        {
          text: "รอบหวย",
          value: "lotto_round",
          align: "left",
          class: "font-weight-bold"
        },
        {
          text: "วันที่เปิดแทง",
          value: "bet_open_time",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold green--text"
        },
        {
          text: "วันที่ปิดแทง",
          value: "bet_close_time",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold red--text"
        },
        {
          text: "วันที่ออกผล",
          value: "bet_lotto_time",
          align: "center",
          class: "font-weight-bold",
          cellClass: "font-weight-bold red--text"
        },
        {
          text: "สถานะ",
					value: "status",
          sort: false,
          align: "center",
          class: "font-weight-bold"
        },
        {
          text: "action",
          value: "action",
          sort: false,
          align: "right",
          class: "font-weight-bold"
        }
      ],
      itemtypeaward: [
        {
          id:"1",
					title: "ฮานอยสตาร์",
          lotto_round: "รอบเดียว",
					bet_open_time: "2022-03-06 8:00:00",
					bet_close_time: "2022-03-06 19:50:00",
					bet_lotto_time: "2022-03-06 20:00:00",
					status: "เปิด",
        },{
          id:"2",
					title: "จากาสตาร์",
          lotto_round: "รอบเดียว",
					bet_open_time: "2022-03-06 12:00:00",
					bet_close_time: "2022-03-06 20:50:00",
					bet_lotto_time: "2022-03-06 21:00:00",
					status: "เปิด",
        }
      ],
      selecttype: "",
      filter: {
        startDate: "",
        endDate: ""
      }
    };
  },
	methods:{
		check2DateSelect(){
			if(this.filter.startDate){
				console.log("filter.startDate")
				console.log(this.filter)
			}
			if(this.filter.endDate){
				console.log("filter.endDate")
				console.log(this.filter.endDate)
			}
			if(this.filter.startDate && this.filter.endDate){
				this.select2Date = true
			}
			else{
				this.select2Date = false
			}
		},
		getStartDate(){
			var start = this.$moment(this.filter.startDate).format('DD/MM/YYYY')
			return start
		},
		getEndDate(){
			var end = this.$moment(this.filter.endDate).format('DD/MM/YYYY')
			return end
		},

    openEdit(obj){
      this.editing = obj
      console.log(obj)
      console.log(this.editing)
      this.dialogdetail = true
    }
	},
  watch: {
    selecttype(newVal) {
      if (newVal) {
        this.filter = {
          startDate: "",
          endDate: ""
        };
      }
    }
  }
};
</script>

<style></style>
