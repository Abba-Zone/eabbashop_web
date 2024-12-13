import React, { useCallback, useEffect, useState } from 'react';
import { AdminShareMoneyListComponent, BottomButton, SearchSet } from '../../components';

const AdminShareMoneyList: React.FC = () => {
  const [shareMoneys, setShareMoneys] = useState<shareMoney[]>([]);
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
    {selectName:'이메일', select:'seller', selectType:'text', itemList:[]},
    {selectName:'재고', select:'stock', selectType:'text', itemList:[]},
    {selectName:'활성화', select:'activeYN', selectType:'select', itemList:['활성화', '비활성화']},
  ];
  const getShareMoneyList = useCallback( async () => {
      try {
        // const total_and_productList : productList = await getProductList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
        // setProducts(total_and_productList.products);
        // setLastPage(total_and_productList.totalProduct === 0? 1:Math.floor((total_and_productList.totalProduct - 1)/pageSize) + 1);
      } catch (error) {
        console.error('Error fetching shareMoney list:', error);
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
    getShareMoneyList(); // 비동기 함수 호출
    }, [getShareMoneyList]);
  return (
    <div>
      <h1>수당분배</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminShareMoneyListComponent shareMoneys={shareMoneys} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
}


export default AdminShareMoneyList;
