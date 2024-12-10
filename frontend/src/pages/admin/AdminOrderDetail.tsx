import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetail_s } from '../../services/sale';
import { AdminOrderAddressInfo, AdminOrderInfo, AdminOrderMemberInfo, AdminOrderProductInfo } from '../../components';

const AdminOrderDetail: React.FC = () => {
  const [address, setAddress] = useState<orderAddress | undefined>(undefined);
  const [order, setOrder] = useState<orderOrder | undefined>(undefined);
  const [member, setMember] = useState<orderMember | undefined>(undefined);
  const [product, setProduct] = useState<orderProduct | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getOrderDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const orderDetail : orderDetail = await getOrderDetail_s(params.id);
        setAddress(orderDetail.address);
        setOrder(orderDetail.order);
        setMember(orderDetail.member);
        setProduct(orderDetail.product);
      }
    } catch (error) {
      console.error('Error fetching orederDetail:', error);
    }
  }, [params.id]);

  useEffect(() => {
    getOrderDetail(); // 비동기 함수 호출
  }, [getOrderDetail]);

  if (!member || !address || !order || !product) {
    return (
      <div>
        <h1>주문 정보가 없습니다.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      <AdminOrderInfo order={order}></AdminOrderInfo>
      <AdminOrderAddressInfo adress={address}></AdminOrderAddressInfo>
      <AdminOrderProductInfo product={product}></AdminOrderProductInfo>
      <AdminOrderMemberInfo member={member}></AdminOrderMemberInfo>
    </div>
  );
};

export default AdminOrderDetail;
