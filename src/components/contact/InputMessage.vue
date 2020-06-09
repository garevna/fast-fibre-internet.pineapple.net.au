<template>
  <v-textarea
        :placeholder="label"
        outlined
        color="#656565"
        style="margin-top:32px!important;"
        auto-grow
        v-model="message"
        class="user-inputs"
  ></v-textarea>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'InputMessage',
  props: ['label', 'fieldIndex'],
  data () {
    return {
      //
    }
  },
  computed: {
    message: {
      get () {
        return this.$store.state.contact.contactFormFields[this.fieldIndex].value
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          num: this.fieldIndex,
          value: val
        })
      }
    }
  }
}
</script>
