<template>
  <div>
    <v-card max-width="450px" class="mx-auto mt-10" elevation="10">
      <v-img style="position: absolute; left: calc(50% - 80px); top: 6vh; z-index: 1; width: 140px; height: auto;" src="/img/logo.png" />
      <div class="clip" />
      <h3 class="text-center">
        Restaurant Management Software
      </h3>
      <p class="text-center mb-0">
        Sign in to your account
      </p>
      <v-form ref="form" class="pt-5 px-10 pb-0 ">
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          label="Enter your email"
          prepend-inner-icon="mdi-account"
          placeholder="Enter your email"
          dense
          solo
          rounded
          @keydown.enter="onSubmit()"
        />
        <v-text-field
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          label="Enter your password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          rounded
          dense
          solo
          @click:append="showPassword = !showPassword"
          @keydown.enter="onSubmit()"
        />
        <v-radio-group v-model="userType" :rules="userTypeRules" class="mb-2" dense>
          <div class="d-flex">
            <v-radio class="mt-1" color="primary" :value="userTypeAdmin" label="Owner" />
            <v-radio class="pl-5" color="primary" :value="userTypeStaff" label="Staff" />
          </div>
        </v-radio-group>
      </v-form>
      <v-card-actions class="pa-0 px-10">
        <v-btn
          :loading="loading"
          :disabled="loading"
          rounded
          block
          class="white--text primary"
          @click="onSubmit()"
        >
          Login
        </v-btn>
      </v-card-actions>
      <v-btn
        text
        small
        class="float-right mr-10 mt-5 primary--text"
        @click="openForgotDialog()"
      >
        Forget Password?
      </v-btn>
      <div class="text-center py-3 pt-16" />
    </v-card>
    <DialogForgotPassword />
  </div>
</template>

<script>

import DialogForgotPassword from '~/components/dialogs/DialogForgotPassword'
import { getMutationData } from '~/utils/apolloApiUtil'
import { OWNER_LOGIN } from '~/graphql'
import { API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'
import { USER_TYPE } from '~/utils/staticValues'

export default {
  name: 'PageLogin',
  components: {
    DialogForgotPassword
  },
  layout: 'authLayout',
  middleware: ['openRoute'],
  data () {
    return {
      dialog: false,
      loading: false,
      userTypeAdmin: USER_TYPE.ADMIN,
      userTypeStaff: USER_TYPE.STAFF,
      showPassword: false,
      userType: '',
      form: {
        email: '',
        password: '',
        deviceToken: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password length is too short. Minimum length is 8.'
      ],
      userTypeRules: [
        v => !!v || 'User type is required'
      ]
    }
  },
  methods: {
    openForgotDialog () {
      this.dialog = false
      this.$nuxt.$emit('toggleDialogForgotPassword')
    },
    async onSubmit () {
      if (this.$refs.form.validate()) {
        if (this.userType === USER_TYPE.ADMIN) {
          this.loading = true
          const { data } = await getMutationData(this.$apollo, OWNER_LOGIN, this.form)
          this.loading = false
          if (data.OwnerLogin !== null) {
            if (data.OwnerLogin.code === API.SUCCESS) {
              this.$notifier.showMessage({
                content: data.OwnerLogin.msg,
                color: 'success'
              })
              data.OwnerLogin.userType = USER_TYPE.ADMIN
              await this.$store.commit('auth/SET_TOKEN', data.OwnerLogin)
              await this.$router.push('/owned-packages')
            } else {
              this.$notifier.showMessage({
                content: data.OwnerLogin.msg,
                color: 'error'
              })
            }
          } else {
            this.$notifier.showMessage({
              content: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER,
              color: 'error'
            })
          }
        } else {
          this.$notifier.showMessage({
            content: TOAST.COMING_SOON,
            color: 'info'
          })
        }
      } else {
        this.$notifier.showMessage({
          content: TOAST.PLEASE_ENTER_VALID_EMAIL_AND_PASSWORD,
          color: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.clip{
  background: #0079FF;
  width: 100%;
  height: 140px;
  clip-path: circle(140px at 0% 0%);
}
.clip2{
  display: inline;
  position: absolute;
  z-index: 100;
  background: #0079FF;
  width: 100%;
  height: 145px;
  clip-path: circle(140px at 100% 100%);
}
</style>
