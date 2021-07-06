<template>
  <v-navigation-drawer
    v-model="drawer"
    stateless
    :clipped="clipped"
    fixed
    app
    dark
    width="320"
  >
    <v-list>
      <div
        v-for="(item, index) in navigationItems"
        :key="index"
      >
        <v-list-item
          v-if="item.child === undefined || item.child.length===0"
          color="primary"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="font-weight-light" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          :prepend-icon="item.icon"
        >
          <template #activator>
            <v-list-item-title class="font-weight-light">
              {{ item.title }}
            </v-list-item-title>
          </template>
          <div v-for="(child, i) in item.child" :key="i">
            <v-list-group
              v-if="child.child !== undefined"
              no-action
              sub-group
            >
              <template #activator>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-light">
                    {{ child.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(nestedChild, i2) in child.child"
                :key="i2"
                link
                :to="nestedChild.to"
              >
                <v-list-item-title class="font-weight-light" v-text="nestedChild.title" />
                <v-list-item-icon>
                  <v-icon size="18" v-text="nestedChild.icon" />
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              color="primary"
              :to="child.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="font-weight-light" v-text="child.title" />
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { NAVIGATION_DRAWER_EVENTS } from '~/utils/events'
import { NAVIGATION_ITEMS } from '~/utils/_nav'

export default {
  name: 'NavigationDrawerComponentNew',
  props: {
    clipped: {
      type: Boolean,
      required: true
    },
    miniVariant: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      drawer: true,
      navigationItems: NAVIGATION_ITEMS
    }
  },
  created () {
    this.$nuxt.$on(NAVIGATION_DRAWER_EVENTS.toggleNavigationDrawer, () => {
      this.drawer = !this.drawer
    })
  }
}
</script>

<style scoped>
.v-navigation-drawer__content {
  overflow-y: hidden !important;
}
</style>
