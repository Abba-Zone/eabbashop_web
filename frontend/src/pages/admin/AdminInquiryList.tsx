import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, InquiryList, SearchSet } from '../../components';
import { getInquiryList_s } from '../../services/inquiry';
import { useTranslation } from 'react-i18next';

const AdminInquiryList: React.FC = () => {
  const { t } = useTranslation();
  const [inquirys, setInquirys] = useState<inquiry[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("CreatedDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminInquiry:List.Filter01"), select:'title', selectType:'text', itemList:[]},
    {selectName:t("AdminInquiry:List.Filter02"), select:'type', selectType:'select', itemList:[t("AdminInquiry:List.Option1.Attribute01"), t("AdminInquiry:List.Option1.Attribute02")]},
    {selectName:t("AdminInquiry:List.Filter03"), select:'name', selectType:'text', itemList:[]},    
    {selectName:t("AdminInquiry:List.Filter04"), select:'status', selectType:'select', itemList:[t("AdminInquiry:List.Option2.Attribute01"), t("AdminInquiry:List.Option2.Attribute02")]},
    {selectName:t("AdminInquiry:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getInquiryList = useCallback (async () => {
    try {
      const totalAndInquiryList : inquiryList = await getInquiryList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setInquirys(totalAndInquiryList.list);
      setLastPage(totalAndInquiryList.totalCount === 0? 1:Math.floor((totalAndInquiryList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching inquiry list:', error);
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
    getInquiryList(); // 비동기 함수 호출
  }, [getInquiryList]);

  return (
    <div>
      <h2>{t("AdminInquiry:List.Title")}</h2>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <InquiryList inquirys={inquirys} changeSort={changeSort}></InquiryList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminInquiryList;
