<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon large @click.stop="drawer = !drawer" color="black" />
      <v-toolbar-title v-text="title" class="font-weight-bold" />
      <v-spacer />
      <v-speed-dial
        absolute
        right
        direction="bottom"
        transition="slide-y-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon large center>mdi-account-circle </v-icon>
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
      dark
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="300"
      ><v-toolbar-title class="font-weight-bold  text-center" align-center>
        <v-img
          height="65"
          contain
          class="ma-auto my-5"
          src="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/smart-lotto-final3D%201.png"
        ></v-img>
      </v-toolbar-title>
      <v-list dense class="red_list">
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            active-class="black--text active_list white"
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
            active-class="black--text active_list white"
            v-else
            :key="link.title"
            class="white--text"
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title class=" h1">{{
                link.title
              }}</v-list-item-title>
            </template>

            <v-list-item
              dark
              active-class="black--text active_list white"
              style="padding-left: 30px !important;"
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
  head: {
    title: process.env.TITLE,
    meta: [
      {
        hid: "description",
        name: "description",
        content: "SMARTLOTTO"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: require("@/assets/image/" + process.env.LOGOTITLE)
      }
    ]
  },
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
          icon: "mdi-chart-bar",
          status: true
        },
        {
          title: "รายงาน",
          to: "/staff",
          icon: "mdi-clipboard-text",
          status: true,
          subLinks: [
            {
              icon: "mdi-medal",
              text: "รายงานผลรางวัล",
              to: "/report/reportAward",
              status: true
            },
            {
              icon: "mdi-finance",
              text: "กำไร / ขาดทุน",
              to: "/report/prfit",
              status: true
            },
            {
              icon: "mdi-clipboard-edit-outline",
              text: "ยกเลิกโพย / รายการแทง",
              to: "/report/betReport",
              status: true
            },
            {
              icon: "mdi-clipboard",
              text: "รายงานตัวเลข",
              to: "/report/reportnumber",
              status: true
            }
          ]
        },
        {
          title: "คำนวณผลรางวัล",
          to: "/award",
          icon: "mdi-certificate",
          status: true
        },
        {
          title: "ตั้งค่าหวย",
          to: "/staff",
          icon: "mdi-cog-sync",
          status: true,
          subLinks: [
            {
              icon: "mdi-typewriter",
              text: "ประเภทหวย",
              to: "/lottosetting/lottotype",
              status: true
            },
            {
              icon: "mdi-dots-square",
              text: "โปรแกรมหวย",
              to: "/lottosetting/programlotto",
              status: true
            },
            {
              icon: "mdi-clipboard-pulse",
              text: "ประเภทการแทง",
              to: "/lottosetting/settingtype",
              status: true
            }
          ]
        },
        {
          title: "ตั้งค่า",
          to: "/company",

          icon: "mdi-cog",
          status: true,
          subLinks: [
            {
              icon: "mdi-timer-outline",
              text: "รอบหวย",
              to: "/setting/lottoSchedule",
              status: true
            },
            {
              icon: "mdi-toggle-switch-off",
              text: "เปิดปิดหวย",
              to: "/setting/onOff",
              status: true
            },
            {
              icon: "mdi-toggle-switch-off-outline",
              text: "เปิดปิดหวยลูก",
              to: "/setting/onOffChild",
              status: true
            }
          ]
        },
        {
          title: "เพลา",
          to: "/pay_rate/rate",
          icon: "mdi-tune-variant",
          status: true
        },
        {
          title: "น้ำไหล",
          to: "/flexodd",
          icon: "mdi-tune-vertical",
          status: true
        },
        {
          title: "Company Setting",
          to: "/company",
          icon: "mdi-credit-card-plus-outline",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "แบ่งหุ้น/ถือสู้",
              to: "/account/profile",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการ Agent",
              to: "/account/chanword",
              status: true
            }
          ]
        },
        {
          title: "Agent Setting",
          to: "/agent",
          icon: "mdi-credit-card-plus-outline",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "ส่วนแบ่งที่ได้รับ",
              to: "/account/profile",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "อัตราจ่ายคอมมิชชั่น",
              to: "/account/chanword",
              status: true
            }
          ]
        },
        {
          title: "Member Setting",
          to: "/member",
          icon: "mdi-credit-card-plus-outline",
          status: true
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
        let token = sessionStorage.getItem("token");
        if (token) {
          sessionStorage.clear();
          this.$router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
