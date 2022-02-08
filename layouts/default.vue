<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" v-text="title" />
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

    <v-navigation-drawer v-model="drawer" :clipped="clipped" app fixed>
      <template>
        <v-card class="mt-5 ma-2" tile>
          <v-row>
            <v-col class="py-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    LOGO
                  </v-list-item-title>
                  <v-list-item-subtitle>WEB Name</v-list-item-subtitle>
                  <v-list-item-subtitle>Username : </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </template>
      <v-list nav dense>
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            avatar
            class="v-list-item "
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="font-weight-bold" v-text="link.title" />
          </v-list-item>

          <v-list-group
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title class="font-weight-bold">{{
                link.title
              }}</v-list-item-title>
            </template>

            <v-list-item
              style="padding-left:30px !important"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                class="font-weight-bold"
                v-text="sublink.text"
              />
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
  // middleware: "auth",
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
          icon: "mdi-view-dashboard",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "สรุปผล",
              to: "/"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ผล Win/Lose ตามประเภทหวย",
              to: "/account/changepassword"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ผลหวยที่ออกไปแล้ว",
              to: "/account/changepasswd"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการหวยที่กำลังจะออก",
              to: "/account/changepassd"
            }
          ]
        },
        {
          title: "รายงานการแทง",
          to: "/staff",
          icon: "mdi-account",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "ผลรวม / Bet Summary",
              to: "/account/profile"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงาน Agent Win/Lose ",
              to: "/account/chanword"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงาน Member Win/Lose ",
              to: "/account/changeord"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ยกเลิกโพย รายการแทง ",
              to: "/account/changepassd"
            }
          ]
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
              text: "อัตราจ่ายตามประเภทชนิดหวย",
              to: "/lottosetting/typecategory"
            },
            {
              icon: "mdi-view-dashboard",
              text: "อัตราจ่ายน้ำไหล",
              to: "/lottosetting/lottonumbertype"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ราคาขายขั้นต่ำ/สูงสุด",
              to: "/lottosetting/listlotto"
            }
          ]
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
        let token = localStorage.getItem("key");
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
