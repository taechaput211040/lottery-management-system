<template>
  <div class="container page-error">
    <div class="row my-4 justify-content-md-center">
      <div class="col-12">
        <div class="card px-2 py-4 text-center">
          <h1 class="mb-3 error--text">
            Oops! We've encountered an error.<br />
            Please try again later. <br /><br />

            哎呀!目前似乎有些问题<br />
            请稍候再试.<br /><br />

            พบข้อผิดพลาดบางอย่าง<br />
            กรุณาลองใหม่ภายหลังค่ะ !!!
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "session",
  data() {
    return {
      myWindow: ""
    };
  },
  mounted() {
    this.closewindowprogram();
  },
  methods: {
    closewindowprogram() {
      localStorage.clear();
      sessionStorage.clear();
      window.close();
    }
  }
};
</script>
<style lang="scss" scoped>
.page-error {
  margin-top: 10%;
}
.bi-exclamation-triangle-fill {
  font-size: 100px;
}
</style>
