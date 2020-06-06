<template>
  <v-container fluid v-scroll="onScroll">
    <AppHeader :pages="pages" :selected.sync="page"/>
    <v-content tag="main" class="homefone">
      <!-- ============================= HOME ============================= -->
      <section id="top" class="mb-12">
        <div class="base-title">
          <a href="#top" class="mr-2 d-inline-flex core-goto text--primary"></a>
          <Top/>
        </div>
      </section>
      <!-- ============================= CHECK AVAILABILITY ============================= -->
      <section id="check" class="my-12">
        <div class="base-title">
          <a href="#check" class="mr-2 d-inline-flex core-goto text--primary"></a>
        <!-- </div>
        <div class="text-center base-title mx-auto"> -->
          <CheckAvailability
              :residential.sync="residential"
              :business.sync="business"
              :contact.sync="contactUs"
          />
        </div>
        <SpeedTest/>
      </section>

      <!-- ============================= ABOUT ============================= -->
      <section id="about" class="mb-12">
        <div class="base-title">
          <a href="#about" class="mr-2 d-inline-flex core-goto text--primary"></a>
          <WhoAreWe/>
        </div>
      </section>

      <!-- ============================= INTERNET PLANS  ============================= -->
      <section id="plans">
        <div class="base-title">
          <a href="#plans" class="core-goto"></a>
          <InternetPlans :connect.sync="getConnected" :contact.sync="contactUs"/>
        </div>
      </section>

      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row width="100%">
        <HowToConnect :contact.sync="contactUs" :connect.sync="getConnected" />
      </v-row>

      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%">
        <Testimonials/>
      </v-row>

      <!-- ============================= FOOTER ============================= -->
      <section id="footer">
        <div class="base-title">
          <a href="#footer" class="core-goto"></a>
            <v-row width="100%">
              <Footer :page.sync="page" :user.sync="user"/>
            </v-row>
        </div>
      </section>

    </v-content>
  </v-container>
</template>

<style>

</style>

<script>

import { mapState, mapGetters } from 'vuex'

import AppHeader from '@/components/home/AppHeader.vue'
import Top from '@/components/home/Top.vue'
import CheckAvailability from '@/components/home/CheckAvailability.vue'
import WhoAreWe from '@/components/home/WhoAreWeCircles.vue'
import InternetPlans from '@/components/home/InternetPlans.vue'
import Footer from '@/components/home/Footer.vue'
import HowToConnect from '@/components/home/HowToConnect.vue'
import SpeedTest from '@/components/home/SpeedTest.vue'
import Testimonials from '@/components/home/Testimonials.vue'

export default {
  name: 'Home',
  components: {
    InternetPlans,
    Top,
    CheckAvailability,
    WhoAreWe,
    Footer,
    HowToConnect,
    AppHeader,
    SpeedTest,
    Testimonials
  },
  data () {
    return {
      page: 0,
      user: {
        name: '',
        email: '',
        phone: ''
      },
      contactUs: false,
      getConnected: false,
      business: false,
      residential: false
    }
  },
  computed: {
    ...mapState(['plan', 'pages', 'selectors']),
    ...mapGetters('clientInfo', ['address', 'addressAvalable'])
  },
  watch: {
    contactUs (val) {
      if (val) this.$router.push({ name: 'contact' })
    },
    getConnected (val) {
      if (val) this.$router.push({ name: 'connect' })
    },
    business (val) {
      if (val) {
        this.page = this.pages.indexOf('Business')
      }
    },
    residential (val) {
      this.page = this.pages.indexOf('Residential')
    },
    page (val) {
      if (this.selectors[val] === '#connect') {
        if (this.addressAvalable) {
          this.$router.push({ name: 'connect' })
        } else {
          this.$vuetify.goTo('#check', {
            duration: 500,
            offset: 200,
            easing: 'easeInOutCubic'
          })
        }
        this.page = undefined
        return
      }
      if (this.selectors[val] === '#contact') {
        this.$router.push({ name: 'contact' })
        return
      }
      if (this.selectors[val] === '#plans') {
        this.$store.commit('CHANGE_PLAN', this.pages[this.page].toLowerCase())
      }
      if (this.selectors[val]) {
        this.$vuetify.goTo(this.selectors[val], {
          duration: 500,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      }
    }
  },
  methods: {
    onScroll (event) {
      const scrollValue = window.pageYOffset || document.documentElement.scrollTop
      if (scrollValue === 0) this.page = 0
    }
  },
  mounted () {
    this.page = this.$route.params.page || 0
  }
}
</script>
