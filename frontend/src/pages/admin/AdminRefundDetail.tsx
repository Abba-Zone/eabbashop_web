import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminRefundInfo } from '../../components';
import { getRefundDetail_s } from '../../services/customRequest';
import { useTranslation } from 'react-i18next';

const AdminRefundDetail: React.FC = () => {
  const { t } = useTranslation();
  const [refundInfo, setRefundInfo] = useState<refundDetail | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getRefundDetail = useCallback (async () => {
      try {
          if (params.id !== undefined){
              const refundDetail : refundDetail = await getRefundDetail_s(params.id);
              setRefundInfo(refundDetail);
          }
      } catch (error) {
          console.error('Error fetching refundDetail:', error);
      }
  }, [params.id]);

  useEffect(() => {
    getRefundDetail(); // 비동기 함수 호출
  }, [getRefundDetail]);

  if (!refundInfo) {
      return (
          <div>
              <h1>{t("AdminRefund:Detail.Option.Attribute00")}</h1>
          </div>
      );
  }

  return (
      <div>
          <h1>{refundInfo.refundID}</h1>
          <AdminRefundInfo refundInfo={refundInfo}/>
      </div>
  );
};

export default AdminRefundDetail;
