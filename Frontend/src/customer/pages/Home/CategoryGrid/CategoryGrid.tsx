import React from 'react'

const CategoryGrid = () => {
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20 ">
        <div className="col-span-3 row-span-12 text-white ">
            <img className='w-full h-full object-cover object-top rounded-md ' src="https://images.unsplash.com/photo-1710967357095-66dcde811181?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D" alt="" />
        </div>
        <div className="col-span-2 row-span-6 text-white ">
            <img className='w-full h-full object-cover object-top rounded-md '  src="https://img.tatacliq.com/images/i28/437Wx649H/MP000000029230963_437Wx649H_202511201038441.jpeg" alt="" />
        </div>
        <div className="col-span-4 row-span-6 text-white ">
            <img className='w-full h-full object-cover object-top rounded-md ' src="https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBpbiUyMHNhcmVlfGVufDB8MHwwfHx8MA%3D%3D" alt="" />
        </div>
        <div className="col-span-3 row-span-12 text-white ">
            <img className='w-full h-full object-cover object-top rounded-md ' src="https://www.anitadongre.com/dw/image/v2/BGCX_PRD/on/demandware.static/-/Sites-masterCatalog_AD_India/default/dw70c06b56/images/hires/F25/Men/F25MR7B_Sage_2.jpg?sw=850&sh=1275&sm=fit&strip=false" alt="" />
        </div>
        <div className="col-span-4 row-span-6 text-white ">
            <img className='w-full h-full object-cover object-top rounded-md ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd3fmaff-Hd7kO7FGsaaJ3u4oml-8pjC8hw3QdN5Z3g&s=10" alt="" />
        </div>
        <div  className="col-span-2 row-span-6 text-white ">
            <img className='w-full h-full object-cover object-top rounded-md ' src="https://m.media-amazon.com/images/I/81NagAwYzTL._AC_UY1000_.jpg" alt="" />
        </div>
    </div>
  )
}

export default CategoryGrid