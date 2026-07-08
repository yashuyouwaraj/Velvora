export const uploadToCloudinary = async (pics:any) => {
    const cloud_name=""
    const upload_present=""
    if(pics){
        const data= new FormData()
        data.append("file",pics)
        data.append("upload_present",upload_present)
        data.append("cloud_name",cloud_name)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`,{
            method:"POST",
            body:data
        })

        const fileDate=await res.json()
        return fileDate.url
    }
    else{
        console.log("Error: pics not found")
    }
    
}