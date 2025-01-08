import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getBoardList_s } from '../../services/board';
import { AdminBoardList, AdminBoardRegistModal, BottomButton, SearchSet } from '../../components';
import { useTranslation } from 'react-i18next';

const AdminLetter: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [letters, setLetters] = useState<board[]>([]);
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
  const modalRef = useRef<HTMLDivElement>(null); // modal에 대한 ref 추가

  const getLetterList = useCallback (async () => {
    try {
      const totalAndBoardList : boardList = await getBoardList_s(pageNo, pageSize, filter, filterValue, sort, sortValue, 200);
      setLetters(totalAndBoardList.list);
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
    getLetterList(); // 비동기 함수 호출
  }, [getLetterList]);

  return (
    <div>
      <h1>{t("AdminBoard:List.LetterTitle")}<button onClick={() => setModalOpen(true)}>등록</button></h1>
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
        }}><AdminBoardRegistModal type={t("AdminBoard:Regist.LetterTitle")} setModalOpen={setModalOpen}/></div>
      }
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminBoardList boards={letters}  changeSort={changeSort}></AdminBoardList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminLetter;
