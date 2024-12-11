import React, { useCallback, useEffect, useState } from 'react';
import { AdminBoardList, BottomButton, SearchSet } from '../../components';
import { getBoardList_s } from '../../services/board';

const AdminNotice: React.FC = () => {
  const [notices, setNotices] = useState<board[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:"제목", select:'title', selectType:'text', itemList:[]},
    {selectName:"작성자", select:'name', selectType:'text', itemList:[]},
    {selectName:"상단고정", select:'topYN', selectType:'select', itemList:['활성화', '비활성화']},
    {selectName:"활성화", select:'showYN', selectType:'select', itemList:['활성화', '비활성화']},
    {selectName:"작성일", select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getNoticeList = useCallback (async () => {
    try {
      const totalAndBoardList : boardList = await getBoardList_s(pageNo, pageSize, filter, filterValue, sort, sortValue, 100);
      setNotices(totalAndBoardList.boards);
      setLastPage(totalAndBoardList.totalBoard === 0? 1:Math.floor((totalAndBoardList.totalBoard - 1)/pageSize) + 1);
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
    getNoticeList(); // 비동기 함수 호출
  }, [getNoticeList]);

  return (
    <div>
      <h1>공지사항</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminBoardList boards={notices}  changeSort={changeSort}></AdminBoardList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminNotice;
