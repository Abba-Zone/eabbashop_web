import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, ProductList, SearchSet } from '../../components';
import { getProductList_s } from '../../services/product';
import { useTranslation } from 'react-i18next';

const AdminProductList: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<product[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminProduct:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminProduct:List.Filter02"), select:'seller', selectType:'text', itemList:[]},
    {selectName:t("AdminProduct:List.Filter03"), select:'stock', selectType:'text', itemList:[]},
    {selectName:t("AdminProduct:List.Filter04"), select:'activeYN', selectType:'select', itemList:[t("AdminProduct:List.Option04.Attribute01"), t("AdminProduct:List.Option04.Attribute02")]},
  ];
  const getProductList = useCallback( async () => {
      try {
        const totalAndProductList : productList = await getProductList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
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
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    if (key === 3 && value === "활성화")
      setFilterValue("true");
    else if (key === 3 && value === "비활성화")
      setFilterValue("false");
    else
      setFilterValue(value);
  }

  useEffect(() => {
    getProductList(); // 비동기 함수 호출
    }, [getProductList]);
  return (
    <div>
      <h1>{t("AdminProduct:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <ProductList products={products} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminProductList;
