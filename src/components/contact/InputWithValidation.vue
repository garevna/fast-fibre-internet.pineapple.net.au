<template>
  <v-text-field
      :placeholder="label"
      outlined
      hide-details
      height="32"
      :color="color"
      v-model="result"
      class="user-inputs"
      :append-icon="validationIcon"
      @input="validate($event)"
  ></v-text-field>
</template>

<style scoped>

.v-text-field.v-text-field--enclosed {
  margin-bottom: 4px!important;
}

.user-inputs {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #656565;
}

@media screen and (max-width: 600px) {
  .user-inputs {
    font-size: 14px;
  }
}
@media screen and (max-width: 320px) {
  .user-inputs {
    font-size: 13px;
  }
}
</style>

<script>

export default {
  name: 'InputWithValidation',
  props: ['label', 'fieldName', 'validator'],
  data () {
    return {
      normalColor: '#656565',
      errorColor: '#FF0E00',
      validColor: '#4CAF50',
      color: '#656565',
      validationIcon: '',
      available: null
    }
  },
  computed: {
    result: {
      get () {
        return this.$store.state.contact.contactFormFields[this.fieldName].value
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          prop: this.fieldName,
          value: val
        })
      }
    }
  },
  methods: {
    validate (val) {
      this.error = !this.validator(val)
      this.$store.commit('contact/SET_ERROR', {
        prop: this.fieldName,
        value: this.error
      })
      this.color = val.length === 0 ? this.normalColor : this.error ? this.errorColor : this.validColor
      this.validationIcon = this.error ? '$invalid' : ''
    }
  },
  mounted () {
    this.available = this.$store.state.contact.contactFormFields[this.fieldName].available
    if (this.available) {
      this.validator = val => this.avalable.indexOf(val) !== -1
    }
  }
}
</script>
