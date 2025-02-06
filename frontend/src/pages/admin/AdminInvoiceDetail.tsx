import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminInvoiceAddressInfo, AdminInvoiceBillAddressInfo, AdminInvoiceMemberInfo, AdminInvoiceOrderInfo, AdminInvoiceProductInfo } from '../../components';
import { getInvoiceDetail_s } from '../../services/sale';
import { useTranslation } from 'react-i18next';

const AdminInvoiceDetail: React.FC = () => {
  const { t } = useTranslation();
  const [invoiceNo, setInvoiceNo] = useState<string | undefined>(undefined);
  const [invoiceCreatedDateTime, setInvoiceCreatedDateTime] = useState<string | undefined>(undefined);
  const [billAddress, setBillAddress] = useState<invoiceAddress | undefined>(undefined);
  const [shippingAddress, setShippingAddress] = useState<invoiceAddress | undefined>(undefined);
  // const [order, setOrder] = useState<invoiceOrder | undefined>(undefined);
  const [member, setMember] = useState<invoiceMember | undefined>(undefined);
  const [products, setProducts] = useState<invoiceProduct[] | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getInvoiceDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const invoiceDetail : invoiceDetail = await getInvoiceDetail_s(params.id);
        setInvoiceNo(invoiceDetail.invoiceNo);
        setInvoiceCreatedDateTime(invoiceDetail.createdDateTime);
        setBillAddress(invoiceDetail.billAddress);
        setShippingAddress(invoiceDetail.shippingAddress);
        setMember(invoiceDetail.member);
        // setOrder(invoiceDetail.order);
        setProducts(invoiceDetail.products);
      }
    } catch (error) {
      console.error('Error fetching invoiceDetail:', error);
    }
  }, [params.id]);

  useEffect(() => {
    getInvoiceDetail(); // 비동기 함수 호출
  }, [getInvoiceDetail]);

  if (!member || !billAddress || !products || !shippingAddress) {
    return (
      <div>
        <h1>{t("AdminInvoice:Detail.Option.Attribute00")}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{t("AdminInvoice:Detail.Title")}({invoiceNo})</h1>
      {invoiceCreatedDateTime}
      <AdminInvoiceProductInfo products={products}></AdminInvoiceProductInfo>
      {/* <AdminInvoiceOrderInfo order={order}></AdminInvoiceOrderInfo> */}
      <AdminInvoiceAddressInfo address={shippingAddress}></AdminInvoiceAddressInfo>
      <AdminInvoiceBillAddressInfo address={billAddress}></AdminInvoiceBillAddressInfo>
      <AdminInvoiceMemberInfo member={member}></AdminInvoiceMemberInfo>
    </div>
  );
};

export default AdminInvoiceDetail;
