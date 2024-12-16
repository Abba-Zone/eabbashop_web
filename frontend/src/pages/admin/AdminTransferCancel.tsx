import React, { useCallback, useEffect, useState } from 'react';
import { AdminTransferCancelListComponent, BottomButton, SearchSet } from '../../components';
import { getTransferCancelList_s } from '../../services/customRequest';
import { useTranslation } from 'react-i18next';

const AdminTransferCancel: React.FC = () => {
  const { t } = useTranslation();
  const [transferCancels, setTransferCancels] = useState<transferCancel[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminTransferCancel:List.Filter01"), select:'senderName', selectType:'text', itemList:[]},
    {selectName:t("AdminTransferCancel:List.Filter02"), select:'receiverName', selectType:'text', itemList:[]},
    {selectName:t("AdminTransferCancel:List.Filter03"), select:'money', selectType:'text', itemList:[]},
    {selectName:t("AdminTransferCancel:List.Filter04"), select:'moneyType', selectType:'text', itemList:[]},
    {selectName:t("AdminTransferCancel:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
    {selectName:t("AdminTransferCancel:List.Filter06"), select:'status', selectType:'select', itemList:[t("AdminTransferCancel:List.Option06.Attribute01"), t("AdminTransferCancel:List.Option06.Attribute01")]},
  ];

  const getTransferCancelList = useCallback (async () => {
    try {
      const totalAndTransferCancelList : transferCancelList = await getTransferCancelList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setTransferCancels(totalAndTransferCancelList.list);
      setLastPage(totalAndTransferCancelList.totalCount === 0? 1:Math.floor((totalAndTransferCancelList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching transferCancel list:', error);
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
    getTransferCancelList(); // 비동기 함수 호출
  }, [getTransferCancelList]);

  return (
    <div>
      <h1>{t("AdminTransferCancel:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminTransferCancelListComponent transferCancels={transferCancels}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminTransferCancel;
