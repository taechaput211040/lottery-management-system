<template>
  <div class="container page-error">
    <div class="row my-4 justify-content-md-center">
      <div class="col-12">
        <div class="card px-2 py-4 text-center">
          <h1 class="mb-3 primary--text">
            กำลังเข้าสู่ระบบ...
            <div class="mt-5"><loading-progess></loading-progess></div>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import LoadingProgess from "../components/form/LoadingProgess.vue";
export default {
  components: { LoadingProgess },
  layout: "session",
  data() {
    return {};
  },
  async mounted() {
    await this.loginbyHash();
  },
  methods: {
    ...mapActions("auth", ["gettoken"]),
    ...mapMutations("auth", ["set_hash"]),

    async loginbyHash() {
      let memberHash = this.$route.query.hash;
      if (memberHash) {
        await this.set_hash(memberHash);
      } else {
        if (this.$store.state.auth.hash) {
          memberHash = this.$store.state.auth.hash;
        }
        this.$router.push("/error");
      }
      if (this.$store.state.auth.hash) {
        let params = {
          hash: memberHash
        };
        try {
          await this.gettoken(params);
          console.log("gettoken");
          this.$router.push("/");
        } catch (error) {
          this.$router.push("/error");
        }
      }
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
