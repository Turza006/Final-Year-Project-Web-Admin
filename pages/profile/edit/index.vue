<template>
  <div>
    <v-card class="my-5 grey lighten-4" flat tile elevation="10" :loading="loading">
      <v-card-title class="">
        Edit Profile
      </v-card-title>
      <v-divider />
      <v-form ref="form">
        <v-layout>
          <v-flex
            class="mt-5"
          >
            <ImageInput
              class="mx-auto"
              :image-link="form.profilePic"
              @changeImagelink="updateImageUrl($event)"
            />
          </v-flex>
        </v-layout>
        <div class="pa-10">
          <h3 class="text-uppercase mb-5">
            Account Information
          </h3>
          <v-layout>
            <v-flex xs12 md2 sm4 class="pt-4">
              <label>Edit First Name:</label>
            </v-flex>
            <v-flex xs12 md10 sm8>
              <v-text-field
                v-model="form.firstName"
                :rules="firstNameRules"
                type="text"
                label="First Name"
                placeholder="First Name*"
                prepend-inner-icon="mdi-account"
                append-icon="mdi-pencil"
                solo
                rounded
              />
            </v-flex>
            <v-flex />
          </v-layout>
          <v-layout>
            <v-flex xs12 md2 sm4 class="mt-4">
              <label>Edit Last Name:</label>
            </v-flex>
            <v-flex xs12 md10 sm8>
              <v-text-field
                v-model="form.lastName"
                :rules="lastNameRules"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                prepend-inner-icon="mdi-account"
                append-icon="mdi-pencil"
                solo
                rounded
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 md2 sm4 class="mt-4">
              <label>Email:</label>
            </v-flex>
            <v-flex xs12 md10 sm8>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                type="email"
                label="Email*"
                placeholder="Email*"
                prepend-inner-icon="mdi-gmail"
                append-icon="mdi-pencil"
                solo
                rounded
                disabled
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 md2 sm4 class="mt-4">
              <label>Phone:</label>
            </v-flex>
            <v-flex xs12 md10 sm8>
              <v-text-field
                v-model="form.phoneNo"
                :rules="phoneNoRules"
                type="email"
                label="Phone*"
                placeholder="Phone*"
                prepend-inner-icon="mdi-phone"
                append-icon="mdi-pencil"
                solo
                rounded
              />
            </v-flex>
          </v-layout>
        </div>
        <div class="px-10 pt-3">
          <h3 class="text-uppercase mb-5">
            Billing Info
          </h3>
          <v-layout>
            <v-flex xs12 md2 sm4 class="mt-4">
              <label>Billing Address:</label>
            </v-flex>
            <v-flex xs12 md10 sm8>
              <v-text-field
                v-model="form.billingAddress"
                type="text"
                label="Billing Address"
                placeholder="Billing Address"
                solo
                rounded
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 md2 sm4 class="mt-4">
              <label>Billing Number:</label>
            </v-flex>
            <v-flex xs12 md10 sm8>
              <v-text-field
                v-model="form.billingNumber"
                type="text"
                label="Billing Number"
                placeholder="Billing Number"
                solo
                rounded
              />
            </v-flex>
          </v-layout>
        </div>
      </v-form>
      <div class="pb-8 text-center mt-5 pb-10">
        <v-btn class="primary mx-auto white--text" rounded :loading="loading" @click="onSubmit()">
          <v-icon class="mr-1">
            mdi-update
          </v-icon>
          Update Profile
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import { API } from '~/utils/apiStatusCode'

export default {
  name: 'EditAdminProfile',
  mixins: [DateConverterMixin],
  data () {
    return {
      loading: false,
      dobMenu: false,
      date: null,
      form: {
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        image: ''
      },
      firstNameRules: [
        v => !!v || 'First Name is required',
        v => v.length >= 3 || 'First Name must be at least 3 characters or more.'
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => v.length >= 2 || 'The last name must be at least 2 characters or more.'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      phoneNoRules: [
        v => !!v || 'Phone number is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('owner', ['ownerInfo']),
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    }
  },
  async created () {
    this.loading = true
    await this.requestGetOwnerProfile({ $apollo: this.$apollo, jwt: this.jwt })
    this.loading = false

    this.form = {
      firstName: this.ownerInfo.firstName,
      lastName: this.ownerInfo.lastName,
      phoneNo: this.ownerInfo.phoneNo,
      email: this.ownerInfo.email,
      profilePic: this.ownerInfo.profilePic
    }

    if (this.ownerInfo.dob !== null) {
      this.date = this._milliToDateYYYYMMDD(this.ownerInfo.dob)
    }
  },
  methods: {
    ...mapActions('owner', ['requestGetOwnerProfile', 'requestEditOwnerProfile']),
    updateImageUrl (url) {
      this.form.profilePic = url
    },
    async onSubmit () {
      if (this.$refs.form.validate()) {
        // if (this.date !== null) {
        //   this.form.dob = this._getDateToMillisFromYYYYMMDD(this.date).toString()
        // }
        // console.log('input valid :)', this.form)
        const res = await this.requestEditOwnerProfile({ $apollo: this.$apollo, ownerId: this.ownerInfo.id, payload: this.form, jwt: this.jwt })

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })

        if (res.code === API.SUCCESS) {
          // await this.requestGetSingleAdminInfo({ $apollo: this.$apollo, jwt: this.jwt })
          await this.$router.push('/profile')
        }
      } else {
        this.$notifier.showMessage({
          content: 'Please enter valid input',
          color: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
