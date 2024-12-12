import React, { useCallback, useEffect, useState } from 'react';
import { AdminStoreListComponent, BottomButton, SearchSet } from '../../components';
import { getStoreList_s } from '../../services/store';
import { useTranslation } from 'react-i18next';

const AdminStoreList: React.FC = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState<store[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminStore:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminStore:List.Filter02"), select:'host', selectType:'text', itemList:[]},
    {selectName:t("AdminStore:List.Filter03"), select:'phone', selectType:'text', itemList:[]},
    {selectName:t("AdminStore:List.Filter04"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getStoreList = useCallback (async () => {
    try {
      const totalAndStoreList : storeList = await getStoreList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setStores(totalAndStoreList.stores);
      setLastPage(totalAndStoreList.totalStore === 0? 1:Math.floor((totalAndStoreList.totalStore - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching store list:', error);
    }
},[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
      setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sort){
      if(sortValue ==='ASC')
        setSortValue('DESC')
      else
      setSortValue('ASC')
    } else {
      setSort(sortName);
      setSortValue('ASC');
    }
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    setFilterValue(value);
  }

  useEffect(() => {
    getStoreList(); // 비동기 함수 호출
  }, [getStoreList]);

  return (
    <div>
      <h1>{t("AdminStore:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminStoreListComponent stores={stores}  changeSort={changeSort}></AdminStoreListComponent>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminStoreList;
