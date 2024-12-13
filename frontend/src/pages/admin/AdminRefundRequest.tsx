import React, { useCallback, useEffect, useState } from 'react';
import { AdminRefundListComponent, BottomButton, SearchSet } from '../../components';
import { getRefundList_s } from '../../services/customRequest';

const AdminRefundRequest: React.FC = () => {
  const [refunds, setRefunds] = useState<refund[]>([]);
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
    {selectName:"상태", select:'status', selectType:'select', itemList:["보류", "완료"]},
  ];

  const getRefundList = useCallback (async () => {
    try {
      const totalAndRefundList : refundList = await getRefundList_s(pageNo, pageSize, filter, filterValue, sort, sortValue, 200);
      setRefunds(totalAndRefundList.list);
      setLastPage(totalAndRefundList.totalCount === 0? 1:Math.floor((totalAndRefundList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching refund list:', error);
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
    getRefundList(); // 비동기 함수 호출
  }, [getRefundList]);

  return (
    <div>
      <h1>환불요청</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminRefundListComponent refunds={refunds}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminRefundRequest;
