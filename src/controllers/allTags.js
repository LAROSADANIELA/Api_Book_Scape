const {Tag} = require("../db")

const allTags = async ()=> {
    return await Tag.findAll()
}

export default allTags