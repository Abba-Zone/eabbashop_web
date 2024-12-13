import React, { useCallback, useEffect, useState } from 'react';
import { AdminRefundListComponent, BottomButton, SearchSet } from '../../components';
import { getRefundList_s } from '../../services/customRequest';

const AdminTakebackRequest: React.FC = () => {
  const [takebacks, setTakebacks] = useState<refund[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:"신청자", select:'name', selectType:'text', itemList:[]},
    {selectName:"전화번호", select:'phone', selectType:'text', itemList:[]},
    {selectName:"주문번호", select:'orderID', selectType:'text', itemList:[]},
    {selectName:"신청일", select:'createdDateTime', selectType:'date', itemList:[]},
    {selectName:"상태", select:'status', selectType:'text', itemList:["보류", "완료"]},
  ];

  const getTakebackList = useCallback (async () => {
    try {
      const totalAndTakebackList : refundList = await getRefundList_s(pageNo, pageSize, filter, filterValue, sort, sortValue, 100);
      setTakebacks(totalAndTakebackList.list);
      setLastPage(totalAndTakebackList.totalCount === 0? 1:Math.floor((totalAndTakebackList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching takeback list:', error);
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
    getTakebackList(); // 비동기 함수 호출
  }, [getTakebackList]);

  return (
    <div>
      <h1>반품요청</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminRefundListComponent refunds={takebacks}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminTakebackRequest;
