<template>
  <div class="mt-5">
    <h2 class="text-center">เปลี่ยนรหัสผ่าน</h2>
    <div class="d-flex justify-center pa-3 text-center">
      <div class="col-12 col-md-4  pa-3 white rounded-lg">
        <v-form ref="formpassword" v-model="valid">
          <div class="my-3"><h3>กรอกรหัสผ่านใหม่</h3></div>
          <v-text-field
            outlined
            v-model="newpassword"
            :rules="[v => !!v || 'กรุณากรอก Password ใหม่']"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            placeholder="กรอกรหัสผ่าน"
          ></v-text-field>
          <v-btn color="btn_edit" dark rounded @click="confirmPassword()"
            >เปลี่ยนรหัสผ่าน</v-btn
          ></v-form
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      newpassword: "",
      value: String
    };
  },
  methods: {
    ...mapActions("auth", ["changePassword"]),
    async confirmPassword() {
      if (this.$refs.formpassword.validate()) {
        try {
          this.$swal({
            title: "แน่ใจหรือไม่ว่าต้องการเปลี่ยนรหัสผ่าน?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
          }).then(async result => {
            if (result.isConfirmed) {
              await this.changePassword(this.newpassword);
              this.$swal(
                "เปลี่ยนรหัสผ่านเรียบร้อย!",
                "ดำเนินการเสร็จสิ้น",
                "success"
              );
              this.newpassword = "";
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");
      }
    }
  }
};
</script>

<style></style>
