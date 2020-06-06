<template>
  <v-row justify="center">
      <v-dialog v-model="opened" persistent max-width="290">
        <v-card class="pa-6">
          <v-card-title>
            <h2>Error</h2>
          </v-card-title>
          <v-card-text>
            <p>Please fill the form fields</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                  color="buttons"
                  width="80"
                  text @click="$emit('update:opened', false)"
            >
              CLOSE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<style scoped>
h2 {
  color: #900;
}
</style>

<script>
export default {
  name: 'PopupError',
  props: ['opened']
}
</script>
