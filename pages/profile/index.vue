<template>
  <div>
    <v-card tile elevation="10" class="my-5 grey lighten-4" :loading="loading">
      <v-card-title>
        Profile
        <v-spacer />
        <v-btn
          class="mr-2"
          outlined
          small
          rounded
          text
          @click="$nuxt.$emit(toggleDialogChangePassword)"
        >
          <v-icon small class="mr-1">
            mdi-key-change
          </v-icon>
          Change Password
        </v-btn>
        <v-btn
          outlined
          small
          rounded
          text
          to="/profile/edit"
        >
          <v-icon small class="mr-1">
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-layout>
        <v-flex>
          <div class="pa-10 text-center">
            <v-avatar
              class="profile"
              size="164"
              tile
            >
              <v-icon
                v-if="ownerInfo.profilePic === null || ownerInfo.profilePic === ''"
                size="164"
              >
                mdi-account
              </v-icon>
              <v-img
                v-else
                :src="imgBaseUrl + ownerInfo.profilePic"
                max-width="164px"
                max-height="164px"
                style="border-radius: 50%"
                class="mx-auto"
              />
            </v-avatar>
            <div class="font-weight-bold mt-2 mb-2">
              Name: <span class="font-weight-lighter">{{ `${ownerInfo.firstName} ${ownerInfo.lastName}` }}</span>
            </div>
            <div class="font-weight-bold">
              Email: <span class="font-weight-lighter">{{ ownerInfo.email }}</span>
            </div>
            <div class="font-weight-bold">
              Phone Number: <span class="font-weight-lighter">{{ ownerInfo.phoneNo }}</span>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <div class="pa-5">
            <h4 class="pa-5">
              Billing Info
            </h4>
            <v-divider />
            <p class="px-5 pt-5">
              <span class="subtitle-2">Billing Address: </span> <span>{{ ownerInfo.billingAddress ? ownerInfo.billingAddress : 'Not added' }}</span>
            </p>
            <p class="px-5">
              <span class="subtitle-2">Billing Number: </span> <span>{{ ownerInfo.billingNumber ? ownerInfo.billingNumber : 'Not added' }}</span>
            </p>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <DialogChangePassword />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DialogChangePassword from '~/components/dialogs/DialogChangePassword'
import { DIALOG_EVENT } from '~/utils/events'
export default {
  name: 'PageAdminProfile',
  components: { DialogChangePassword },
  component: {
    DialogChangePassword
  },
  data () {
    return {
      loading: false,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleDialogChangePassword: DIALOG_EVENT.TOGGLE_DIALOG_CHANGE_PASSWORD
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('owner', ['ownerInfo'])
  },
  async created () {
    this.loading = true
    await this.requestGetOwnerProfile({ $apollo: this.$apollo, jwt: this.jwt })
    this.loading = false
  },
  methods: {
    ...mapActions('owner', ['requestGetOwnerProfile'])
  }
}
</script>

<style scoped>

</style>
