export default {
  methods: {
    objectParse (object, compareObject) {
      const newObj = {}
      for (const property in compareObject) {
        console.log('Property=============>', property)
        newObj[property] = object[property]
      }
      console.log('New Object=============>', newObj)
      console.log('New Object=============>', typeof newObj)
      return newObj
    }
  }
}
