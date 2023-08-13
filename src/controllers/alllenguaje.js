const {Lenguage} = require("../db")

const allLenguaje = async ()=>{
    return await Lenguage.findAll()
}

export default allLenguaje