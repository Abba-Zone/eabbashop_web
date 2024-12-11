import React, { useCallback, useEffect, useState } from 'react';
import { AdminBoardList, BottomButton, SearchSet } from '../../components';
import { getBoardList_s } from '../../services/board';
import { useTranslation } from 'react-i18next';

const AdminNotice: React.FC = () => {
  const { t } = useTranslation();
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
    {selectName:t("AdminBoard:List.Filter01"), select:'title', selectType:'text', itemList:[]},
    {selectName:t("AdminBoard:List.Filter02"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminBoard:List.Filter03"), select:'topYN', selectType:'select', itemList:['ON', 'OFF']},
    {selectName:t("AdminBoard:List.Filter04"), select:'showYN', selectType:'select', itemList:['ON', 'OFF']},
    {selectName:t("AdminBoard:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
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
      <h1>{t("AdminBoard:List.NoticeTitle")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminBoardList boards={notices}  changeSort={changeSort}></AdminBoardList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminNotice;
