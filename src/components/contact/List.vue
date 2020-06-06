<template>
  <v-select
      :items="values"
      outlined
      hide-details
      class="combo-box-input"
      v-model="selected"
      :label="label"
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
  props: ['label', 'values', 'fieldName'],
  data () {
    return {
      //
    }
  },
  computed: {
    selected: {
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
  }
}
</script>
