<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon large @click.stop="drawer = !drawer" color="black" />
      <v-toolbar-title v-text="title" class="font-weight-bold ClassTextBar" />
      <v-spacer />
      <v-chip outlined color="success" class="mx-3 font-weight-bold"
        ><v-icon left>mdi-account-circle</v-icon>{{ this.showUser }}</v-chip
      >
      <v-speed-dial direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon large center>mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-tooltip left color="orange">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              small
              color="orange"
              @click="$router.push('/changepassword')"
            >
              <v-icon>mdi-repeat-variant</v-icon>
            </v-btn></template
          >
          <span>เปลี่ยนรหัสผ่าน</span>
        </v-tooltip>

        <v-tooltip left color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="logout"
              fab
              dark
              small
              color="red"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn></template
          >
          <span>ออกจากระบบ</span>
        </v-tooltip>
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
          style="cursor:pointer;"
          @click="$router.push('/')"
          height="65"
          contain
          class="ma-auto my-5 pointer"
          src="https://image.smart-ai-api.com/public/image-storage/smartlotto/newdesign/smart-lotto-final3D%201.png"
        ></v-img>
      </v-toolbar-title>
      <v-list dense class="red_list">
        <div v-for="(link, i) in menurender" :key="i">
          <v-list-item
            active-class="black--text active_list white"
            v-if="!link.subLinks"
            :to="link.to"
            :disabled="link.status == false"
            class="v-list-item font-weight-bold "
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="" v-text="link.title" />
            <div v-if="link.status == false" class="commingsoon">
              comingsoon
            </div>
          </v-list-item>

          <v-list-group
            active-class="black--text active_list white"
            v-else
            :key="link.title"
            class="white--text"
            :prepend-icon="link.icon"
            :disabled="link.status == false"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title class=" h1">{{
                link.title
              }}</v-list-item-title>
              <div v-if="link.status == false" class="commingsoon">
                comingsoon
              </div>
            </template>

            <v-list-item
              dark
              active-class="black--text active_list white"
              style="padding-left: 30px !important;"
              :disabled="link.status == false"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
              <div v-if="link.status == false" class="commingsoon">
                comingsoon
              </div>
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
import { mapActions, mapMutations } from "vuex";
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
  computed: {
    menurender() {
      if (this.$store.state.auth.role === "LOTTO") {
        return this.items;
      } else {
        let menu = [
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
                to: "/report/profitReport",
                status: true
              },
              {
                icon: "mdi-clipboard-edit-outline",
                text: "รายการแทง",
                to: "/report/betReport",
                status: true
              },
              // {
              //   icon: "mdi-numeric",
              //   text: "รายงานตัวเลข",
              //   to: "/report/reportnumber",
              //   status: true
              // },
              {
                icon: "mdi-file-table-box-outline",
                text: "รายงานน้ำไหล ปัจจุบัน",
                to: "/report/reportFlexodd",
                status: true
              },
              // {
              //   icon: "mdi-currency-usd",
              //   text: "รายงานส่วนต่างอัตราจ่าย",
              //   to: "/report/reportOutcomerate",
              //   status: true
              // }
            ]
          },
          {
            title: "คำนวณผลรางวัล",
            to: "/award",
            icon: "mdi-certificate",
            status: true
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
                text: "เปิดปิดหวยในสายงาน",
                to: "/setting/onOffChild",
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
          // {
          //   title: "เพลา",
          //   to: "/pay_rate/rate",
          //   icon: "mdi-tune-variant",
          //   status: true
          // },
          {
            title: "น้ำไหล",
            to: "/flexodd",
            icon: "mdi-tune-vertical",
            status: true
          },
          {
            title: "รายการสมาชิก",
            to: "/reportAccount",
            icon: "mdi-account",
            status: true
          }
        ];
        return menu;
      }
    }
  },
  data() {
    return {
      showUser: "",
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
              to: "/report/profitReport",
              status: true
            },
            {
              icon: "mdi-clipboard-edit-outline",
              text: "รายการแทง",
              to: "/report/betReport",
              status: true
            },
            // {
            //   icon: "mdi-numeric",
            //   text: "รายงานตัวเลข",
            //   to: "/report/reportnumber",
            //   status: true
            // },
            {
              icon: "mdi-file-table-box-outline",
              text: "รายงานน้ำไหล ปัจจุบัน",
              to: "/report/reportFlexodd",
              status: true
            },
            {
              icon: "mdi-currency-usd",
              text: "รายงานส่วนต่างอัตราจ่าย",
              to: "/report/reportOutcomerate",
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
              text: "เปิดปิดหวยในสายงาน",
              to: "/setting/onOffChild",
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
        // {
        //   title: "เพลา",
        //   to: "/pay_rate/rate",
        //   icon: "mdi-tune-variant",
        //   status: true
        // },
        {
          title: "น้ำไหล",
          to: "/flexodd",
          icon: "mdi-tune-vertical",
          status: true
        },
        {
          title: "รายการสมาชิก",
          to: "/reportAccount",
          icon: "mdi-account",
          status: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "SMART LOTTO"
    };
  },
  async fetch() {
    this.showUser =
      localStorage.getItem("username") || sessionStorage.getItem("username");
  },
  async created() {
    await this.getLottotype();

    // await this.checkauthen();
  },
  async mounted() {},
  methods: {
    ...mapActions("lottosetting", ["getLottotype"]),

    async logout() {
      try {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
