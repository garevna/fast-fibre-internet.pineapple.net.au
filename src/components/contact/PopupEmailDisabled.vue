<template>
  <v-row justify="center">
      <v-dialog v-model="opened" persistent max-width="290">
        <v-card class="pa-6">
          <v-card-title>
            <h2 text-color="primary">Sorry...</h2>
          </v-card-title>
          <v-card-text>
            <p>You use the demo version of this app</p>
            <p>And that's the reason you can't send your message to Pineapple</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="submit-button" text @click="$emit('update:opened', false)">CLOSE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'Popup',
  props: ['opened']
}
</script>
