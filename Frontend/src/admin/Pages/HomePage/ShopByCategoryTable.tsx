import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const ShopByCategoryTable = () => {
  const { admin } = useAppSelector((store) => store);
  const data = admin.categories.filter((item) => item.section === "SHOP_BY_CATEGORIES");

  return (
    <div>
      <HomeCategoryTable section="SHOP_BY_CATEGORIES" title="Shop By Category" data={data} />
    </div>
  );
};

export default ShopByCategoryTable;
