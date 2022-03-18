<template>
  <v-app dark>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4" id="card-login">
            <v-card class=" elevation-8" color="#385F73" dark>
              <v-card-text>
                <v-form>
                  <v-card-title class="mb-2 text--white"
                    >LOGIN : SMART LOTTO</v-card-title
                  >
                  <v-divider></v-divider>
                  <v-text-field
                    label="Enter your username"
                    required
                    prepend-inner-icon="mdi-account"
                    type="text"
                    class="rounded-0"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    label="Enter your password"
                    required
                    v-model="password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded-0"
                  ></v-text-field>
                  <v-btn
                    class="rounded-2"
                    x-large
                    block
                    rounded
                    dark
                    @click.prevent="auth()"
                    >Login</v-btn
                  >
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  layout: "session",
  data() {
    return {
      username: "",
      password: "",
      authendata: {},
      ip_address: ""
    };
  },
  async fetch() {},
  async beforeMount() {
    this.checklogin();
    this.getIp();
  },
  methods: {
    ...mapActions("auth", ["login", "gettoken"]),
    async getIp() {
      let { data } = await this.$axios.get(`https://ipinfo.io/ip`);
      this.ip_address = data;
    },
    async auth() {
      try {
        const { data: response } = await this.login({
          username: this.username,
          password: this.password
        });
        console.log(response.hash);
        if (response.hash) {
          let params = {
            hash: response.hash,
            ip: this.ip_address
          };
          await this.gettoken(params);
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
    checklogin() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#card-login {
  .v-card__text {
    background: linear-gradient(135deg, #ce9ffc 0%, #7367f0 100%);
  }
}
</style>
