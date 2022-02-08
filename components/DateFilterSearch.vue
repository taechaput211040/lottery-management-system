<template>
  <div class="row">
    <div class="col-md-6 col-12">
      <div class="row" style="align-items: baseline;">
        เริ่ม
        <div class="col-7 col-md-7">
          <el-date-picker
            class="full-width"
            v-model.trim="filter.startDate"
            arrow-control
            placeholder="วันที่"
            style="width: 100%"
          />
        </div>
        <div class="col">
          <el-time-picker
            class="full-width"
            v-model.trim="filter.startTime"
            format="HH:mm"
            arrow-control
            placeholder="เวลา"
            style="width: 100%"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-12">
      <div class="row" style="align-items: baseline;">
        ถึง
        <div class="col-7 col-md-7">
          <el-date-picker
            class="full-width"
            v-model.trim="filter.endDate"
            arrow-control
            placeholder="วันที่"
            style="width: 100%"
          />
        </div>
        <div class="col">
          <el-time-picker
            class="full-width"
            v-model.trim="filter.endTime"
            format="HH:mm"
            arrow-control
            placeholder="เวลา"
            style="width: 100%"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
  </div>
  <!--  <el-form label-width="60px">-->
  <!--    <div class="row q-gutter-x-sm">-->
  <!--      <div class="col-12 col-md-4">-->
  <!--        <el-form-item label="เวลา">-->
  <!--          <el-col :span="14">-->
  <!--            <el-date-picker-->
  <!--              class="full-width"-->
  <!--              v-model.trim="filter.startDate"-->
  <!--              arrow-control-->
  <!--              placeholder="วันที่"-->
  <!--              style="width: 100%;"-->
  <!--            />-->
  <!--          </el-col>-->
  <!--          <el-col class="text-center" :span="1">&nbsp;</el-col>-->
  <!--          <el-col :span="9">-->
  <!--            <el-time-picker-->
  <!--              class="full-width"-->
  <!--              v-model.trim="filter.startTime"-->
  <!--              format="HH:mm"-->
  <!--              arrow-control-->
  <!--              placeholder="เวลา"-->
  <!--              style="width: 100%;"-->
  <!--            >-->
  <!--            </el-time-picker>-->
  <!--          </el-col>-->
  <!--        </el-form-item>-->
  <!--      </div>-->
  <!--      <div class="col-12 col-md-4">-->
  <!--        <el-form-item label="ถึง">-->
  <!--          <el-col :span="14">-->
  <!--            <el-date-picker-->
  <!--              class="full-width"-->
  <!--              v-model.trim="filter.endDate"-->
  <!--              arrow-control-->
  <!--              placeholder="วันที่"-->
  <!--              style="width: 100%;"-->
  <!--            />-->
  <!--          </el-col>-->
  <!--          <el-col class="text-center" :span="1">&nbsp;</el-col>-->
  <!--          <el-col :span="9">-->
  <!--            <el-time-picker-->
  <!--              class="full-width"-->
  <!--              v-model.trim="filter.endTime"-->
  <!--              format="HH:mm"-->
  <!--              arrow-control-->
  <!--              placeholder="เวลา"-->
  <!--              style="width: 100%;"-->
  <!--            >-->
  <!--            </el-time-picker>-->
  <!--          </el-col>-->
  <!--        </el-form-item>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </el-form>-->
</template>

<script>
export default {
  props: {
    filter: {
      startDate: new Date(),
      startTime: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(),
      endTime: new Date(new Date().setHours(23, 59, 59, 999))
    }
  }
};
</script>
