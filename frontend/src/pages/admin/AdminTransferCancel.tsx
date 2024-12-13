import React, { useCallback, useEffect, useState } from 'react';
import { AdminTransferCancelListComponent, BottomButton, SearchSet } from '../../components';

const AdminTransferCancel: React.FC = () => {
  const [transferCancels, setTransferCancels] = useState<transferCancel[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:"", select:'name', selectType:'text', itemList:[]},
    {selectName:"", select:'host', selectType:'text', itemList:[]},
    {selectName:"", select:'phone', selectType:'text', itemList:[]},
    {selectName:"", select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getTransferCancelList = useCallback (async () => {
    try {
      // const totalAndStoreList : storeList = await getStoreList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      // setStores(totalAndStoreList.stores);
      // setLastPage(totalAndStoreList.totalStore === 0? 1:Math.floor((totalAndStoreList.totalStore - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching payment list:', error);
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
    getTransferCancelList(); // 비동기 함수 호출
  }, [getTransferCancelList]);

  return (
    <div>
      <h1>결제요청</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminTransferCancelListComponent transferCancels={transferCancels}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminTransferCancel;
