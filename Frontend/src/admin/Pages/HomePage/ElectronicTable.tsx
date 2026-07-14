import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const ElectronicTable = () => {
  const { admin } = useAppSelector((store) => store);
  const data = admin.categories.filter((item) => item.section === "ELECTRIC_CATEGORIES");

  return (
    <div>
      <HomeCategoryTable section="ELECTRIC_CATEGORIES" title="Electronic Categories" data={data} />
    </div>
  );
};

export default ElectronicTable;
