<template>
<v-container fluid>
  <SystemBar />
  <!-- Viewport width less then lg -->
  <v-expansion-panels
          tile
          flat
          v-model="panel"
          class="app-bar d-lg-none"
          width="100%"
          style="position: fixed; margin-top: -8px; z-index: 10;"
  >
    <v-expansion-panel style="background: #FAFAFA">
      <v-expansion-panel-header
                    expand-icon="none"
                    hide-actions
                    height="70"
          >
            <span height="35" width="110" class="ml-2 ml-sm-4 ml-md-6">
              <v-img src="@/assets/logo.svg" contain width="110" height="35"></v-img>
            </span>
            <v-btn text class="burger-menu" height="48" width="48">
              <span :class="burgerMenuClassFirst"></span>
              <span :class="burgerMenuClassSecond"></span>
            </v-btn>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="#FAFAFA">
            <v-list flat class="main-menu-content text-center">
              <v-list-item
                  v-for="(page, index) in pages"
                  :key="index"
                  @click="$emit('update:page', selectors[index]); panel = []"
              >
                <v-list-item-title class="main-menu-items">{{ page }}</v-list-item-title>
              </v-list-item>
            </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <!-- Viewport width wider or equal lg -->
    <v-app-bar
            app
            fixed
            height="80"
            flat
            class="homefone app-bar d-none d-lg-block"
    >
        <v-row align="center" justify="center">
          <span height="45" width="150" class="ml-10">
            <v-img src="@/assets/logo.svg" contain width="150" height="45"></v-img>
          </span>
          <v-spacer></v-spacer>
      <v-btn-toggle
            group
            flat
            class="mr-10 d-none d-lg-flex"
            color="transparent"
            v-model="toggle"
      >
        <v-btn text
               v-for="(page, index) in pages"
               :key="index"
               :class="getClassName(page)"
               @click="$emit('update:page', selectors[index]); panel = []">
              {{ page }}
        </v-btn>
      </v-btn-toggle>
    </v-row>
  </v-app-bar>
</v-container>
</template>

<style scoped>
.v-btn-toggle > .v-btn.v-btn--active {
  color: #72BF44!important;
}
.app-bar-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
}
.app-bar-menu {
  font-size: 13px;
  line-height: 24px;
  text-transform: none!important;
  font-style: normal;
  font-weight: 500;
  color: #000;
}
.app-bar-menu-bordered {
  border: solid 2px #51AD30!important;
  border-radius: 100px!important;
}
.system-bar-phone {
  font-size: 16px;
  color: #ffffff;
}
.burger-menu {
  height: 48px;
  min-width: 48px!important;
  max-width: 64px!important;
}
.burger-menu--first, .burger-menu--second,
.burger-menu-active--first, .burger-menu-active--second {
  position: absolute;
  height:3px;
  background: #20731C;
  left: 0;
  transition: all 0.5s;
}
.burger-menu--first {
  width: 32px;
  top: -8px;
}
.burger-menu--second {
  width: 16px;
  top: 2px;
}
.burger-menu-active--first {
  top: 0;
  width: 32px;
  transform: rotate(-45deg);
}
.burger-menu-active--second {
  top: 0;
  width: 32px;
  transform: rotate(45deg);
}
.main-menu-content {
  background: #FAFAFA!important;
}
.main-menu-items {
  font-size: 18px;
  line-height: 40px;
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'AppHeader',
  props: ['page'],
  data () {
    return {
      toggle: 0,
      panel: undefined
    }
  },
  computed: {
    ...mapState(['pages', 'selectors']),
    burgerMenuClassFirst () {
      return this.panel === 0 ? 'burger-menu-active--first' : 'burger-menu--first'
    },
    burgerMenuClassSecond () {
      return this.panel === 0 ? 'burger-menu-active--second' : 'burger-menu--second'
    }
  },
  methods: {
    getClassName (pageName) {
      const className = pageName === 'Contact Us' ? ' app-bar-menu-bordered py-2 px-12' : ''
      return `app-bar-menu${className}`
    },
    returnPage () {

    }
  }
}
</script>
