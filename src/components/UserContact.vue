<template>
  <v-card class="user-info mx-auto pa-6 homefone" max-width="480">
    <v-card-title>
      <h4>{{ userForm.title }}</h4>
    </v-card-title>
    <v-card-text class="mx-0 px-0" width="100%">
      <div v-for="(field, index) in fields" :key="index">
        <InputWithValidation
              :label="field.placeholder"
              :fieldIndex="index"
              :validator="field.validator"
              v-if="field.type === 'input-with-validation'"
        />
        <List
              label="field.placeholder"
              :values="field.available"
              :fieldIndex="index"
              v-if="field.type === 'selector'"
        />
        <InputPhoneNumber
              v-if="field.type === 'phone-number'"
              :fieldIndex="index"
        />
        <NumberInput
              :label="field.placeholder"
              :fieldIndex="index"
              v-if="field.type === 'number'"
        />
        <Combo
              :label="field.placeholder"
              :values="field.available"
              :fieldIndex="index"
              v-if="field.type === 'combobox'"
        />
        <InputMessage
              :label="field.placeholder"
              :fieldIndex="index"
              v-if="field.type === 'textarea'"
        />
      </div>
    </v-card-text>

    <v-card-text class="ma-auto" width="50%" height="10">
      <v-progress-linear
          color="#f50"
          buffer-value="0"
          stream
          v-if="progress"
      ></v-progress-linear>
    </v-card-text>

    <v-card-actions class="text-center">
      <v-btn
          color="buttons"
          dark
          min-width="180"
          height="48"
          class="submit-button px-auto mx-auto"
          @click="sendUserRequest"
      >
        {{ userForm.button }}
      </v-btn>
    </v-card-actions>

    <Popup :opened.sync="popupOpened" />
    <PopupEmailDisabled :opened.sync="popupEmailDisabled" />
    <PopupError :opened.sync="popupErrorOpened" />
  </v-card>
</template>

<style scoped>

.user-info {
  width: 640px;
  padding-left: 80px;
  border-radius: 15px!important;
}
h4 {
  width: 100%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 8px;
}

@media screen and (max-width: 600px) {
  .v-btn__content {
    font-size: 16px!important;
  }
  .user-info {
    width: 100%!important;
    /* padding-left: 40px; */
  }
}
@media screen and (max-width: 320px) {
  .user-info {
    width: 300px!important;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>

<script>

import { mapState, mapActions } from 'vuex'

import InputWithValidation from '@/components/contact/InputWithValidation.vue'
import InputPhoneNumber from '@/components/contact/InputPhoneNumber.vue'
import List from '@/components/contact/List.vue'
import NumberInput from '@/components/contact/Number.vue'
import Combo from '@/components/contact/Combo.vue'
import InputMessage from '@/components/contact/InputMessage.vue'

import Popup from '@/components/contact/Popup.vue'
import PopupEmailDisabled from '@/components/contact/PopupEmailDisabled.vue'
import PopupError from '@/components/contact/PopupError.vue'

export default {
  name: 'UserContact',
  components: {
    InputPhoneNumber,
    InputWithValidation,
    List,
    NumberInput,
    Combo,
    InputMessage,
    Popup,
    PopupEmailDisabled,
    PopupError
  },
  data () {
    return {
      popupOpened: false,
      popupEmailDisabled: false,
      popupErrorOpened: false,
      fields: null,
      progress: false
    }
  },
  computed: {
    ...mapState('content', ['userForm']),
    ...mapState('contact', ['contactFormFields'])
  },
  watch: {
    contactFormFields: {
      deep: true,
      handler (val) {
        this.fields = JSON.parse(JSON.stringify(val))
      }
    }
  },

  methods: {
    ...mapActions('contact', {
      sendEmail: 'SEND_EMAIL'
    }),
    initFields () {
      this.$store.commit('contact/CLEAR_ALL_FIELDS')
    },

    async sendUserRequest () {
      if (location.host === 'garevna.github.io' || location.port) {
        this.popupEmailDisabled = true
        return
      }
      this.progress = true
      if (await this.sendEmail()) this.popupOpened = true
      else this.popupErrorOpened = true
      this.progress = false
    }
  },
  mounted () {
    this.fields = this.contactFormFields
  }
}

</script>
