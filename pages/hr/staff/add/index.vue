<template>
  <div>
    <v-card tile class="grey lighten-4">
      <v-card-title>Add Staff</v-card-title>
      <v-divider/>
      <v-form ref="form" class="pa-8">
        <v-container>
          <v-layout>
            <v-flex md6 xs6 sm12>
              <label class="ml-3">Image *</label>
              <ImageInput class="my-5" @changeImagelink="updateImageUrl($event)" />
            </v-flex>
            <v-flex md6 xs6 sm12>
              <label class="ml-2">First Name*</label>
              <v-text-field
                class="mt-2"
                v-model="form.firstName"
                placeholder="First name"
                filled
                dense
                rounded
              />
              <label class="ml-2">Last Name*</label>
              <v-text-field
                class="mt-2"
                v-model="form.lastName"
                placeholder="First name"
                filled
                dense
                rounded
              />
              <label classs="ml-2">Phone no*</label>
              <v-text-field
                class="mt-2"
                v-model="form.phoneNo"
                placeholder="Email"
                filled
                rounded
                dense
              />
            </v-flex>
          </v-layout>
        </v-container>
        <v-container>
          <v-layout>
            <v-flex xs6 md6 sm12 class="pr-4">
              <label classs="mx-2">Email*</label>
<!--              <v-btn color="primary" class="ml-3" small rounded>Add Email</v-btn>-->
              <v-text-field
                class="mt-4"
                v-model="form.email"
                placeholder="Email"
                filled
                rounded
                dense
              />
            </v-flex>
            <v-flex xs6 md6 sm12>
              <label classs="ml-2">Password*</label>
              <v-text-field
                class="mt-4"
                v-model="form.password"
                placeholder="Email"
                filled
                rounded
                dense
              />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions class="mb-5">
          <v-btn color="primary" class="px-10 mx-auto" small rounded>
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PageAddStaff',
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNo: '',
        packageId: '',
        userName: '',
        profilePic: '',
        isEmailVerified: false,
        isPhoneVerified: false,
        billingType: '',
        billingAddress: '',
        ownedPackage: '',
        deviceToken: '',
        status: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
