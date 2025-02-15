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
  const [sort, setSort] = useState<string>("DESC");
  const [sortValue, setSortValue] = useState<string>("createdDateTime");
  const params = useParams<{id:string}>();
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminStore:Detail.Item03.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminStore:Detail.Item03.Filter02"), select:'stock', selectType:'text', itemList:[]},
    {selectName:t("AdminStore:Detail.Item03.Filter03"), select:'activeYN', selectType:'select', itemList:[t("AdminStore:Detail.Item03.Option03.Attribute01"), t("AdminStore:Detail.Item03.Option03.Attribute02")]},
  ];
  const getStoreProductList = useCallback( async () => {
      try {
        if (params.id !== undefined){
            const totalAndProductList : productList = await getStoreProductList_s(pageNo-1, pageSize, selectList[filter].select, filterValue, sort, sortValue, params.id);
            console.log(totalAndProductList);
            setProducts(totalAndProductList.list);
            setLastPage(totalAndProductList.totalCount === 0? 1:Math.floor((totalAndProductList.totalCount - 1)/pageSize) + 1);
        }
      } catch (error) {
        console.error('Error fetching storeProduct list:', error);
      }
  },[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
        setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sortValue){
      if(sort ==='ASC')
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
      <h1>{t("AdminStore:Detail.Item03.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <StoreProductList products={products} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminStoreProcutListComponent;
