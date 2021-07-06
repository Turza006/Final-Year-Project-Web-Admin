<template>
  <v-app dark>
    <NavigationDrawerComponent :clipped="clipped" :mini-variant="miniVariant" />
    <AppBarComponent :title="title" :clipped="clipped" :mini-variant="miniVariant" :fixed="fixed" />
    <v-main class="ma-5">
      <nuxt />
    </v-main>
    <FooterComponent :fixed="fixed" />
    <RightNavigationDrawerComponent />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavigationDrawerComponent from '~/components/common/NavigationDrawerComponentNew'
import { FOOTER_EVENT, NAVIGATION_DRAWER_EVENTS } from '~/utils/events'
import RightNavigationDrawerComponent from '~/components/common/RightNavigationDrawerComponent'
import AppBarComponent from '~/components/common/AppBarComponent'
import Snackbar from '~/components/common/Snackbar'
import FooterComponent from '~/components/common/FooterComponent'

export default {
  components: {
    FooterComponent,
    Snackbar,
    AppBarComponent,
    RightNavigationDrawerComponent,
    NavigationDrawerComponent
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      clipped: false,
      miniVariant: false,
      fixed: false,
      title: 'dining',
      subTitle: 'Restaurant Management Software'
    }
  },
  head () {
    return {
      title: this.singleRestaurant.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.singleRestaurant.aboutUs
        }
      ],
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.imgBaseUrl + this.singleRestaurant.logo
      }]
    }
  },
  computed: {
    ...mapGetters('auth', ['packageId', 'restaurantId']),
    ...mapGetters('restaurant', ['singleRestaurant'])
  },
  async created () {
    // console.log('packageId-->', this.packageId)
    // console.log('restaurantId-->', this.restaurantId)
    console.log('restaurant id: ', this.$route.query.restaurant)
    if (this.$route.query.restaurant) {
      await this.getRestaurantInfoNetworkCall({ uniqueName: this.$route.query.restaurant })
    } else if (this.packageId === '' && this.restaurantId === '') {
      this.$router.push('/owned-packages')
    }

    this.$nuxt.$on(NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawer, () => {
      this.drawer = !this.drawer
    })

    this.$nuxt.$on(NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawerMiniVariant, () => {
      this.miniVariant = !this.miniVariant
    })

    this.$nuxt.$on(NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawerClipped, () => {
      this.clipped = !this.clipped
    })

    this.$nuxt.$on(FOOTER_EVENT.toggleFixedFooter, () => {
      this.fixed = !this.fixed
    })
  },
  methods: {
    ...mapActions('package', ['requestGetAllOwnedPackage']),
    ...mapActions('restaurant', ['requestGetSingleRestaurant']),
    async getRestaurantInfoNetworkCall ({ uniqueName }) {
      this.loading = true
      const res = await this.requestGetSingleRestaurant({
        $apollo: this.$apollo,
        uniqueName,
        jwt: this.jwt
      })
      this.loading = false
      if (res.code === 'success') {
        this.$notifier.showMessage({
          content: res.msg,
          color: 'success'
        })
        // await this.$store.commit('auth/SET_PACKAGE_ID_AND_RESTAURANT_ID', {
        //   restaurantId: item.restaurant[0]._id,
        //   packageId: item._id
        // })
        // await this.$router.push('/')
      } else {
        this.$notifier.showMessage({
          content: res.msg,
          color: 'error'
        })
      }
    }
  }
}
</script>

<style>
.cursor-pointer{
  cursor: pointer !important;
}
</style>
