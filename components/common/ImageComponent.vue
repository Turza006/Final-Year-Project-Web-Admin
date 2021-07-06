<template>
  <v-img
    :height="height"
    :src="getImage"
    @error="onImgError"
  />
</template>

<script>
import { IMG_NO_IMAGE_AVAILABLE } from '~/utils/assets'

export default {
  name: 'ImageComponent',
  props: {
    height: {
      type: String,
      default: null
    },
    isIconImage: {
      type: Boolean,
      default: false
    },
    isThumbnailImage: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
      default: null
    },
    imageName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      failedLoadingImage: false
    }
  },
  computed: {
    getImage () {
      if (this.failedLoadingImage) {
        return IMG_NO_IMAGE_AVAILABLE
      } else {
        const imgUrlBase = this.isIconImage
          ? process.env.ICON_IMAGE_BASE_URL
          : this.isThumbnailImage ? process.env.THUMBNAIL_IMAGE_BASE_URL : process.env.IMAGE_BASE_URL
        return this.imageUrl ? this.imageUrl : this.imageName ? imgUrlBase + this.imageName : IMG_NO_IMAGE_AVAILABLE
      }
    }
  },
  methods: {
    onImgError () {
      this.failedLoadingImage = true
    }
  }
}
</script>
