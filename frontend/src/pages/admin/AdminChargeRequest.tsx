import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, SearchSet, AdminChargeListComponent } from '../../components';
import { getPointHistoryRequestAdmin_s, changeChargeRequestStatus_s } from '../../services/point';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AdminChargeRequest: React.FC = () => {
  const { t } = useTranslation('');
  const [requests, setRequests] = useState<pointHistoryInfo[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{id: string, status: string, action: 'approve' | 'reject'} | null>(null);
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminChargeRequest:List.Filter01"), select:'requester', selectType:'text', itemList:[]},
    {selectName:t("AdminChargeRequest:List.Filter02"), select:'type', selectType:'text', itemList:[]},
    {selectName:t("AdminChargeRequest:List.Filter03"), select:'amount', selectType:'text', itemList:[]},
    {selectName:t("AdminChargeRequest:List.Filter04"), select:'status', selectType:'text', itemList:[]},
    {selectName:t("AdminChargeRequest:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const navigate = useNavigate();

  const getTransferList = useCallback(async () => {
    try {
      const totalAndTransferList: pointHistory = 
        await getPointHistoryRequestAdmin_s(pageNo-1, pageSize, filter, filterValue, sort, sortValue);
      
      // A,C,E,G 상태만 필터링
      const filteredList = {
        ...totalAndTransferList,
        list: totalAndTransferList.list.filter(item => 
          ['A', 'C', 'E', 'G'].includes(item.status)
        )
      };
      
      setRequests(filteredList.list);
      console.log("filteredList = ", filteredList);
      setLastPage(filteredList.list.length === 0 ? 1 : Math.floor((filteredList.list.length - 1)/pageSize) + 1);
      console.log("lastPage = ", lastPage);
      
    } catch (error) {
      console.error('Error fetching transfer list:', error);
    }
  }, [pageNo, pageSize, filter, filterValue, sort, sortValue]);

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
    setFilter(selectList[key].select);
    setFilterValue(value);
  }

  const handleReject = async (chargeRefundId: string, status: string) => {
    setSelectedRequest({ id: chargeRefundId, status, action: 'reject' });
    setShowConfirmModal(true);
  };

  const handleApprove = async (chargeRefundId: string, status: string) => {
    setSelectedRequest({ id: chargeRefundId, status, action: 'approve' });
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (!selectedRequest) return;
    const { id, status, action } = selectedRequest;
    try {
      if (action === 'reject') {
        if (status === 'A') {
          await changeChargeRequestStatus_s(id, 'G');
        } else if (status === 'B') {
          await changeChargeRequestStatus_s(id, 'H');
        }
      } else {
        if (status === 'A') {
          await changeChargeRequestStatus_s(id, 'E');
        } else if (status === 'B') {
          await changeChargeRequestStatus_s(id, 'F');
        }
      }
      window.location.reload();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setShowConfirmModal(false);
      setSelectedRequest(null);
    }
  };

  const handleRowClick = (chargeRefundId: string) => {
    navigate(`/admin/charge-request/detail?chargeRefundId=${chargeRefundId}`);
  }

  useEffect(() => {
    getTransferList();
  }, [getTransferList]);

  return (
    <div>
      <h1>{t("AdminChargeRequest:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminChargeListComponent 
        requests={requests} 
        changeSort={changeSort}
        onRowClick={handleRowClick}
        onReject={handleReject}
        onApprove={handleApprove}
      />
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>

      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <h3>
              {selectedRequest?.action === 'approve' ? '승인하시겠습니까?' : '거절하시겠습니까?'}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleConfirm}>확인</button>
              <button onClick={() => {
                setShowConfirmModal(false);
                setSelectedRequest(null);
              }}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChargeRequest;