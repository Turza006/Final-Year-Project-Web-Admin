<template>
  <div>
    <v-card class="my-8 grey lighten-4" tile elevation="10">
      <v-card-title>
        <v-icon class="pr-2">
          mdi-cog
        </v-icon> Edit Settings
      </v-card-title>
      <v-divider />
      <v-form class="ma-8 mx-10">
        <label>About us: </label>
        <v-textarea v-model="form.aboutUs" class="mt-1" filled dense placeholder="About us ..." />
        <v-layout>
          <v-flex xs6 md6 sm12 class="mr-2">
            <label>Phone Number: </label>
            <v-text-field
              v-model="form.phoneNo"
              class="mt-1"
              rounded
              filled
              dense
              placeholder="Phone Number"
            />
          </v-flex>
          <v-flex xs6 md6 sm12 class="ml-2">
            <label>Email : </label>
            <v-text-field
              v-model="form.email"
              class="mt-1"
              rounded
              filled
              dense
              placeholder="Email"
            />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs6 md6 sm12 class="mr-2">
            <label>android app link: </label>
            <v-text-field
              v-model="form.googleLink"
              class="mt-1"
              rounded
              filled
              dense
              placeholder="android app link"
            />
          </v-flex>
          <v-flex xs6 md6 sm12 class="ml-2">
            <label>ios app link: </label>
            <v-text-field
              v-moddel="form.iosLink"
              class="mt-1"
              rounded
              filled
              dense
              placeholder="ios app link"
            />
          </v-flex>
        </v-layout>
        <v-layoyt>
          <v-flex xs6 md6 sm12 class="mr-2">
            <label>Social Account:</label>
            <v-select
              v-model="form.socialAccount"
              :items="items"
              filled
              rounded
              dense
              placeholder="Select Any Social Account"
            />
          </v-flex>
          <v-flex xs6 md6 sm12 class="ml-2">
            <label>Social Link: </label>
            <v-text-field
              v-model="form.socialLink"
              class="mt-1"
              rounded
              filled
              dense
              placeholder="Social Link"
            />
          </v-flex>
        </v-layoyt>
        <label>Address: </label>
        <v-text-field
          v-model="form.address"
          class="mt-1"
          placeholder="Address..."
          hint="Add city, area"
          filled
          dense
          rounded
        />
        <label> Privacy policy: </label>
        <v-textarea v-model="form.privacyAndPolicy" class="mt-1" filled dense placeholder="Privacy policy ..." />
        <label>Security: </label>
        <v-textarea v-model="form.security" class="mt-1" filled dense placeholder="Security ..." />
        <div class="text-center">
          <v-btn small rounded class="primary white--text mb-8">
            <v-icon class="pr-2">
              mdi-update
            </v-icon> update
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PageUpdateSettings',
  data () {
    return {
      disabled: false,
      form: {
        aboutUs: '',
        phoneNo: '',
        email: '',
        googleLink: '',
        iosLink: '',
        socialAccount: '',
        socialLink: '',
        address: '',
        privacyAndPolicy: '',
        security: ''
      },
      items: [
        { header: 'Select an option or create one' },
        {
          text: 'Foo',
          color: 'blue'
        },
        {
          text: 'Bar',
          color: 'red'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
