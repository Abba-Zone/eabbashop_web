import React, { useCallback, useEffect, useState } from 'react';
import { AdminReviewProductList, BottomButton, SearchSet } from '../../components';
import { getProductList_s } from '../../services/product';

const AdminProductReview: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(-1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'상품명', select:'name', selectType:'text', itemList:[]},
    {selectName:'판매자', select:'sellerID', selectType:'text', itemList:[]},
    {selectName:'재고', select:'stock', selectType:'text', itemList:[]},
    {selectName:'활성화', select:'activeYN', selectType:'select', itemList:['활성화', '비활성화']},
  ];
  const getProductList = useCallback( async () => {
      try {
        let filterArr = [];
        let filterValueArr = [];
        if (filter !== -1){
          filterArr.push(selectList[filter].select);
          filterValueArr.push(filterValue);
        }
        const totalAndProductList : productList = await getProductList_s(pageNo - 1, pageSize, filterArr, filterValueArr, sort, sortValue);
        setProducts(totalAndProductList.list);
        setLastPage(totalAndProductList.totalCount === 0? 1:Math.floor((totalAndProductList.totalCount - 1)/pageSize) + 1);
      } catch (error) {
        console.error('Error fetching product list:', error);
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
    setPageNo(1);
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    if (key === 3 && value === "활성화")
      setFilterValue("true");
    else if (key === 3 && value === "비활성화")
      setFilterValue("false");
    else
      setFilterValue(value);
    setPageNo(1);
  }

  useEffect(() => {
    getProductList(); // 비동기 함수 호출
    }, [getProductList]);
  return (
    <div>
      <h1>상품 리스트</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageNo(1);setPageSize(Number(event.target.value))}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select><span>개씩 보기</span>
      <AdminReviewProductList products={products} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminProductReview;
