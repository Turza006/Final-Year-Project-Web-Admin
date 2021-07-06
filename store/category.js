import { CREATE_MENU_CATEGORY, EDIT_MENU_CATEGORY } from '~/graphql/mutations/category'
import { API } from '~/utils/apiStatusCode'
import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { SINGLE_RESTAURANT_MENU_CATEGORY } from '~/graphql/queries/category'
import { TOAST } from '~/utils/strings'

export const state = () => ({
  allCategory: {
    MenuCategories: [],
    count: 0
  }
})

export const mutations = {
  SET_ALL_MENU_CATEGORY: (state, payload) => {
    state.allCategory = payload
  },
  UPDATE_MENU_CATEGORY: (state, {
    payload,
    menuCategoryId
  }) => {
    const index = state.allCategory.MenuCategories.findIndex(category => category.id === menuCategoryId)
    if (index !== -1) {
      state.allCategory.MenuCategories[index].category = payload.category
      state.allCategory.MenuCategories[index].priority = payload.priority
      state.allCategory.MenuCategories[index].status = payload.status
    }
  },
  DELETE_MENU_CATEGORY: (state, foodCategoryId) => {
    const index = state.allCategory.MenuCategories.findIndex(foodCategory => foodCategory.id === foodCategoryId)
    if (index !== -1) {
      state.allCategory.MenuCategories.splice(index, 1)
    }
  }
}

export const actions = {
  requestCreateMenuCategory: async ({
    commit
  }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_MENU_CATEGORY, { payload }, { jwt })
    if (data.AddMenuCategory.code === API.SUCCESS) {
      return {
        msg: data.AddMenuCategory.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.AddMenuCategory.msg,
        code: 'error'
      }
    }
  },
  requestSingleRestaurantMenuCategory: async ({ commit }, {
    $apollo,
    restaurantId,
    status,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SINGLE_RESTAURANT_MENU_CATEGORY, {
      restaurantId,
      status,
      limit,
      offset
    }, { jwt })
    if (data.SingleResturantMenuCategory !== null && data.SingleResturantMenuCategory.code === API.SUCCESS) {
      await commit('SET_ALL_MENU_CATEGORY', data.SingleResturantMenuCategory)
      return {
        code: API.SUCCESS,
        msg: data.SingleResturantMenuCategory.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeleteMenuCategory: async ({ commit }, {
    $apollo,
    menuCategoryId,
    restaurant,
    jwt
  }) => {
    const payload = {
      status: API.DELETED,
      restaurant
    }
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_MENU_CATEGORY, {
      payload,
      menuCategoryId
    }, { jwt })

    if (data.EditMenuCategory !== null && data.EditMenuCategory.code === API.SUCCESS) {
      await commit('DELETE_MENU_CATEGORY', menuCategoryId)
      return {
        msg: TOAST.MENU_CATEGORY_DELETED,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditMenuCategory.msg,
        code: 'error'
      }
    }
  },
  requestEditMenuCategory: async ({ commit }, {
    $apollo,
    payload,
    menuCategoryId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_MENU_CATEGORY, {
      payload,
      menuCategoryId
    }, { jwt })
    if (data.EditMenuCategory.code === API.SUCCESS) {
      await commit('UPDATE_MENU_CATEGORY', {
        payload,
        menuCategoryId
      })
      return {
        msg: data.EditMenuCategory.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditMenuCategory.msg,
        code: 'error'
      }
    }
  }

}

export const getters = {
  allCategory: ({ allCategory }) => allCategory
}
