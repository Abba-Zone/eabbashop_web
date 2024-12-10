import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminInvoiceAddressInfo, AdminInvoiceBillAddressInfo, AdminInvoiceMemberInfo, AdminInvoiceOrderInfo, AdminInvoiceProductInfo } from '../../components';
import { getInvoiceDetail_s } from '../../services/sale';

const AdminInvoiceDetail: React.FC = () => {
  const [invoiceNo, setInvoiceNo] = useState<string | undefined>(undefined);
  const [billAddress, setBillAddress] = useState<invoiceAddress | undefined>(undefined);
  const [shippingAddress, setShippingAddress] = useState<invoiceAddress | undefined>(undefined);
  const [order, setOrder] = useState<invoiceOrder | undefined>(undefined);
  const [member, setMember] = useState<invoiceMember | undefined>(undefined);
  const [product, setProduct] = useState<invoiceProduct | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getInvoiceDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const invoiceDetail : invoiceDetail = await getInvoiceDetail_s(params.id);
        setInvoiceNo(invoiceDetail.invoiceNo);
        setBillAddress(invoiceDetail.billAddress);
        setShippingAddress(invoiceDetail.shippingAddress);
        setMember(invoiceDetail.member);
        setOrder(invoiceDetail.order);
        setProduct(invoiceDetail.product);
      }
    } catch (error) {
      console.error('Error fetching invoiceDetail:', error);
    }
  }, [params.id]);

  useEffect(() => {
    getInvoiceDetail(); // 비동기 함수 호출
  }, [getInvoiceDetail]);

  if (!member || !billAddress || !order || !product || !shippingAddress) {
    return (
      <div>
        <h1>송장 정보가 없습니다.</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>송장({invoiceNo})</h1>
      <AdminInvoiceAddressInfo address={shippingAddress}></AdminInvoiceAddressInfo>
      <AdminInvoiceBillAddressInfo address={billAddress}></AdminInvoiceBillAddressInfo>
      <AdminInvoiceMemberInfo member={member}></AdminInvoiceMemberInfo>
      <AdminInvoiceOrderInfo order={order}></AdminInvoiceOrderInfo>
      <AdminInvoiceProductInfo product={product}></AdminInvoiceProductInfo>
    </div>
  );
};

export default AdminInvoiceDetail;
