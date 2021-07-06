<template>
  <div class="py-6">
    <v-layout>
      <v-flex>
        <div class="mb-2">
          <strong class="float-right"> <i class="icon-calendar" />
            {{ _getCurrentDate }}
          </strong>
        </div>
      </v-flex>
    </v-layout>
    <Greetings />
<!--    <v-layout class="mb-6">
      <v-flex
        v-for="(items, index) in dashboardItems"
        :key="index"
        xs3
        md3
        sm12
        class="ma-2"
      >
        <v-card class="shadow card-background" flat>
          <v-card-title class="white&#45;&#45;text">
            <v-avatar>
              <v-icon dark>
                {{ items.icon }}
              </v-icon>
            </v-avatar>
            <v-spacer />
            <h3>{{ items.title }}</h3>
          </v-card-title>
          <div class="ml-5 pb-5 white&#45;&#45;text">
            <div>{{ items.about }}:  <span class="font-weight-bold" style="font-size: 18px">{{ items.amount }}</span></div>
            <div class="mt-2">
              <v-btn text x-small class="primary&#45;&#45;text text-decoration-underline px-0" :to="items.to">
                Details
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>-->
  </div>
</template>

<script>
import Greetings from '~/components/dashboard/Greetings'
import DateConverterMixin from '~/mixins/DateConverterMixin'

export default {
  name: 'HomePage',
  components: { Greetings },
  mixins: [DateConverterMixin],
  middleware: ['authenticated'],
  data () {
    return {
      dashboardItems: [
        { title: 'Sales', icon: 'mdi-view-list-outline', about: 'Total Sales', amount: '5820 BDT', to: '/sales/order/manage-order' },
        { title: 'Purchase', icon: 'mdi-package-variant-closed', about: 'Total Purchase', amount: '1040 BDT', to: '/purchase/all' },
        { title: 'Shortlisted', icon: 'mdi-account-group', about: 'Shortlisted Items', amount: '07', to: '/inventory/stock/shortlist' },
        { title: 'Expired', icon: 'mdi-account-group', about: 'Expired Items', amount: '07', to: '/inventory/stock/expired' }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.shadow {
  border-radius: 15px
}

.card-background{
  background: #018df8;
  background: -webkit-linear-gradient(to right, #2799d2, #2263b1, #018df8);
  background: linear-gradient(to bottom, #2799d2, #2263b1, #018df8);
}
</style>
