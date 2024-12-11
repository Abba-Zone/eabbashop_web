import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminShipmentAddressInfo, AdminShipmentBillAddressInfo, AdminShipmentInfo, AdminShipmentMemberInfo, AdminShipmentOrderInfo } from '../../components';
import { getShipmentDetail_s } from '../../services/sale';
import { useTranslation } from 'react-i18next';

const AdminShipmentDetail: React.FC = () => {
  const { t } = useTranslation();
  const [shipmentInfo, setShipmentInfo] = useState<shipmentInfo | undefined>(undefined);
  const [billAddress, setBillAddress] = useState<shipmentAddress | undefined>(undefined);
  const [shippingAddress, setShippingAddress] = useState<shipmentAddress | undefined>(undefined);
  const [order, setOrder] = useState<shipmentOrder | undefined>(undefined);
  const [member, setMember] = useState<shipmentMember | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getShipmentDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const shipmentDetail : shipmentDetail = await getShipmentDetail_s(params.id);
        setShipmentInfo(shipmentDetail.info);
        setBillAddress(shipmentDetail.billAddress);
        setShippingAddress(shipmentDetail.shippingAddress);
        setMember(shipmentDetail.member);
        setOrder(shipmentDetail.order);
      }
    } catch (error) {
      console.error('Error fetching shipmentDetail:', error);
    }
  }, [params.id]);

  useEffect(() => {
    getShipmentDetail(); // 비동기 함수 호출
  }, [getShipmentDetail]);

  if (!member || !billAddress || !order || !shipmentInfo || !shippingAddress) {
    return (
      <div>
        <h1>{t("AdminShipment:Detail.Option.Attribute00")}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{t("AdminShipment:Detail.Title")}</h1>
      <AdminShipmentInfo info={shipmentInfo}></AdminShipmentInfo>
      <AdminShipmentOrderInfo order={order}></AdminShipmentOrderInfo>
      <AdminShipmentAddressInfo address={shippingAddress}></AdminShipmentAddressInfo>
      <AdminShipmentBillAddressInfo address={billAddress}></AdminShipmentBillAddressInfo>
      <AdminShipmentMemberInfo member={member}></AdminShipmentMemberInfo>
    </div>
  );
};

export default AdminShipmentDetail;
