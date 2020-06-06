<template>
    <v-container fluid class="homefone">
        <v-card flat class="transparent text-center mx-auto" width="100%">
          <v-card-title>
            <h2>{{ howToConnect.header }}</h2>
          </v-card-title>
          <v-card-text>
            <p>{{ howToConnect.text }}</p>
          </v-card-text>
        </v-card>

        <v-container fluid class="mt-5 mb-12">
          <v-card flat class="d-flex flex-wrap justify-center transparent">
            <v-card flat class="card--offer transparent text-center mx-1 mx-sm-10" width="240">
              <v-img :src="howToConnect.items[0].icon" />
              <v-card-title>
                <h3>{{ howToConnect.items[0].title }}</h3>
              </v-card-title>
              <v-card-text>
                <p>{{ howToConnect.items[0].text }}</p>
              </v-card-text>
            </v-card>
            <v-card flat class="card--offer transparent text-center mx-1 mx-sm-10" width="240">
              <v-img :src="howToConnect.items[1].icon" />
              <v-card-title>
                <h3>{{ howToConnect.items[1].title }}</h3>
              </v-card-title>
              <v-card-text>
                <p>{{ howToConnect.items[1].text }}</p>
              </v-card-text>
            </v-card>
            <v-card flat class="card--offer transparent text-center mx-1 mx-sm-10" width="240">
              <v-img :src="howToConnect.items[2].icon" />
              <v-card-title with="100%">
                <h3>{{ howToConnect.items[2].title }}</h3>
              </v-card-title>
              <v-card-text>
                <p>{{ howToConnect.items[2].text }}</p>
              </v-card-text>
            </v-card>
          </v-card>
    </v-container>
  </v-container>
</template>

<style scoped>
h3, p {
  width: 100%;
  text-align: center;
  color: #000;
}
.card--offer {
  width: 240px;
}
@media (max-width: 420px), (max-height: 420px) {
  .card--offer {
    width: 90%!important;
  }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'HowToConnect',
  props: ['page'],
  data () {
    return {
      contact: false
    }
  },
  computed: {
    ...mapState('content', ['howToConnect'])
  },
  watch: {
    contact (val) {
      if (!val) return
      this.$emit('update:page', 'contact')
      this.contact = false
    }
  }
}
</script>
