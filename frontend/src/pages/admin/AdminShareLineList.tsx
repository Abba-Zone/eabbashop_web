import React, { useCallback, useEffect, useState } from 'react';
import { AdminShareLineListComponent, BottomButton, SearchSet } from '../../components';
import { getShareLineList_s } from '../../services/share';

const AdminShareLineList: React.FC = () => {
  const [shareLines, setShareLines] = useState<shareLine[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'이름', select:'name', selectType:'text', itemList:[]},
    {selectName:'이메일', select:'email', selectType:'text', itemList:[]},
    {selectName:'전화', select:'phone', selectType:'text', itemList:[]},
    {selectName:'역할', select:'role', selectType:'select', itemList:['대리점', '협력사사']},
    {selectName:'고객수', select:'memberNM', selectType:'text', itemList:[]},
  ];
  const getShareLineList = useCallback( async () => {
      try {
        const totalAndShareLineList : shareLineList = await getShareLineList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
        setShareLines(totalAndShareLineList.list);
        setLastPage(totalAndShareLineList.totalCount === 0? 1:Math.floor((totalAndShareLineList.totalCount - 1)/pageSize) + 1);
      } catch (error) {
        console.error('Error fetching shareLine list:', error);
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
    getShareLineList(); // 비동기 함수 호출
    }, [getShareLineList]);
  return (
    <div>
      <h1>수당라인</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminShareLineListComponent shareLines={shareLines} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
}

export default AdminShareLineList;
