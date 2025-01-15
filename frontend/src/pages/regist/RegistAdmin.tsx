import React, { useState, useEffect } from "react";
import "./RegistAdmin.css";
import { requestAdmin_s, requestAdminList_s } from "../../services/member";

const Cookies = require('js-cookie');

const isLogined = (): boolean => {
  if (Cookies.get('access-token') === undefined) {
    alert('로그인 후 이용해주세요.');
    window.location.href = '/login';
    return false;
  }
  return true;
}

const requestAdmin = async (adminList: requestAdminRegistList | null) => {
  if (adminList?.totalCount === 0) { // adminList가 null일 때만 요청
    const response = await requestAdmin_s();
    if (response) {
      window.location.reload();
    }
  } else {
    if (isLogined()) {
      alert('대리점 요청처리 중입니다. abbazon@gmail.com으로 문의해주세요.');
    }
  }
};

const RegistAdmin: React.FC = () => {
  const [adminList, setAdminList] = useState<requestAdminRegistList | null>(null);

  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        if (isLogined()) {
          const list = await requestAdminList_s();
          setAdminList(list);
        }
      } catch (error) {
        console.error('Failed to fetch admin list:', error);
      }
    };

    fetchAdminList();
  }, []);

  return (
    <div className="signup-container">
      <div className="logo-container">
        <img />
      </div>
      <h1>AbbaFamily가 되어보세요!</h1>
      <form className="signup-form">
        <button type="button" onClick={() => requestAdmin(adminList)}>대리점 신청</button>
      </form>
      <div className="admin-list">
        <h2>신청 내역</h2>
        {adminList ? (
          adminList.totalCount > 0 ? (
            <ul>
              {adminList.list.map((admin, index) => (
                <li key={index}> {admin.status_value}</li>
              ))}
            </ul>
          ) : (
            <p>신청 내역이 없습니다.</p>
          )
        ) : (
          <p>신청 내역을 불러오는 중입니다.</p>
        )}
      </div>
    </div>
  );
};

export default RegistAdmin;
