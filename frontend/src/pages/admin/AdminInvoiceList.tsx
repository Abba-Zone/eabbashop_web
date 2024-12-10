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
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'주문아이디', select:'orderDetailID', selectType:'text', itemList:[]},
    {selectName:'송장번호', select:'invoiceNo', selectType:'text', itemList:[]},
    {selectName:'받는사람', select:'name', selectType:'text', itemList:[]},    
    {selectName:'상태', select:'status', selectType:'select', itemList:['처리중', '완료', '결제']},
    {selectName:'송장발급일', select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getInvoiceList = useCallback (async () => {
    try {
      const totalAndInvoiceList : invoiceList = await getInvoiceList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setInvoices(totalAndInvoiceList.invoices);
      setLastPage(totalAndInvoiceList.totalInvoice === 0? 1:Math.floor((totalAndInvoiceList.totalInvoice - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching invoice list:', error);
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
