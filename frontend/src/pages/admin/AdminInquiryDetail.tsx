import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInquiryDetail_s } from '../../services/inquiry';
import { InquriryInfo, InquriryResponse } from '../../components';
import { useTranslation } from 'react-i18next';

const AdminInquiryDetail: React.FC = () => {
  const { t } = useTranslation();
  const [inquiry, setInquiry] = useState<inquiryDetail | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getInquiryDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const inquiryDetail : inquiryDetail = await getInquiryDetail_s(params.id);
        setInquiry(inquiryDetail);
      }
    } catch (error) {
      console.error('Error fetching inquiryDetail:', error);
    }
  }, [params.id]);
  useEffect(() => {
    getInquiryDetail(); // 비동기 함수 호출
  }, [getInquiryDetail]);
  if (!inquiry) {
    return (
      <div>
        <h1>{t("AdminInquiry:Detail.Option.Attribute00")}</h1>
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
