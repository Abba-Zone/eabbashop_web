import React, { useState, useEffect } from 'react';
import { requestAdminListAll_s, requestAdminResult_s } from '../../services/member';


const requestAdminApprove = async (changeRequestId:string, value:string) => {
  const response = await requestAdminResult_s(changeRequestId, value);
  alert(`${changeRequestId}에 대한 요청 승인 완료`);
  return response;
}

const requestAdminReject = async (changeRequestId:string, value:string) => {
  const response = await requestAdminResult_s(changeRequestId, value);
  alert(`${changeRequestId}에 대한 요청 반려 완료`);
  return response;
}

const AdminRegistAdmin: React.FC = () => {
  const [adminList, setAdminList] = useState<requestAdminRegistList | null>(null);

  useEffect(() => {
    const fetchAdminList = async () => {
      const response = await requestAdminListAll_s();
      setAdminList(response);
    };
    fetchAdminList();
  }, []);

  return (
    <div>
      <h1>AdminRegistAdmin</h1>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>StatusValue</th>
            <th>ChangeRequestId</th>
            <th>요청</th>
          </tr>
        </thead>
        <tbody>
          {adminList?.list
            .filter(admin => admin.status === '1')
            .map((admin, index) => (
              <tr key={index}>
                <td>{admin.status_value}</td>
                <td>{admin.status}</td>
                <td>{admin.change_request_id}</td>
                <td>
                  <button onClick={() => requestAdminApprove(admin.change_request_id, '2')}>승인</button>
                  <button onClick={() => requestAdminReject(admin.change_request_id, '3')}>거절</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegistAdmin;
