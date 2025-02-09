import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchProductList_s } from "../../services/product";
import { BottomButton, SearchFilter, SearchProductList } from "../../components";

const Search:React.FC = () => {
  const [searchParams, setSearchParams]=useSearchParams();
  const [searchProducts, setSearchProducts] = useState<shopProduct[]>([]);
  const [filterFlag, setFilterFlag] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(parseInt(searchParams.get("pageSize") || "20"));
  const [lastPage, setLastPage] = useState<number>(1);
  const getProductList = useCallback( async () => {
    try {
      const options : {params:string[], values:string[]} = makeOption();
      console.log(options);
      const order: string[] = checkOrder();
      const test : searchParams = {page: pageNo - 1, size: pageSize, orderBy:order[0], orderByType:order[1], ...options};
      const totalAndProductList : shopProductList = await getSearchProductList_s(test);
      setSearchProducts(totalAndProductList.list);
      setLastPage(totalAndProductList.totalCount === 0? 1:Math.floor((totalAndProductList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  },[searchParams.toString()]);
  const checkOrder = () : string[] => {
    const result:string[] =[];
    if (searchParams.get("order")){
      const OrderType = searchParams.get("order");
      if (OrderType === "1"){
        result.push("realPrice");
        result.push("asc");
      }
      else if (OrderType === "2"){
        result.push("realPrice");
        result.push("desc");
      }else{
        result.push("createdDateTime");
        result.push("desc");
      }
    }else{
      result.push("createdDateTime");
      result.push("desc");
    }
    return result;
  };
  const makeOption = () : {params:string[], values:string[]} => {
    const result:{params:string[], values:string[]} = {params:[] ,values:[]};
    let temp = searchParams.get("category");
    if (temp){
      result.params.push("CategoryID");
      result.values.push(temp);
    }
    temp = searchParams.get("sellerID");
    if (temp){
      result.params.push("sellerID");
      result.values.push(temp);
    }
    temp = searchParams.get("minimum");
    if (temp){
      result.params.push("startPrice");
      result.values.push(temp);
    }
    temp = searchParams.get("maximum");
    if (temp){
      result.params.push("endPrice");
      result.values.push(temp);
    }
    temp = searchParams.get("q");
    if (temp){
      result.params.push("name");
      result.values.push(temp);
    }
    return result;
  };
  const changePage = (move:number) =>{
    setPageNo(move);
  }

  useEffect(() => {
    getProductList(); // 비동기 함수 호출
  }, [getProductList]);

  return (
    <div>
      <h1>검색 결과</h1>
      {filterFlag ? <SearchFilter setFilterFlag={setFilterFlag}/> : <h2 onClick={() => setFilterFlag(true)}>상세 검색</h2>}
      <SearchProductList products={searchProducts}></SearchProductList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
}

export default Search;
