<template>
  <v-container fluid class="homefone">
    <AppHeader :pages="pages" :selected.sync="page"/>
    <v-content class="contact-fone">
      <v-row class="mx-auto">
        <v-col cols="12" md="4">
          <v-card flat class="transparent mx-auto" max-width="300">
            <v-card-title>
              <h1 d-none d-md-block>Feel free to contact us anytime</h1>
            </v-card-title>
            <v-card-text>
              <h3>address</h3>
              <p>{{ officeAddress }}</p>
              <p>{{ officePhone }}</p>
              <p><small>Let's connect</small></p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" class="mx-auto">
          <v-card flat class="transparent mx-auto" max-width="700">
            <v-row class="my-0">
              <v-col cols="12" md="6" class="input my-0">
                <p><b>Full name</b></p>
                <v-text-field
                        dence
                        outlined
                        v-model="fullName"
                        :hint="fullNameHint"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="input my-0">
                <p
                    :style="{ color: emailColor }"
                ><b>Email</b></p>
                <v-text-field
                        dence
                        outlined
                        v-model="email"
                        :error="emailError"
                        :hint="emailHint"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="input my-0">
                <p><b>Your enquiry</b></p>
                <v-textarea
                        outlined
                        width="80%"
                        height="110"
                        value=""
                        v-model="message"
                        hint="20 symbols or more"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row align-start justify-center max-height="50">
              <v-col class="input my-0">
                <v-btn
                    color="buttons"
                    dark
                    rounded
                    width="220"
                    height="40"
                    class="button-send-message"
                    @click="disabledButton || sendMessage"
                    :value="buttonValue"
                >
                  Send message
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- ============================= FOOTER && MAP ============================= -->
      <Map :height.sync="mapHeight"/>
    </v-content>
    <SuccessPopup :success.sync="success"/>
  </v-container>
</template>

<style scoped>

.contact-fone {
  margin-top: 160px!important;
  padding-top: 0px!important;
}
.button-send-message {
  padding: 0;
  margin-top: -30px!important;
  margin-bottom: 30px!important;
  margin-left: calc(50% - 110px);
}

h3, p, small {
  text-align: left;
}
.input {
  margin-bottom: 0;
  line-height: 0;
}

@media screen and (max-width: 420px) {
  .contact-fone {
    margin-top: 64px!important;
  }

}
</style>

<script>

import { mapState, mapGetters } from 'vuex'

import AppHeader from '@/components/home/AppHeader.vue'
import Map from '@/components/map/Map.vue'
import SuccessPopup from '@/components/contact/SuccessPopup.vue'

const emailValidator = require('email-validator')

export default {
  name: 'Home',
  components: {
    AppHeader,
    Map,
    SuccessPopup
  },
  data () {
    return {
      page: null,
      // pages: ['Home', 'About Us', 'Residential', 'Business', 'Connect', 'Sign In'],
      emailError: false,
      emailHint: '',
      emailColor: '#000',
      messageError: true,
      fullNameError: true,
      fullNameHint: '',
      buttonValue: '',
      success: false,
      mapHeight: 0
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'officeAddress', 'officePhone']),
    ...mapState('contact', ['userFullName', 'userEmail', 'userMessage']),
    ...mapGetters('contact', ['pages', 'selectors']),
    plans () {
      return this.selectors[this.page] === '#plans' ? this.pages[this.page].toLowerCase() : 'residential'
    },
    fullName: {
      get () { return this.userFullName },
      set (val) {
        this.$store.commit('contact/USER_FULL_NAME', val)
        this.fullNameError = this.fullName.length < 2
        this.fullNameHint = this.fullNameError ? 'Enter your full name please' : ''
      }
    },
    email: {
      get () { return this.userEmail },
      set (val) {
        this.emailError = !emailValidator.validate(val)
        this.emailColor = val && this.emailError ? '#f00' : '#000'
        this.emailHint = this.emailError ? 'Invalid email' : ''
        this.$store.commit('contact/USER_EMAIL', val)
      }
    },
    message: {
      get () { return this.userMessage },
      set (val) {
        this.messageError = this.message.length < 20
        this.$store.commit('contact/USER_MESSAGE', val)
      }
    },
    disabledButton () {
      const duplicated = this.buttonValue === this.fullName + this.email + this.message
      return duplicated || this.fullNameError || this.emailError || this.messageError
    }
  },
  watch: {
    page (val) {
      if (this.pages[val] === 'Contact Us') return
      if (this.pages[val] === 'Connect') {
        this.$router.push({ name: 'connect' })
        return
      }
      this.$router.push({ name: 'home', params: { page: val } })
    }
  },
  methods: {
    sendMessage () {
      // if (this.buttonValue === this.fullName + this.email + this.message) return
      this.buttonValue = this.fullName + this.email + this.message
      this.fullName = this.email = this.message = ''
      // const res = await this.$store.dispatch('contact/SEND_MESSAGE')
      // if (res) {
      this.success = true
      // }
    }
  },
  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>
