import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const GridTable = () => {
  const { admin } = useAppSelector((store) => store);
  const data = admin.categories.filter((item) => item.section === 'GRID');

  return (
    <div>
      <HomeCategoryTable section="GRID" title="Home Grid" data={data} />
    </div>
  )
}

export default GridTable