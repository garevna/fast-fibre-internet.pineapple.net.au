<template>
  <v-container fluid class="container-top-0" align="start" justify="center">
    <v-row>
      <v-card tile dark color="primary" height="40" width="100%" style="position: fixed; top: 0; left: 0; z-index: 1">
        <v-btn text @click="$router.push({ name: 'home' })">
          <v-icon>$home</v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row class="mt-0 pt-12 mx-auto" width="100%">
      <v-card flat class="plansfone mt-0 mx-auto">
        <v-tabs
          v-model="tab"
          background-color="white"
          color="primary"
          centered
          fixed-tabs
          icons
          height="50"
          mobile-break-point="50"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Step 1
            <!-- <v-icon color="buttons">mdi-numeric-1-box</v-icon> -->
          </v-tab>

          <v-tab href="#tab-2">
            Step 2
            <!-- <v-icon color="buttons">mdi-numeric-2-box</v-icon> -->
          </v-tab>

          <v-tab href="#tab-3">
            Step 3
            <!-- <v-icon color="buttons">mdi-numeric-3-box</v-icon> -->
          </v-tab>

          <v-tab href="#tab-4">
            Step 4
            <!-- <v-icon color="buttons">mdi-numeric-4-box</v-icon> -->
          </v-tab>

          <v-tab href="#tab-5">
            Step 5
            <!-- <v-icon color="buttons">mdi-numeric-5-box</v-icon> -->
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="plansfone">
          <v-tab-item value="tab-1">
            <FirstStep :next.sync="firstTabNext"/>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <Modems :prev.sync="secondTabPrev" :next.sync="secondTabNext"/>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <ClientInfo :prev.sync="thirdTabPrev" :next.sync="thirdTabNext"/>
          </v-tab-item>
          <v-tab-item value="tab-4">
            <PaymentDetails :prev.sync="fourthTabPrev" :next.sync="fourthTabNext"/>
          </v-tab-item>
          <v-tab-item value="tab-5">
            <PaymentInfo :prev.sync="fourthTabPrev"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped>

.container-top-0 {
  margin-top: 0!important;
}
.main-column {
  margin-left: calc(50% - 590px);
  margin-right: 20px;
  padding: 0;
  height: 3158px;
}

</style>

<script>

import FirstStep from '@/components/fibre-internet-plans/FirstStep.vue'
import Modems from '@/components/fibre-internet-plans/Modems.vue'
import ClientInfo from '@/components/fibre-internet-plans/ClientInfo.vue'
import PaymentDetails from '@/components/fibre-internet-plans/PaymentDetails.vue'
import PaymentInfo from '@/components/fibre-internet-plans/PaymentInfo.vue'

export default {
  name: 'FibreInternetPlans',

  components: {
    FirstStep,
    Modems,
    ClientInfo,
    PaymentDetails,
    PaymentInfo
  },

  data: () => ({
    tab: 0
  }),
  computed: {
    firstTabNext: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-2' : this.tab }
    },
    secondTabPrev: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-1' : this.tab }
    },
    secondTabNext: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-3' : this.tab }
    },
    thirdTabPrev: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-2' : this.tab }
    },
    thirdTabNext: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-4' : this.tab }
    },
    fourthTabPrev: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-3' : this.tab }
    },
    fourthTabNext: {
      get () { return false },
      set (val) { this.tab = val ? 'tab-5' : this.tab }
    }
  },
  mounted () {
    this.$vuetify.goTo(0)
  }
}

</script>
