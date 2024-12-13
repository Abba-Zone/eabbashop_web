import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, SearchSet, ShipmentList } from '../../components';
import { getShipmentList_s } from '../../services/sale';
import { useTranslation } from 'react-i18next';

const AdminShipmentList: React.FC = () => {
  const { t } = useTranslation();
  const [shipments, setShipments] = useState<shipment[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminShipment:List.Filter01"), select:'orderDetailID', selectType:'text', itemList:[]},
    {selectName:t("AdminShipment:List.Filter02"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminShipment:List.Filter03"), select:'invoiceNo', selectType:'text', itemList:[]},
    {selectName:t("AdminShipment:List.Filter04"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];
  const getShipmentList = useCallback (async () => {
    try {
      const totalAndShipmentList : shipmentList = await getShipmentList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setShipments(totalAndShipmentList.list);
      setLastPage(totalAndShipmentList.totalCount === 0? 1:Math.floor((totalAndShipmentList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching shipment list:', error);
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
    getShipmentList(); // 비동기 함수 호출
  }, [getShipmentList]);

  return (
    <div>
      <h1>
      {t("AdminShipment:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <ShipmentList shipments={shipments} changeSort={changeSort}></ShipmentList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminShipmentList;
