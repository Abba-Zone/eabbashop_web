import React, { useCallback, useEffect, useState } from 'react';
import { AdminDonationList, BottomButton, SearchSet } from '../../components';
import { getDonationList_s } from '../../services/donation';

const AdminDonation: React.FC = () => {
  const [donations, setDonations] = useState<donation[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:"기부자", select:'name', selectType:'text', itemList:[]},
    {selectName:"기부금", select:'money', selectType:'text', itemList:[]},
    {selectName:"기부금유형", select:'type', selectType:'text', itemList:[]},
    {selectName:"기부누적금", select:'accumulation', selectType:'text', itemList:[]},
    {selectName:"기부일자", select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getDonationList = useCallback (async () => {
    try {
      const totalAndDonationList : donationList = await getDonationList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setDonations(totalAndDonationList.donation);
      setLastPage(totalAndDonationList.totalDonation === 0? 1:Math.floor((totalAndDonationList.totalDonation - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching notice list:', error);
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
    getDonationList(); // 비동기 함수 호출
  }, [getDonationList]);

  return (
    <div>
      <h1>기부내역</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminDonationList donations={donations} changeSort={changeSort}></AdminDonationList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminDonation;
