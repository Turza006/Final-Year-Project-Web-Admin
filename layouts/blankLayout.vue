<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>

import Snackbar from '~/components/common/Snackbar'

export default {
  name: 'BlankLayout',
  components: {
    Snackbar
  },
  middleware: ['authenticated']
}
</script>

<style scoped>

</style>
