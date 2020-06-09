/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const emailValidator = require('email-validator')

const state = {
  mailEndpoint: 'https://api.pineapple.net.au/email/landing',
  emailSubject: '',
  emailText: '',
  messageForMail: '',
  contactFormFields: []
}

const getters = {
  pages: (state, getters, rootState) => rootState.pages.filter(item => item !== 'Contact Us'),
  selectors: (state, getters, rootState) => rootState.selectors.filter(item => item !== '#contact'),
  types: (state, getters, rootState) => rootState.fieldTypes,
  validators: (state, getters, rootState) => rootState.validators
}

const mutations = {
  UPDATE_USER_INFO: (state, payload) => { state.contactFormFields[payload.num].value = payload.value },
  UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
  UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
  UPDATE_FIELD: (state, payload) => {
    state.contactFormFields[payload.num][payload.prop] = payload.value
  },
  CREATE_MESSAGE: (state) => {
    const details = []
    let message = ''
    for (const field of state.contactFormFields) {
      if (field.type === 'textarea') {
        message = `
          <fieldset>
            <legend>Your message:</legend>
            <p>${field.value.split('\n').join('<br>')}</p>
          </fieldset>
        `
      } else details.push(`<p>${field.placeholder}: ${field.value}</p>`)
    }
    state.messageForMail = `
      <p>${state.emailText}</p>
      <fieldset>
        <legend>Details:</legend>
        ${details.join('')}
      </fieldset>
      ${message}
    `
  },
  SET_ERROR: (state, payload) => {
    state.contactFormFields[payload.num].error = payload.value
  },
  CLEAR_ALL_FIELDS: (state) => {
    for (const field of state.contactFormFields) {
      field.value = ''
      field.error = false
    }
  }
}

const actions = {

  SET_FIELDS_TO_SHOW ({ state, getters }, payload) {
    state.contactFormFields = payload.map((field) => {
      return {
        type: getters.types[field.type],
        placeholder: field.placeholder,
        required: field.required,
        value: '',
        validator: getters.validators[field.type],
        error: false,
        available: field.type === 'state' ? ['VIC', 'NSW', 'ACT', 'QLD', 'SA', 'WA', 'TAS', 'NT'] : field.available || null
      }
    })
  },
  async SEND_EMAIL ({ state, commit }) {
    let error = false
    for (const field in state.contactFormFields) {
      if (state.contactFormFields[field].show) {
        error = error || state.contactFormFields[field].error || !state.contactFormFields[field].value
      }
    }
    if (error) return false
    const email = state.contactFormFields.find(item => item.placeholder.match(/email/i))
    if (!email) return
    commit('CREATE_MESSAGE')
    const response = await (await fetch(state.mailEndpoint, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: state.emailSubject,
        email: email.value,
        message: state.messageForMail
      })
    })).json()
    console.log(response)
    commit('CLEAR_ALL_FIELDS')
    return true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
