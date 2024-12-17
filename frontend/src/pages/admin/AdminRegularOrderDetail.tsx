import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminRegularOrderAddressInfo, AdminRegularOrderInfo, AdminRegularOrderMemberInfo } from '../../components';
import { getRegularOrderDetail_s } from '../../services/sale';

const AdminRegularOrderDetail: React.FC = () => {
  const [address, setAddress] = useState<regularOrderAddress | undefined>(undefined);
  const [regularOrder, setRegularOrder] = useState<regularOrderInfo | undefined>(undefined);
  const [member, setMember] = useState<regularOrderMember | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getRegularOrderDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const regularOrderDetail : regularOrderDetail = await getRegularOrderDetail_s(params.id);
        setAddress(regularOrderDetail.address);
        setRegularOrder(regularOrderDetail.info);
        setMember(regularOrderDetail.member);
      }
    } catch (error) {
      console.error('Error fetching orederDetail:', error);
    }
  }, [params.id]);

  useEffect(() => {
    getRegularOrderDetail(); // 비동기 함수 호출
  }, [getRegularOrderDetail]);

  if (!member || !address || !regularOrder) {
    return (
      <div>
        <h1>주문 정보가 없습니다.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{regularOrder.orderID}</h1>
      <AdminRegularOrderInfo order={regularOrder}/>
      <AdminRegularOrderMemberInfo member={member}/>
      <AdminRegularOrderAddressInfo adress={address}/>
    </div>
  );
};

export default AdminRegularOrderDetail;
