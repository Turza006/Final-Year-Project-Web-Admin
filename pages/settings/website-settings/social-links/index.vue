<template>
  <div>
    <v-card elevation="10" :loading="isLoading" class="pb-2">
      <v-card-title>
        <v-icon class="pr-2">
          mdi-link
        </v-icon>
        Social Links
        <v-spacer />
        <div>
          <v-btn small rounded class="primary white--text" to="/settings/website-settings/social-links/edit">
            <v-icon small class="pr-2">
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <div class="ma-5">
        <div v-for="(social, i2) in singleRestaurant.socialLink" :key="i2" class="body-1 my-3">
          <span class="pl-6 pr-1">
            <v-icon :color="_getSocialSiteColor(social.socialSite)">
              {{ `mdi-${social.socialSite}` }}
            </v-icon>
          </span>
          <v-btn link text :href="social.link" target="_blank">
            {{ social.link }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SocialLinksMixin from '~/mixins/SocialLinksMixin'

export default {
  name: 'PageSocialLinks',
  mixins: [SocialLinksMixin],
  data () {
    return {
      isLoading: false,
      imgBaseUrl: process.env.IMAGE_BASE_URL
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('restaurant', ['singleRestaurant'])
  },
  async created () {
    if (this.singleRestaurant.uniqueName !== null) {
      this.isLoading = true
      await this.requestGetSingleRestaurant({
        $apollo: this.$apollo,
        uniqueName: this.singleRestaurant.uniqueName,
        jwt: this.jwt
      })
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions('restaurant', ['requestGetSingleRestaurant'])
  }
}
</script>
