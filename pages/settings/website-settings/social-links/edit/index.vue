<template>
  <div>
    <v-card elevation="10">
      <v-card-title>
        <v-icon class="pr-2">
          mdi-link
        </v-icon>
        Edit Social Links
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-form ref="form" class="pa-8">
        <v-row v-for="(social,index) in form.socialLink" :key="index">
          <v-col class="py-0" cols="4">
            <label class="ml-3">Restaurant Social Link ({{ parseInt(index) + 1 }})</label>
            <v-btn
              v-if="index !== 0"
              x-small
              outlined
              color="error"
              class="text-right"
              @click="removeSocialLink(index)"
            >
              Remove
            </v-btn>
            <v-select
              v-model="social.socialSite"
              :rules="socialLinkRules"
              class="mt-2"
              :items="socialSites"
              hint="Choose social site"
              persistent-hint
              filled
              rounded
              dense
            />
            <!--            <v-text-field
                          v-model="social.socialSite"
                          class="mt-2"
                          :rules="socialLinkRules"
                          filled
                          dense
                          rounded
                          placeholder="Social Site Name"
                        />-->
          </v-col>
          <v-col class="py-0">
            <label class="ml-3"/>
            <v-text-field
              v-model="social.link"
              class="mt-2"
              :rules="socialLinkRules"
              filled
              dense
              rounded
              :placeholder="`${ social.socialSite ? 'Restaurant\'s '+ social.socialSite +' link type here' : '' }`"
            />
          </v-col>
        </v-row>
        <div v-if="form.socialLink.length < 8" class="ml-3 pb-10 mt-4">
          <v-btn small rounded color="primary" class="mr-3" @click="addSocialLink()">
            <v-icon small>
              mdi-plus
            </v-icon>
            Add Social Link
          </v-btn>
        </div>
        <div class="text-center">
          <v-btn :loading="isLoading" class="primary white--text px-10" rounded @click="updateSocialLinks()">
            Submit
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SocialLinksMixin from '~/mixins/SocialLinksMixin'

export default {
  name: 'PageEditWebsiteInfo',
  mixins: [SocialLinksMixin],
  data () {
    return {
      isLoading: false,
      socialSites: [
        'facebook',
        'twitter',
        'instagram',
        'whatsapp',
        'youtube',
        'telegram',
        'google+',
        'line'],
      form: {
        socialLink: [{
          socialSite: '',
          link: ''
        }]
      },
      socialSiteRules: [v => !!v || 'Social Link is required'],
      socialLinkRules: [v => !!v || 'Social Link is required']
    }
  },
  computed: {
    ...mapGetters('restaurant', ['singleRestaurantSocialLinks', 'restaurantId'])
  },
  created () {
    this.form.socialLink =
      [...this.singleRestaurantSocialLinks]
    this.form.socialLink.forEach((social) => {
      delete social.__typename
    })
  },
  methods: {
    ...mapActions('restaurant', ['requestGetSingleRestaurant', 'requestEditRestaurant']),
    addSocialLink () {
      this.form.socialLink.push({
        socialSite: '',
        link: ''
      })
    },
    removeSocialLink (index) {
      console.log(typeof index)
      this.form.socialLink.splice(index, 1)
    },
    async updateSocialLinks () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        const res = await this.requestEditRestaurant({
          $apollo: this.$apollo,
          payload: this.form,
          restaurantId: this.restaurantId,
          jwt: this.jwt
        })
        this.isLoading = false

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })

        if (res.code === 'success') {
          await this.$router.push('/settings/website-settings/social-links')
        }
      } else {
        this.$notifier.showMessage({
          content: 'Invalid input',
          color: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.label {
  font-weight: bold;
  padding-top: 10px;
}
</style>
