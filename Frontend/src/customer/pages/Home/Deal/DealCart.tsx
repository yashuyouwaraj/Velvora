import { Deal } from "../../../../types/DealTypes";
import { Product } from "../../../../types/ProductTypes";

const DealCart = ({ item }: { item: Deal }) => (
  <button className="w-full text-left cursor-pointer rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
    <img
      className="w-full h-48 object-cover"
      src={item.category.image}
      alt=""
    />
    <div className="bg-gray-950 text-white p-3 text-center">
      <p className="font-semibold truncate">{item.category.name}</p>
      <p className="text-xl font-bold text-teal-300">{item.discount}% OFF</p>
      <p className="text-sm">Shop now</p>
    </div>
  </button>
);

export default DealCart;
