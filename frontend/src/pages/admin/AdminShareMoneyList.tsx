import React, { useCallback, useEffect, useState } from 'react';
import { AdminShareMoneyListComponent, BottomButton, SearchSet } from '../../components';
import { getShareMoneyList_s } from '../../services/share';
import { useTranslation } from 'react-i18next';

const AdminShareMoneyList: React.FC = () => {
  const { t } = useTranslation();
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
    {selectName:t("AdminShareMoney:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminShareMoney:List.Filter02"), select:'email', selectType:'text', itemList:[]},
    {selectName:t("AdminShareMoney:List.Filter03"), select:'grade', selectType:'select', itemList:['Gold', 'Silver']},
    {selectName:t("AdminShareMoney:List.Filter04"), select:'netAK', selectType:'text', itemList:[]},
    {selectName:t("AdminShareMoney:List.Filter05"), select:'role', selectType:'select', itemList:[t("AdminShareMoney:List.Option05.Attribute01"), t("AdminShareMoney:List.Option05.Attribute02"), t("AdminShareMoney:List.Option05.Attribute03"), t("AdminShareMoney:List.Option05.Attribute04"), t("AdminShareMoney:List.Option05.Attribute05")]},
    {selectName:t("AdminShareMoney:List.Filter06"), select:'zonAK', selectType:'text', itemList:[]},
  ];
  const getShareMoneyList = useCallback( async () => {
      try {
        const totalAndShareMoneyList : shareMoneyList = await getShareMoneyList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
        setShareMoneys(totalAndShareMoneyList.list);
        setLastPage(totalAndShareMoneyList.totalCount === 0? 1:Math.floor((totalAndShareMoneyList.totalCount - 1)/pageSize) + 1);
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
      <h1>{t("AdminShareMoney:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminShareMoneyListComponent shareMoneys={shareMoneys} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
}


export default AdminShareMoneyList;
