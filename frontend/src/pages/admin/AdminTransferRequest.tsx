import React, { useCallback, useEffect, useState } from 'react';
import { AdminTransferListComponent, BottomButton, SearchSet } from '../../components';
import { getTransferList_s } from '../../services/customRequest';

const AdminTransferRequest: React.FC = () => {
  const [transfers, setTransfers] = useState<transfer[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:"보낸사람", select:'senderName', selectType:'text', itemList:[]},
    {selectName:"받는사람", select:'receiverName', selectType:'text', itemList:[]},
    {selectName:"이체금액", select:'money', selectType:'text', itemList:[]},
    {selectName:"이체유형", select:'moneyType', selectType:'text', itemList:[]},
    {selectName:"이체일", select:'createdDateTime', selectType:'date', itemList:[]},
    {selectName:"상태", select:'status', selectType:'select', itemList:["보류", "완료"]},
  ];

  const getTransferList = useCallback (async () => {
    try {
      const totalAndTransferList : transferList = await getTransferList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setTransfers(totalAndTransferList.list);
      setLastPage(totalAndTransferList.totalCount === 0? 1:Math.floor((totalAndTransferList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching transfer list:', error);
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
    getTransferList(); // 비동기 함수 호출
  }, [getTransferList]);

  return (
    <div>
      <h1>이체요청</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminTransferListComponent transfers={transfers}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminTransferRequest;
