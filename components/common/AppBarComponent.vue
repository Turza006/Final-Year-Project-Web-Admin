<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
    dark
    color="primary accent-2"
  >
    <v-app-bar-nav-icon @click.stop="$nuxt.$emit(toggleNavigationDrawer)"/>
    <!--    <v-btn
      icon
      @click.stop="$nuxt.$emit(toggleNavigationDrawerMiniVariant)"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>-->
    <v-btn
      icon
      @click.stop="$nuxt.$emit(toggleNavigationDrawerClipped)"
    >
      <v-icon>mdi-application</v-icon>
    </v-btn>
    <!--    <v-btn
      icon
      @click.stop="$nuxt.$emit(toggleFixedFooter)"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>-->
    <v-toolbar-title class="cursor-pointer" @click="$router.push('/')">
      <v-avatar rounded>
        <v-img :src="imgBaseUrl + singleRestaurant.logo"/>
      </v-avatar>
      {{ singleRestaurant.name }}
    </v-toolbar-title>
    <v-spacer/>
    <v-btn
      dark
      small
      link
      text
      to="/owned-packages"
    >
      Owned Packages
    </v-btn>
    <v-menu
      offset-y
    >
      <template #activator="{ attrs, on }">
        <v-avatar
          v-show="ownerInfo.profilePic"
          class="ml-5"
          v-bind="attrs"
          v-on="on"
        >
          <v-img lazy-src="/img/ic_img_upload.png" :src="imgBaseUrl + ownerInfo.profilePic"/>
        </v-avatar>
        <v-btn
          v-show="!ownerInfo.profilePic"
          class="ma-5"
          color="grey lighten-4"
          v-bind="attrs"
          icon
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          class="px-10"
          link
          to="/profile"
          color="primary"
        >
          <v-list-item-title>PROFILE</v-list-item-title>
        </v-list-item>
        <v-list-item
          class="px-10"
          link
          @click="performLogout()"
        >
          <v-list-item-title>LOGOUT</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!--    <v-btn
      icon
      @click.stop="$nuxt.$emit(toggleNavigationRightDrawer)"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>-->
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FOOTER_EVENT, NAVIGATION_DRAWER_EVENTS } from '~/utils/events'

export default {
  name: 'AppBarComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    clipped: {
      type: Boolean,
      required: true
    },
    miniVariant: {
      type: Boolean,
      required: true
    },
    fixed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleNavigationDrawer: NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawer,
      toggleNavigationDrawerMiniVariant: NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawerMiniVariant,
      toggleNavigationDrawerClipped: NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawerClipped,
      toggleNavigationRightDrawer: NAVIGATION_DRAWER_EVENTS.toggleNavigationRightDrawer,
      toggleFixedFooter: FOOTER_EVENT.toggleFixedFooter
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('restaurant', ['singleRestaurant']),
    ...mapGetters('owner', ['ownerInfo'])
  },
  async created () {
    await this.requestGetOwnerProfile({ $apollo: this.$apollo, jwt: this.jwt })
  },
  methods: {
    ...mapActions('auth', ['requestPerformLogout']),
    ...mapActions('owner', ['requestGetOwnerProfile']),
    async performLogout () {
      await this.requestPerformLogout()
      await this.$apolloHelpers.onLogout()
      await this.$router.push('/login')
      // Todo:: redirect to login page
    }
  }
}
</script>
