<template>
  <v-text-field
      :placeholder="field.placeholder"
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
  name: 'NumberInput',
  props: ['fieldIndex'],
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
    field () {
      return this.$store.state.contact.contactFormFields[this.fieldIndex]
    },
    result: {
      get () {
        return this.field.value
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          num: this.fieldIndex,
          value: val
        })
      }
    }
  },
  methods: {
    validate (val) {
      this.error = !val.match(/^[0-9]*$/)
      this.$store.commit('contact/SET_ERROR', {
        num: this.fieldIndex,
        value: this.error
      })
      this.color = val.length === 0 ? this.normalColor : this.error ? this.errorColor : this.validColor
      this.validationIcon = this.error ? '$invalid' : ''
    }
  }
}
</script>
