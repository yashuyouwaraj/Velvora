import { HomeCategory } from "../../../../types/HomeCategoryTypes";

const ShopByCategoryCard = ({ item }: { item: HomeCategory }) => (
  <button className="flex gap-3 flex-col justify-center items-center group cursor-pointer">
    <div className="custome-border w-[150px] lg:w-[249px] lg:h-[249px] h-[150px] rounded-full bg-primary-color">
      <img
        className="rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover h-full w-full"
        src={item.image}
        alt=""
      />
    </div>
    <h1>{item.name}</h1>
  </button>
);

export default ShopByCategoryCard;
