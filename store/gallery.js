import { API } from '~/utils/apiStatusCode'
import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { TOAST } from '~/utils/strings'
import { ADD_GALLERY_IMAGE, EDIT_GALLERY_IMAGE } from '~/graphql/mutations/gallery'
import { GET_ALL_GALLERY_BY_RESTAURANT_ID } from '~/graphql/queries/gallery'

export const state = () => ({
  allGalleryImages: {
    Galleries: [],
    count: 0
  }
})

export const mutations = {
  SET_ALL_GALLERY_IMAGES: (state, payload) => {
    state.allGalleryImages = payload
  },
  UPDATE_GALLERY_IMAGE: (state, {
    payload,
    GalleryId
  }) => {
    const index = state.allGalleryImages.Galleries.findIndex(gallery => gallery.id === GalleryId)
    if (index !== -1) {
      state.allGalleryImages.Galleries[index].image = payload.image
      state.allGalleryImages.Galleries[index].description = payload.description
      state.allGalleryImages.Galleries[index].type = payload.type
      state.allGalleryImages.Galleries[index].status = payload.status
    }
  },
  DELETE_GALLERY_IMAGE: (state, GalleryId) => {
    const index = state.allGalleryImages.Galleries.findIndex(gallery => gallery.id === GalleryId)
    if (index !== -1) {
      state.allGalleryImages.Galleries.splice(index, 1)
    }
  }
}

export const actions = {
  requestAddGalleryImage: async ({
    commit
  }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, ADD_GALLERY_IMAGE, { payload }, { jwt })
    if (data.AddGalleryImage.code === API.CREATED) {
      return {
        msg: data.AddGalleryImage.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.AddGalleryImage.msg,
        code: 'error'
      }
    }
  },
  requestGetAllGalleryByRestaurantId: async ({ commit }, {
    $apollo,
    RestaurantID,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, GET_ALL_GALLERY_BY_RESTAURANT_ID, {
      RestaurantID,
      limit,
      offset
    }, { jwt })
    if (data.GetAllGalleryByRestaurantId !== null && data.GetAllGalleryByRestaurantId.code === API.SUCCESS) {
      if (data.GetAllGalleryByRestaurantId.Galleries !== undefined) {
        await commit('SET_ALL_GALLERY_IMAGES', data.GetAllGalleryByRestaurantId)
      }

      return {
        code: API.SUCCESS,
        msg: data.GetAllGalleryByRestaurantId.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeleteGalleryImage: async ({ commit }, {
    $apollo,
    GalleryId,
    restaurantId,
    jwt
  }) => {
    const payload = {
      status: API.DELETED,
      restaurant: restaurantId
    }
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_GALLERY_IMAGE, {
      payload,
      GalleryId
    }, { jwt })

    if (data.EditGalleryImage !== null && data.EditGalleryImage.code === API.EDITED) {
      await commit('DELETE_GALLERY_IMAGE', GalleryId)
      return {
        msg: TOAST.GALLERY_IMAGE_DELETED,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditGalleryImage.msg,
        code: 'error'
      }
    }
  },
  requestEditGalleryImage: async ({ commit }, {
    $apollo,
    payload,
    GalleryId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_GALLERY_IMAGE, {
      payload,
      GalleryId
    }, { jwt })
    if (data.EditGalleryImage.code === API.EDITED) {
      await commit('UPDATE_GALLERY_IMAGE', {
        payload,
        GalleryId
      })
      return {
        msg: data.EditGalleryImage.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditGalleryImage.msg,
        code: 'error'
      }
    }
  }

}

export const getters = {
  allGalleryImages: ({ allGalleryImages }) => allGalleryImages
}
