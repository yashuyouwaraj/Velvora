import axios from "axios"

const api="http://localhost:5454/products"

const fetchProducts = async()=>{
    try{
        const response = await axios.get(api)
        console.log("response ",response)

    } catch(error){
        console.error(error)
    }
}

export default fetchProducts;