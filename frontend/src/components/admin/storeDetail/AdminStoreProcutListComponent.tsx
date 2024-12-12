import { useCallback, useEffect, useState } from "react";
import SearchSet from "../../common/list/SearchSet";
import BottomButton from "../../common/list/BottomButton";
import StoreProductList from "./StoreProductList";
import { useParams } from "react-router-dom";
import { getStoreProductList_s } from "../../../services/store";
import { useTranslation } from "react-i18next";

const AdminStoreProcutListComponent: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<product[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("CreatedDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const params = useParams<{id:string}>();
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'상품명', select:'name', selectType:'text', itemList:[]},
    {selectName:'재고', select:'stock', selectType:'text', itemList:[]},
    {selectName:'활성화', select:'activeYN', selectType:'select', itemList:['활성화', '비활성화']},
  ];
  const getStoreProductList = useCallback( async () => {
      try {
        if (params.id !== undefined){
            const totalAndProductList : productList = await getStoreProductList_s(params.id, pageNo, pageSize, filter, filterValue, sort, sortValue);
            setProducts(totalAndProductList.products);
            setLastPage(totalAndProductList.totalProduct === 0? 1:Math.floor((totalAndProductList.totalProduct - 1)/pageSize) + 1);
        }
      } catch (error) {
        console.error('Error fetching storeProduct list:', error);
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
    getStoreProductList(); // 비동기 함수 호출
    }, [getStoreProductList]);

  return (
    <div>
      <h1>상품리스트</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <StoreProductList products={products} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminStoreProcutListComponent;
