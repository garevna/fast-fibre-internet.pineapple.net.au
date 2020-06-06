<template>
  <v-container fluid class="my-12">
    <v-card flat width="100%" max-width="900" class="transparent mx-auto my-10">
      <v-card-title class="text-center mb-12">
        <h2>{{ faq.header }}</h2>
      </v-card-title>
      <v-expansion-panels
            v-model="panel"
            accordion
            focusable
            hover
            tile
      >
        <v-expansion-panel
          v-for="(item,index) in faq.items"
          :key="index"
        >
          <v-expansion-panel-header class="text-left">
            <h5>{{ item.question }}</h5>
            <template v-slot:actions>
              <v-icon color="#444">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="text-justify py-4" v-html="item.answer"></p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-text class="text-center">
        <v-btn
            color="buttons"
            dark
            rounded
            height="48"
            class="submit-button px-auto mx-auto mt-12"
            @click="$emit('update:page', 'contact')"
        >
            {{ faq.button }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card__text {
  font-family: 'Gilroy'!important;
  font-style: normal;
  font-weight: normal;
  font-size: 18px!important;
  line-height: 150%;
  color: #2D2D2D!important;
}

@media screen and (max-width: 600px) {
  h2 { margin-left: 20px; }
  h5 { max-width: 80%; }
  .v-card__text {
    font-size: 14px!important;
  }
}

@media screen and (max-width: 320px) {
  h2 {
    max-width: 280px;
  }
  h5 {
    font-size: 13px;
    max-width: 280px;
    line-height: 32px;
  }
  .v-card__text {
    font-size: 12px!important;
  }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'FAQ',
  props: ['page'],
  data () {
    return {
      panel: null
    }
  },
  computed: {
    ...mapState('content', ['faq'])
  }
}
</script>
