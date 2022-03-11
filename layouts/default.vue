<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-speed-dial
        absolute
        right
        direction="bottom"
        transition="slide-y-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="orange">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="logout" fab dark small color="red">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="300"
      ><v-toolbar-title class="font-weight-bold pa-4 text-center" align-center>
        <v-img
          height="100"
          contain
          class="ma-auto my-5"
          src="https://image.smart-ai-api.com/public/image-storage/smartlotto/logosmartlotto.png"
        ></v-img>
      </v-toolbar-title>
      <v-list dense class="red_list">
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            active-class="active_list "
            v-if="!link.subLinks"
            :to="link.to"
            class="v-list-item font-weight-bold "
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="" v-text="link.title" />
          </v-list-item>

          <v-list-group
            active-class=" deep-purple--text"
            v-else
            :key="link.title"
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title class=" h1">{{
                link.title
              }}</v-list-item-title>
            </template>

            <v-list-item
              active-class="active_list"
              style="padding-left: 30px !important;margin-right: 5px;margin-left: 5px;"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container>
        <v-slide-x-transition>
          <Nuxt />
        </v-slide-x-transition>
      </v-container>
    </v-main>

    <v-footer> </v-footer>
  </v-app>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  middleware: "auth",
  data() {
    return {
      fab: false,
      dialogOutside: false,
      dialogInside: false,
      clipped: false,
      drawer: true,
      fixed: false,

      items: [
        {
          title: "Dashboard",
          to: "/",
          icon: "mdi-view-dashboard"
        },
        {
          title: "รายงาน",
          to: "/staff",
          icon: "mdi-account",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "รายงานผลรางวัล",
              to: "/report/reportAward"
            },
            {
              icon: "mdi-view-dashboard",
              text: "กำไร / ขาดทุน",
              to: "/report/chanword"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ยกเลิกโพย / รายการแทง",
              to: "/report/betReport"
            }
          ]
        },
        {
          title: "ผลรางวัล",
          to: "/award",
          icon: "mdi-view-dashboard"
        },
        {
          title: "ตั้งค่าหวย",
          to: "/staff",
          icon: "mdi-credit-card-check",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "ประเภทหวย",
              to: "/lottosetting/lottotype"
            },
            {
              icon: "mdi-view-dashboard",
              text: "โปรแกรมหวย",
              to: "/lottosetting/programlotto"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ประเภทการแทง",
              to: "/lottosetting/settingtype"
            }
          ]
        },
        {
          title: "ตั้งค่า",
          to: "/company",
          icon: "mdi-credit-card-plus-outline",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "รอบหวย",
              to: "/setting/lottoSchedule"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เปิดปิดหวย",
              to: "/setting/onOff"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เปิดปิดหวยลูก",
              to: "/setting/onOffChild"
            }
          ]
        },
        {
          title: "เพลา",
          to: "/pay_rate/rate",
          icon: "mdi-credit-card-plus-outline"
        },
        {
          title: "น้ำไหล",
          to: "/flexodd",
          icon: "mdi-credit-card-plus-outline"
        },
        {
          title: "Company Setting",
          to: "/company",
          icon: "mdi-credit-card-plus-outline",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "แบ่งหุ้น/ถือสู้",
              to: "/account/profile"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการ Agent",
              to: "/account/chanword"
            }
          ]
        },
        {
          title: "Agent Setting",
          to: "/agent",
          icon: "mdi-credit-card-plus-outline",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "ส่วนแบ่งที่ได้รับ",
              to: "/account/profile"
            },
            {
              icon: "mdi-view-dashboard",
              text: "อัตราจ่ายคอมมิชชั่น",
              to: "/account/chanword"
            }
          ]
        },
        {
          title: "Member Setting",
          to: "/member",
          icon: "mdi-credit-card-plus-outline"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "SMART LOTTO"
    };
  },
  async created() {
    // await this.checkauthen();
  },
  methods: {
    // ...mapActions("auth", {
    //   auth: "login"
    // }),
    async logout() {
      try {
        let token = localStorage.getItem("token");
        if (token) {
          localStorage.clear();
          this.$router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
