<template>
  <v-footer
    :absolute="!fixed"
    app
  >
    <span class="caption"><a class="text-decoration-none" href="" target="_blank">ShadowWorld.com</a> &copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>

export default {
  name: 'FooterComponent',
  props: {
    fixed: {
      type: Boolean,
      required: true
    }
  }
}
</script>
