import React from 'react'

const SimilarProductCard = () => {
  return (
    <div>
            <div className="group px-4 relative">
        <div
          className="card"
        >
            <img
              className="card-media object-top"
              src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/7d549fd0-1688-474e-8988-88f2aac507d3.__CR0,0,469,938_PT0_SX150_V1___.jpg"
              alt=""
            />
          
        
        </div>
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="name">
            <h1>Lymio</h1>
            <p>Collar T Shirt</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">
              ₹ 400
            </span>
            <span className="thin-line-through text-gray-400">
              ₹ 999
            </span>
            <span className="text-primary-color font-semibold">
              60%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarProductCard