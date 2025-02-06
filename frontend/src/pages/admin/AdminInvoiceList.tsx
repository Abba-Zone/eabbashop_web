import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, InvoiceList, SearchSet } from '../../components';
import { getInvoiceList_s } from '../../services/sale';
import { useTranslation } from 'react-i18next';

const AdminInvoiceList: React.FC = () => {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<invoice[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(0);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("DESC");
  const [sortValue, setSortValue] = useState<string>("createdDateTime");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminInvoice:List.Filter01"), select:'orderDetailID', selectType:'text', itemList:[]},
    {selectName:t("AdminInvoice:List.Filter02"), select:'invoiceNo', selectType:'text', itemList:[]},
    {selectName:t("AdminInvoice:List.Filter03"), select:'name', selectType:'text', itemList:[]},    
    {selectName:t("AdminInvoice:List.Filter04"), select:'status', selectType:'select', itemList:[t("AdminInvoice:List.Option4.Attribute01"), t("AdminInvoice:List.Option4.Attribute02"), t("AdminInvoice:List.Option4.Attribute03")]},
    {selectName:t("AdminInvoice:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getInvoiceList = useCallback (async () => {
    try {
      const totalAndInvoiceList : invoiceList = await getInvoiceList_s(pageNo - 1, pageSize, selectList[filter].select, filterValue, sort, sortValue);
      setInvoices(totalAndInvoiceList.list);
      setLastPage(totalAndInvoiceList.totalCount === 0? 1:Math.floor((totalAndInvoiceList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching invoice list:', error);
    }
},[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
      setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sort){
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
    setFilterValue(value);
  }

  useEffect(() => {
    getInvoiceList(); // 비동기 함수 호출
  }, [getInvoiceList]);

  return (
    <div>
      <h1>{t("AdminInvoice:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <InvoiceList invoices={invoices} changeSort={changeSort}></InvoiceList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminInvoiceList;
