import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getinquiryDetail_s } from '../../services/inquiry';
import { InquriryInfo, InquriryResponse } from '../../components';

const AdminInquiryDetail: React.FC = () => {
  const [inquiry, setInquiry] = useState<inquiryDetail | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getinquiryDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const inquiryDetail : inquiryDetail = await getinquiryDetail_s(params.id);
        setInquiry(inquiryDetail)
      }
    } catch (error) {
      console.error('Error fetching inquiryDetail:', error);
    }
  }, [params.id]);
  useEffect(() => {
    getinquiryDetail(); // 비동기 함수 호출
  }, [getinquiryDetail]);
  if (!inquiry) {
    return (
      <div>
        <h1>문의 정보가 없습니다.</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{inquiry.title}</h1>
      <div>
        <InquriryInfo inquiryInfo={inquiry}/>
      </div>
      <div>
      <InquriryResponse inquiryInfo={inquiry}/>
      </div>
    </div>
  );
};

export default AdminInquiryDetail;
