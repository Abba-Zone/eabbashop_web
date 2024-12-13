import React, { useCallback, useEffect, useState } from 'react';
import { AdminPaymentRequestListComponent, BottomButton, SearchSet } from '../../components';
import { getPaymentList_s } from '../../services/customRequest';

const AdminPaymentRequest: React.FC = () => {
  const [payments, setPayments] = useState<payment[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:"요청자", select:'name', selectType:'text', itemList:[]},
    {selectName:"결제금액", select:'money', selectType:'text', itemList:[]},
    {selectName:"요청일", select:'createdDateTime', selectType:'date', itemList:[]},
    {selectName:"상태", select:'status', selectType:'text', itemList:["완료", "보류중"]},
  ];

  const getPaymentList = useCallback (async () => {
    try {
      const totalAndPaymentList : paymentList = await getPaymentList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setPayments(totalAndPaymentList.list);
      setLastPage(totalAndPaymentList.totalCount === 0? 1:Math.floor((totalAndPaymentList.totalCount - 1)/pageSize) + 1);
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
    getPaymentList(); // 비동기 함수 호출
  }, [getPaymentList]);

  return (
    <div>
      <h1>결제요청</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminPaymentRequestListComponent payments={payments}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminPaymentRequest;
