import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AdminProductRegistModal, BottomButton, ProductList, SearchSet } from '../../components';
import { getProductList_s } from '../../services/product';
import { useTranslation } from 'react-i18next';

const AdminProductList: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    {selectName:t("AdminProduct:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminProduct:List.Filter02"), select:'seller', selectType:'text', itemList:[]},
    {selectName:t("AdminProduct:List.Filter03"), select:'stock', selectType:'text', itemList:[]},
    {selectName:t("AdminProduct:List.Filter04"), select:'activeYN', selectType:'select', itemList:[t("AdminProduct:List.Option04.Attribute01"), t("AdminProduct:List.Option04.Attribute02")]},
  ];
  const modalRef = useRef<HTMLDivElement>(null); // modal에 대한 ref 추가
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
      <h1>{t("AdminProduct:List.Title")} <button onClick={() => setModalOpen(true)}>등록</button></h1>
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
        }}><AdminProductRegistModal setModalOpen={setModalOpen}/></div>
      }
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageNo(1); setPageSize(Number(event.target.value))}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select><span>개씩 보기</span>
      <ProductList products={products} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminProductList;
