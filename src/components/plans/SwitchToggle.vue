<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <label id="switch" class="switch residential">
        <input id="switch-toggle" type="checkbox">
        <span id="slider" class="slider residential"></span>
        <span class="text text-left">Residential</span>
        <span class="text text-right">Business</span>
      </label>
    </v-col>
  </v-row>
</template>

<style scoped>
* {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  font-family: 'Gilroy';
  font-size: 22px!important;
  font-weight: 600!important;
}

.switch {
  position: relative;
  display: inline-block;
  width: 360px;
  height: 60px;
}

.switch > span.text {
  position: absolute;
  top: 20px;
  color: #fff;
  z-index:0;
  cursor: pointer;
}

.text-left {
  left: 40px;
}
.text-right {
  right: 40px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #72BF44;
  -webkit-transition: .4s;
      -ms-transition: .4s;
       -o-transition: .4s;
          transition: .4s;
  border: solid 3px #72BF44;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border-radius: 36px;
}

.slider:before {
  position: absolute;
  color: #72BF44;
  padding: 16px 0;
  text-align: center;
  border-radius: 36px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  height: 54px;
  width: 180px;
  top:0;
  left: 0px;
  bottom: 0px;
  background-color: white;
  -webkit-transition: .4s;
       -o-transition: .4s;
          transition: .4s;
  z-index: 1;
}

input:checked + .slider {
  background-color: #72BF44;
}

.slider:focus {
  -webkit-box-shadow: 0px 0px 2px #0009;
          box-shadow: 0px 0px 2px #0009;
}

.slider.business:before {
  content: 'Business';
  -webkit-animation: switch-on-wide 0.5s ease forwards;
          animation: switch-on-wide 0.5s ease forwards;
  -webkit-transition: .4s;
       -o-transition: .4s;
          transition: .4s;
}
.slider.residential:before {
  content: 'Residential';
  -webkit-animation: switch-off-wide 0.5s ease forwards;
          animation: switch-off-wide 0.5s ease forwards;
  -webkit-transition: .4s;
       -o-transition: .4s;
          transition: .4s;
}

@-webkit-keyframes switch-on-wide {
    0% { -webkit-transform: translateX(0); transform: translateX(0); }
  100% { -webkit-transform: translateX(174.5px); transform: translateX(174.5px); }
}

@keyframes switch-on-wide {
    0% { -webkit-transform: translateX(0); transform: translateX(0); }
  100% { -webkit-transform: translateX(174.5px); transform: translateX(174.5px); }
}

@-webkit-keyframes switch-off-wide {
    0% { -webkit-transform: translateX(174.5px); transform: translateX(174.5px); }
  100% { -webkit-transform: translateX(0); transform: translateX(0); }
}

@keyframes switch-off-wide {
    0% { -webkit-transform: translateX(174.5px); transform: translateX(174.5px); }
  100% { -webkit-transform: translateX(0); transform: translateX(0); }
}

@-webkit-keyframes switch-on-shrink {
    0% { -webkit-transform: translateX(0); transform: translateX(0); }
  100% { -webkit-transform: translateX(144.5px); transform: translateX(144.5px); }
}

@keyframes switch-on-shrink {
    0% { -webkit-transform: translateX(0); transform: translateX(0); }
  100% { -webkit-transform: translateX(144.5px); transform: translateX(144.5px); }
}

@-webkit-keyframes switch-off-shrink {
    0% { -webkit-transform: translateX(144.5px); transform: translateX(144.5px); }
  100% { -webkit-transform: translateX(0); transform: translateX(0); }
}

@keyframes switch-off-shrink {
    0% { -webkit-transform: translateX(144.5px); transform: translateX(144.5px); }
  100% { -webkit-transform: translateX(0); transform: translateX(0); }
}

@media screen and (max-width: 400px) {
  * {
    font-size: 16px!important;
  }
  .switch {
    width: 300px;
    height: 48px;
  }
  .switch > span.text {
    top: 13px;
  }
  .slider {
    border-radius: 32px;
    padding: 12px 0;
  }
  .slider:before {
    padding: 10px 0;
    border-radius: 32px;
    height: 42px;
    width: 150px;
  }
  .slider.business:before {
    -webkit-animation-name: switch-on-shrink;
            animation-name: switch-on-shrink;
  }
  .slider.residential:before {
    -webkit-animation-name: switch-off-shrink;
            animation-name: switch-off-shrink;
  }
  .text-left { left: 32px; }
  .text-right { right: 32px; }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SwitchMode',
  data () {
    return {
      classes: ['residential', 'business'],
      switchWrapper: null,
      slider: null,
      switcher: null,
      value: null
    }
  },
  computed: {
    ...mapState(['plan']),
    checked () {
      this.$store.commit('CHANGE_PLAN', this.value)
      return this.value === 'business'
    }
  },
  watch: {
    plan (val) {
      this.value = val
      this.changePlan()
    }
  },
  methods: {
    changePlan () {
      this.switcher.checked = this.checked
      const i = Number(!this.checked)
      const j = Number(this.checked)
      this.slider.classList.remove(this.classes[i])
      this.slider.classList.add(this.classes[j])
      this.switchWrapper.classList.remove(this.classes[j])
      this.switchWrapper.classList.add(this.classes[i])
    }
  },
  mounted () {
    this.value = this.plan

    this.switchWrapper = document.getElementById('switch')
    this.slider = document.getElementById('slider')
    this.switcher = document.getElementById('switch-toggle')

    this.switcher.onclick = function (event) {
      this.value = this.classes[Number(event.target.checked)]
      this.changePlan()
    }.bind(this)

    this.changePlan()
  }
}
</script>
