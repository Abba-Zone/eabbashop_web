import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AdminBoardList, AdminBoardRegistModal, BottomButton, SearchSet } from '../../components';
import { getBoardList_s } from '../../services/board';
import { useTranslation } from 'react-i18next';

const AdminNotice: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [notices, setNotices] = useState<board[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("DESC");
  const [sortValue, setSortValue] = useState<string>("createdDateTime");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminBoard:List.Filter01"), select:'title', selectType:'text', itemList:[]},
    {selectName:t("AdminBoard:List.Filter02"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminBoard:List.Filter03"), select:'topYN', selectType:'select', itemList:['ON', 'OFF']},
    {selectName:t("AdminBoard:List.Filter04"), select:'showYN', selectType:'select', itemList:['ON', 'OFF']},
    {selectName:t("AdminBoard:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];
  const modalRef = useRef<HTMLDivElement>(null); // modal에 대한 ref 추가

  const getNoticeList = useCallback (async () => {
    try {
      const filterName = selectList[filter].select;
      const totalAndBoardList : boardList = await getBoardList_s(pageNo - 1, pageSize, filterName, filterValue, sort, sortValue, 100);
      setNotices(totalAndBoardList.list);
      setLastPage(totalAndBoardList.totalCount === 0? 1:Math.floor((totalAndBoardList.totalCount - 1)/pageSize) + 1);
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
        setSort('DESC')
      else
        setSort('ASC')
    } else {
      setSortValue(sortName);
      setSort('ASC');
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
      <h1>{t("AdminBoard:List.NoticeTitle")}<button onClick={() => setModalOpen(true)}>등록</button></h1>
      {
        modalOpen && 
        <div 
          ref={modalRef}
          style={{
          "width": "100%",
          "height": "100%",
          "position": "fixed",
          "top": "0",
          "left": "0",
          "display": "flex",
          "background": "rgba(0, 0, 0, 0.5)"
        }}><AdminBoardRegistModal type={100} setModalOpen={setModalOpen}/></div>
      }
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageNo(1);setPageSize(Number(event.target.value))}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select><span>개씩 보기</span>
      <AdminBoardList boards={notices}  changeSort={changeSort}></AdminBoardList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminNotice;
