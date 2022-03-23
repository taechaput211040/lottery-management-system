<template>
  <div class="bg-page">
    <div class="login">
      <v-form class=" font-weight-bold">
        <div class="my-3 text-center  header-login">
          <img
            src="https://image.smart-ai-api.com/public/lotto/smart-lotto-final-01%201.png"
          />

          <h4>กรอกข้อมูลเพื่อเข้าสู่ระบบ</h4>
        </div>
        <label>Username</label>
        <input
          label="Enter your username"
          required
          prepend-inner-icon="mdi-account"
          type="text"
          class="username mb-3"
          placeholder="Username"
          v-model="username"
        />
        <label>Password</label>
        <input
          label="Enter your password"
          required
          v-model="password"
          prepend-inner-icon="mdi-lock"
          type="password"
          placeholder="Password"
          class="password  mb-3"
        />
        <div class="action_login">
          <v-btn
            class="btn_login mx-auto"
            width="230px"
            rounded
            dark
            @click.prevent="auth()"
            >Login</v-btn
          >
        </div>
        <v-card-actions class="text--secondary">
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </div>
  </div>
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
      const token = sessionStorage.getItem("token");
      if (token) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
.bg-page {
  display: flex;
  align-items: center;
}
.header-login {
  img {
    width: 211px;
    height: auto;
    margin-bottom: 10px;
  }
  margin-bottom: 29px;
  text-align: center !important;
  h4 {
    color: gray !important;
  }
}

// Fonts
.login {
  margin: auto;
  button:hover {
    background-color: #ffffff;
  }
  .btn-register {
    z-index: 20;
    color: #000000;
    width: 100px;
    background: white;
    font-size: medium;
    border-radius: 40px;
    border: 3px solid #76650c;
    box-shadow: 0px 4px 7px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
    &:hover {
      opacity: 0.7;
    }
  }

  .btn_login {
    background: linear-gradient(
      to bottom right,
      #0374ff 0%,
      #3f4fd4 100%
    ) !important;
    font-weight: bold !important;
    color: rgb(255, 255, 255);
  }
  .action_login {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  input {
    display: block;
    width: 100%;
    margin: 10px 0px;
    height: 38px;
    background-color: rgb(185 185 185 / 41%) !important;
    border: none;
    box-sizing: border-box;
    border-radius: 49px;
    padding-right: 10px;
    color: rgb(0, 0, 0);
    width: 100%;
    font-size: 16px;
    padding-left: 46px;
    padding-right: 33px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    &:focus-visible {
      border: none;
    }
  }
}
@media only screen and (max-width: 600px) {
  .login {
    width: 90%;
  }
}
@media only screen and (min-width: 600px) {
  .login {
    width: 95%;
  }
}
@media only screen and (min-width: 1023px) {
  .login {
    width: 95%;
    padding: 30px 140px 43px 140px !important;
  }
  .img-mockup {
    display: inherit !important;
    position: absolute;
    left: -256px;
    top: 0;
    width: 400px;
  }
}
.img-mockup {
  display: none;
}
.login {
  .username {
    background: url("https://image.smart-ai-api.com/public/Rico-main-resite/round-account-button-with-user-inside.png")
      no-repeat left;
    background-position: 8px 3px;
    background-size: 32px;
  }
  .password {
    background: url("https://image.smart-ai-api.com/public/Rico-main-resite/padlock.png")
      no-repeat left;
    background-position: 8px 3px;
    background-size: 32px;
  }
  .agentkey {
    background: url("https://image.smart-ai-api.com/public/Rico-main-resite/key.png")
      no-repeat left;
    background-position: 8px 3px;
    background-size: 30px;
  }
  background-color: white;
  padding: 30px 100px 26px 101px;
  border-radius: 25px;
  position: relative;
  /* top: 50%; */
  /* left: 50%; */
  margin: auto;
  max-width: 800px;

  font-weight: bold !important;
  box-shadow: 0px 4px 20px 16px rgb(0 0 0 / 18%), 0 10px 10px rgb(0 0 0 / 11%);
}
::placeholder {
  color: rgb(75, 75, 75);
  opacity: 1; /* Firefox */
}

@keyframes wawes {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.feedback {
  position: absolute;
  margin-top: -25px;

  color: #ff4242;
}
@media (min-width: 767.98px) {
  .bg-page {
    background-image: url("https://image.smart-ai-api.com/public/lotto/bg%20%284%29.png");
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
}
@media (max-width: 320.98px) {
  .bg-page {
    background-image: url("https://image.smart-ai-api.com/public/lotto/BG%20%285%29.png");
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .section_logo {
    width: 100%;
    text-align: center;
    z-index: 15;
    position: relative;
    bottom: -6px;
    text-align: center;
  }
  .login {
    width: 95%;
    padding: 30px 30px 30px 30px !important;
  }
}
@media (max-width: 767.98px) and (min-width: 321px) {
  .bg-page {
    background-image: url("https://image.smart-ai-api.com/public/lotto/BG%20%285%29.png");
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .section_logo {
    width: 100%;
    text-align: center;
    z-index: 15;
    position: relative;
    bottom: -15px;
  }
  .login {
    padding: 30px 30px 30px 30px !important;
  }
}
</style>
