import React, { useState, useEffect, useCallback } from 'react';
import { requestAdminListAll_s, requestAdminResult_s, updateRole_s } from '../../services/member';
import { BottomButton, SearchSet } from '../../components';
import { useTranslation } from 'react-i18next';

const requestAdminApprove = async (changeRequestId: string, value: string, memberID: string, grade: string) => {
  const response = await requestAdminResult_s(changeRequestId, value);
  userRoleUpdate(memberID, grade);
  alert(`${changeRequestId}에 대한 요청 승인 완료`);
  if (response) {
    window.location.reload();
  }
  return response;
}

const userRoleUpdate = async (memberID: string, value: string) => {
  const response = await updateRole_s(memberID, value);
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
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const selectList = [
    { selectName: t("AdminManagerMember:List.Filter01"), select: 'name', selectType: 'text', itemList: [] },
    { selectName: t("AdminManagerMember:List.Filter02"), select: 'email', selectType: 'text', itemList: [] },
    // 필요한 필터 추가
  ];

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

  const changeFilter = (key: number, value: string) => {
    setFilter(key);
    setFilterValue(value);
  }

  useEffect(() => {
    fetchAdminList();
  }, [fetchAdminList]);

  useEffect(() => {
    if (adminList) {
      const filtered = adminList.list.filter(admin => admin.status === '1');
      setFilteredData(filtered);
      setLastPage(filtered.length === 0 ? 1 : Math.ceil(filtered.length / pageSize));
      setCurrentPageData(filtered.slice((pageNo - 1) * pageSize, pageNo * pageSize));
    }
  }, [pageNo, pageSize, adminList]);

  return (
    <div>
      <h1>AdminRegistAdmin</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>ChangeRequestId</th>
            <th>MemberEmail</th>
            <th>MemberName</th>
            <th>MemberPhone</th>
            <th>날짜</th>
            <th>요청</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((admin, index) => (
            <tr key={index}>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.status_value}</td>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.change_request_id}</td>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.member_id}</td>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.member_name}</td>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.member_phone}</td>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.created_time}</td>
              <td>
                <button onClick={() => requestAdminApprove(admin.change_request_id, '2', admin.member_id, 'B')}>승인</button> 
                {/* admin.Aftervalue값 활용하는 형태로 변경 필요 */}
                <button onClick={() => requestAdminReject(admin.change_request_id, '3')}>거절</button>
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
