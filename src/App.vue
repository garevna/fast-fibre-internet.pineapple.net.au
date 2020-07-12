<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-if="ready">
      <AppHeader :page.sync="page"/>
      <v-sheet
        width="100%"
        max-width="1440"
        color="homefone"
        tile
        class="mx-auto"
      >
        <section id="top" style="width: 100%">
          <div class="base-title">
            <a href="#top" class="core-goto"></a>
            <Top :page.sync="page" />
          </div>
        </section>
      </v-sheet>

      <!-- ============================= USER CONTACT ============================= -->

      <v-sheet
          width="100%"
          max-width="1440"
          color="homefone"
          tile
          class="mx-auto"
      >
        <v-row align="center" class="mx-0 px-0">
          <v-col cols="12" md="6" class="aside-col">
            <section id="benefit" style="width: 100%">
              <div class="base-title">
                <a href="#benefit" class="core-goto"></a>
                <Aside />
              </div>
            </section>
          </v-col>
          <v-col cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <section id="contact" style="width: 100%">
                <div class="base-title">
                  <a href="#contact" class="core-goto"></a>
                  <v-card flat class="transparent mx-0">
                      <v-card
                            flat
                            class="user-contact transparent mx-auto pa-0"
                            style="margin-bottom: 80px"
                      >
                        <UserContact
                              :userForm.sync="userForm"
                              :emailSubject="emailSubject"
                              :emailText="emailText"
                              :emailEndpoint="mailEndpoint"
                              v-if="userForm && userForm.fieldsToShow"
                        />
                      </v-card>
                    </v-card>
                  </div>
                </section>
              </v-row>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row width="100%" justify="center">
        <section id="how-to-connect" class="mx-auto">
          <div class="base-title">
            <a href="#how-to-connect" class="core-goto"></a>
            <HowToConnect :page.sync="page" />
          </div>
        </section>
      </v-row>
      <!-- ============================= INTERNET PLANS ============================= -->
      <v-row width="100%" justify="center">
        <section id="plans">
          <div class="base-title">
            <a href="#plans" class="core-goto"></a>
            <InternetPlans :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%" justify="center">
        <section id="testimonials">
          <div class="base-title">
            <a href="#testimonials" class="core-goto"></a>
            <Testimonials :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= FAQ ============================= -->
      <v-row width="100%" justify="center">
        <section id="faq" style="width: 100%">
          <div class="base-title">
            <a href="#faq" class="core-goto"></a>
            <FAQ :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= FOOTER ============================= -->
      <section id="footer" class="homefone">
        <div class="base-title">
          <a href="#footer" class="core-goto"></a>
            <v-row width="100%">
              <Footer :page.sync="page" :user.sync="user" />
            </v-row>
        </div>
      </section>
    </v-container>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import 'pineapple-styles'

/* SystemBar */
import 'pineapple-system-bar'
import 'pineapple-system-bar/dist/pineapple-system-bar.css'

/* HowToConnect */
import 'pineapple-how-to-connect'
import 'pineapple-how-to-connect/dist/pineapple-how-to-connect.css'

/* Testimonials */
import 'pineapple-testimonials'
import 'pineapple-testimonials/dist/pineapple-testimonials.css'

/* InternetPlans */
import 'pineapple-internet-plans'
import 'pineapple-internet-plans/dist/pineapple-internet-plans.css'

/* Popup */
import 'pineapple-popup'
import 'pineapple-popup/dist/pineapple-popup.css'

/* UserContact */
import 'pineapple-contact-form'
import 'pineapple-contact-form/dist/pineapple-contact-form.css'

/* FAQ */
import 'pineapple-faq'
import 'pineapple-faq/dist/pineapple-faq.css'

/* Footer */
import 'pineapple-footer'
import 'pineapple-footer/dist/pineapple-footer.css'

import AppHeader from '@/components/AppHeader.vue'
import Top from '@/components/Top.vue'
import Aside from '@/components/Aside.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Top,
    Aside
  },
  data () {
    return {
      page: null,
      user: {
        name: '',
        email: '',
        phone: ''
      },
      plans: false,
      ready: false
    }
  },
  computed: {
    ...mapState(['viewport', 'viewportWidth', 'pages', 'selectors']),
    ...mapState('content', ['userForm']),
    ...mapState('contact', ['mailEndpoint', 'emailSubject', 'emailText']),
    ...mapActions('content', {
      getPageContent: 'GET_CONTENT'
    }),
    ...mapActions('testimonials', {
      getTestimonials: 'GET_CONTENT'
    })
  },
  watch: {
    page (val) {
      if (!val) return
      this.$vuetify.goTo(val, {
        duration: 500,
        offset: 20,
        easing: 'easeInOutCubic'
      })
      this.page = undefined
    }
  },
  methods: {
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  },
  beforeMount () {
    this.getTestimonials.then(() => {})
    this.getPageContent
      .then((response) => {
        this.ready = !!response
        document.title = response
      })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
