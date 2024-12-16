import React, { useCallback, useEffect, useState } from 'react';
import { AdminShareMoneyDetailListComponent, BottomButton, SearchSet } from '../../components';
import { useParams } from 'react-router-dom';
import { getShareMoneyDetailList_s } from '../../services/share';
import { useTranslation } from 'react-i18next';

const AdminShareMoneyDetail: React.FC = () => {
  const { t } = useTranslation();
  const [shareMoneyDetails, setShareMoneyDetails] = useState<shareMoneyDetail[]>([]);
  const [memberInfo, setMemberInfo] = useState<{name:string, email:string} | undefined>(undefined);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const params = useParams<{id:string}>();
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminShareMoney:Detail.Filter01"), select:'platform', selectType:'select', itemList:['net', 'zon']},
    {selectName:t("AdminShareMoney:Detail.Filter02"), select:'rate', selectType:'text', itemList:[]},
    {selectName:t("AdminShareMoney:Detail.Filter03"), select:'money', selectType:'text', itemList:[]},
    {selectName:t("AdminShareMoney:Detail.Filter04"), select:'accumulation', selectType:'text', itemList:[]},
    {selectName:t("AdminShareMoney:Detail.Filter05"), select:'status', selectType:'select', itemList:['canceled', 'pass', 'complete']},
    {selectName:t("AdminShareMoney:Detail.Filter06"), select:'createdDateTime', selectType:'date', itemList:[]},
  
  ];
  const getShareMoneyDetailList = useCallback( async () => {
      try {
        if (params.id){
          const totalAndShareMoneyDetailList : shareMoneyDetailList = await getShareMoneyDetailList_s(params.id, pageNo, pageSize, filter, filterValue, sort, sortValue);
          setShareMoneyDetails(totalAndShareMoneyDetailList.list);
          setMemberInfo({name:totalAndShareMoneyDetailList.name, email:totalAndShareMoneyDetailList.email});
          setLastPage(totalAndShareMoneyDetailList.totalCount === 0? 1:Math.floor((totalAndShareMoneyDetailList.totalCount - 1)/pageSize) + 1);
        }
      } catch (error) {
        console.error('Error fetching shareMoneyDetail list:', error);
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
    getShareMoneyDetailList(); // 비동기 함수 호출
    }, [getShareMoneyDetailList]);
  if(!memberInfo){
    return(
      <div><h1>{t("AdminShareMoney:Detail.Option.Attribute00")}</h1></div>
    )
  }
  return (
    <div>
      <h1>{memberInfo.name} ({memberInfo.email})</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminShareMoneyDetailListComponent shareMoneyDetails={shareMoneyDetails} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminShareMoneyDetail;
