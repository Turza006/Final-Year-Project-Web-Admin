export default {
  methods: {
    objectDiff (oldVal, newVal) {
      const newObj = {}
      for (const property in newVal) {
        if (oldVal[property] !== newVal[property]) {
          newObj[property] = newVal[property]
        }
      }
      return newObj
    }
  }
}
