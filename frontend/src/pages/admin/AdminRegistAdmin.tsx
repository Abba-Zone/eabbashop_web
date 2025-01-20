import React, { useState, useEffect, useCallback } from 'react';
import { requestAdminListAll_s, requestAdminResult_s, updateRole_s } from '../../services/member';
import { BottomButton, SearchSet } from '../../components';
import { useTranslation } from 'react-i18next';

const requestAdminApprove = async (changeRequestId: string, status: string) => {
  const response = await requestAdminResult_s(changeRequestId, status);
  alert(`${changeRequestId}에 대한 요청 승인 완료`);
  if (response) {
    window.location.reload();
  }
  return response;
}

const requestAdminReject = async (changeRequestId: string, value: string) => {
  const response = await requestAdminResult_s(changeRequestId, value);
  alert(`${changeRequestId}에 대한 요청 반려 완료`);
  if (response) {
    window.location.reload();
  }
  return response;
}

const AdminRegistAdmin: React.FC = () => {
  const { t } = useTranslation();
  const [adminList, setAdminList] = useState<requestAdminRegistList | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPageData, setCurrentPageData] = useState<requestAdminRegist[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [lastPage, setLastPage] = useState<number>(1);

  const fetchAdminList = useCallback(async () => {
    try {
      // const response = await requestAdminListAll_s(pageNo, pageSize, filter, filterValue);
      const response = await requestAdminListAll_s();
      console.log(response);
      setAdminList(response);
    } catch (error) {
      console.error('Error fetching admin list:', error);
    }
  }, []);

  const changePage = (move: number) => {
    setPageNo(move);
  }


  const renderUserName = (admin: requestAdminRegist) => {
    if (localStorage.getItem('language') === 'ko' || localStorage.getItem('language') === null) {
      return `${admin.member_last_name}${admin.member_first_name}`;
    } else {
      return `${admin.member_first_name}${admin.member_last_name}`;
    }
  }

  useEffect(() => {
    fetchAdminList();
  }, [fetchAdminList]);

  useEffect(() => {
    if (adminList) {
      const filtered = adminList.list.filter(admin => admin.status === '1' || admin.status === '3');
      setFilteredData(filtered);
      setLastPage(filtered.length === 0 ? 1 : Math.ceil(filtered.length / pageSize));
      setCurrentPageData(filtered.slice((pageNo - 1) * pageSize, pageNo * pageSize));
    }
  }, [pageNo, pageSize, adminList]);

  return (
    <div>
      <h1>AdminRegistAdmin</h1>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>신청 날짜</th>
            <th>상태</th>
            <th>요청</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((admin, index) => (
            <tr key={index}>
              <td>{renderUserName(admin)}</td>
              <td>{admin.member_email}</td>
              <td>{admin.member_phone}</td>
              <td>{admin.created_time}</td>
              <td>{admin.status_value}</td>
              <td>
                <button onClick={() => requestAdminApprove(admin.change_request_id, '2')}>승인</button> 
                <button onClick={() => requestAdminReject(admin.change_request_id, '3')}>반려</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminRegistAdmin;
