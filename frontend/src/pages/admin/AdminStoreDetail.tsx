import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreDetail_s } from '../../services/store';
import { AdminStoreInfo, AdminStoreProcutListComponent } from '../../components';
import { useTranslation } from 'react-i18next';

const AdminStoreDetail: React.FC = () => {
  const { t } = useTranslation();
  const [storeInfo, setStoreInfo] = useState<storeInfo | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getStoreDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const storeDetail : storeInfo = await getStoreDetail_s(params.id);
        setStoreInfo(storeDetail);
      }
    } catch (error) {
      console.error('Error fetching storeDetail:', error);
    }
  }, [params.id]);
  useEffect(() => {
    getStoreDetail(); // 비동기 함수 호출
  }, [getStoreDetail]);
  if (!storeInfo) {
    return (
      <div>
        <h1>{t("AdminStore:Detail.Option.Attribute00")}</h1>
      </div>
    );
  }
  return (
    <div>
      <div>
        <AdminStoreInfo store={storeInfo}></AdminStoreInfo>
      </div>
      <div>
        <AdminStoreProcutListComponent/>
      </div>
    </div>
  );
};

export default AdminStoreDetail;
