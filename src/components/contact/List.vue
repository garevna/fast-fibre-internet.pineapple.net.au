<template>
  <v-select
      :items="field.available"
      outlined
      hide-details
      class="combo-box-input"
      v-model="selected"
      :label="field.placeholder"
  ></v-select>
</template>

<style scoped>
  .combo-box-input {
    margin-top: 24px;
    margin-bottom: 16px;
  }
</style>

<script>

export default {
  name: 'List',
  props: ['fieldIndex'],
  data () {
    return {
      //
    }
  },
  computed: {
    field () {
      return this.$store.state.contact.contactFormFields[this.fieldIndex]
    },
    selected: {
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
  }
}
</script>
