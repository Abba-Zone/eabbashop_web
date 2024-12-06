import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, InquiryList, SearchSet } from '../../components';
import { getInquiryList_s } from '../../services/inquiry';

const AdminInquiryList: React.FC = () => {
  const [inquirys, setInquirys] = useState<inquiry[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("CreatedDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'제목', select:'name', selectType:'text', itemList:[]},
    {selectName:'작성자', select:'email', selectType:'text', itemList:[]},
    {selectName:'유형', select:'type', selectType:'select', itemList:['처리중', '완료']},    
    {selectName:'상태', select:'phone', selectType:'select', itemList:['처리중', '완료']},
    {selectName:'작성일', select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getInquiryList = useCallback (async () => {
    try {
      const totalAndInquiryList : inquiryList = await getInquiryList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setInquirys(totalAndInquiryList.inquirys);
      setLastPage(totalAndInquiryList.totalInquiy === 0? 1:Math.floor((totalAndInquiryList.totalInquiy - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching inquiry list:', error);
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
    getInquiryList(); // 비동기 함수 호출
  }, [getInquiryList]);

  return (
    <div>
      <h2>고객 문의</h2>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <InquiryList inquirys={inquirys} changeSort={changeSort}></InquiryList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminInquiryList;
