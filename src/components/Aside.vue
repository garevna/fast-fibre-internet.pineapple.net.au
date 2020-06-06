<template>
  <v-card
        flat
        class="aside-card transparent mx-auto my-12"
        width="480"
  >
    <v-card-title>
      <h2 class="text-left">{{ info.header }}</h2>
    </v-card-title>
    <v-card-text>
      <p class="text-left">
          {{ info.text }}
      </p>
    </v-card-text>
    <v-card-text>
      <h5
            v-for="(item, index) in info.offer"
            :key="index"
            style="margin-bottom: 16px"
      >
        <strong style="color: #72BF44; margin-right: 8px;">{{ item.greenText }}</strong>{{ item.blackText }}
      </h5>
    </v-card-text>
    <v-card-text class="my-12">
      <span class="small text-left" style="margin-right: 16px">Pineapple NET is powered by</span>
      <v-img src="@/assets/dgtek-logo.png" width="50" style="display: inline-block; vertical-align: middle;"></v-img>
    </v-card-text>
  </v-card>
</template>

<style scoped>

.small {
  font-size: 14px;
}
strong {
  font-weight: 600;
}

@media screen and (max-width: 900px) {
  .aside-card {
    margin-bottom: 40px;
  }
}

</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Aside',
  computed: {
    ...mapState('content', ['info'])
  }
}
</script>
