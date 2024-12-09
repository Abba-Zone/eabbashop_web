import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, SearchSet } from '../../components';
import { getProductList_s } from '../../services/product';

const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("CreatedDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'상품명', select:'name', selectType:'text', itemList:[]},
    {selectName:'판매자', select:'seller', selectType:'text', itemList:[]},
    {selectName:'재고', select:'stock', selectType:'text', itemList:[]},
    {selectName:'활성화', select:'activeYN', selectType:'select', itemList:['활성화', '비활성화']},
  ];
  const getUserList = useCallback( async () => {
      try {
        const total_and_productList : productList = await getProductList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
        setProducts(total_and_productList.products);
        setLastPage(total_and_productList.totalProduct === 0? 1:Math.floor((total_and_productList.totalProduct - 1)/pageSize) + 1);
      } catch (error) {
        console.error('Error fetching user list:', error);
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
      getUserList(); // 비동기 함수 호출
    }, [getUserList]);
  return (
    <div>
      <h1>AdminProductList</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminProductList;
