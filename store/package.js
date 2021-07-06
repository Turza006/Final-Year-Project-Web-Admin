import { getDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { SHOW_ALL_OWNED_PACKAGE } from '~/graphql'
import { API } from '~/utils/apiStatusCode'

export const state = () => ({
  allOwnedPackage: []
})

export const mutations = {
  SET_ALL_OWNED_PACKAGE: (state, payload) => {
    state.allOwnedPackage = payload
  }
}

export const actions = {

  requestGetAllOwnedPackage: async ({ commit }, {
    $apollo,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SHOW_ALL_OWNED_PACKAGE, { }, { jwt })

    if (data.ShowAllOwnedPackage !== null && data.ShowAllOwnedPackage.code === API.SUCCESS) {
      await commit('SET_ALL_OWNED_PACKAGE', data.ShowAllOwnedPackage.OwnedPackages)
      return {
        code: 'success',
        msg: data.ShowAllOwnedPackage.msg
      }
    } else {
      return {
        code: 'error',
        msg: 'Something went wrong please try again later'
      }
    }
  }
}

export const getters = {
  allOwnedPackage: ({ allOwnedPackage }) => allOwnedPackage
}
