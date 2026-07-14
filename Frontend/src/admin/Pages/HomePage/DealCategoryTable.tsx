import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const DealCategoryTable = () => {
  const { admin } = useAppSelector((store) => store);
  const data = admin.categories.filter((item) => item.section === 'DEALS');

  return (
    <div>
      <HomeCategoryTable section="DEALS" title="Deal Categories" data={data} />
    </div>
  )
}

export default DealCategoryTable