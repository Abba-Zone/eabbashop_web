import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail_s } from '../../services/product';
import { AdminProductInfo, AdminProductModifyModal, AdminProductReviewListComponent, AdminProductSellerInfo } from '../../components';
import { useTranslation } from 'react-i18next';

const AdminProductDetail: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<productDetail | undefined>(undefined);
  const [productSeller, setProductSeller] = useState<productSeller | undefined>(undefined);
  const params = useParams<{id:string}>();
  const modalRef = useRef<HTMLDivElement>(null); // modal에 대한 ref 추가
  const getProductDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const productDetailAndReviewList : productDetailAndSeller = await getProductDetail_s(params.id);
        setProductDetail(productDetailAndReviewList.product);
        setProductSeller(productDetailAndReviewList.seller);
      }
    } catch (error) {
      console.error('Error fetching productDetail:', error);
    }
  }, [params.id]);
  useEffect(() => {
    getProductDetail(); // 비동기 함수 호출
  }, [getProductDetail]);
  if (!productDetail || !productSeller) {
    return (
      <div>
        <h1>{t("AdminProduct:Detail.Option.Attribute00")}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{productDetail.name} <button onClick={() => setModalOpen(true)}>수정</button></h1>
      {
        modalOpen && 
        <div 
          ref={modalRef}
          style={{
          "width": "100%",
          "height": "100%",
          "position": "fixed",
          "top": "0",
          "left": "0",
          "display": "flex",
          "background": "rgba(0, 0, 0, 0.5)"
        }}><AdminProductModifyModal productDetail={productDetail} setModalOpen={setModalOpen}/></div>
      }
      <div>
        <AdminProductInfo productInfo={productDetail}/>
        <AdminProductSellerInfo productSellerInfo={productSeller}/>
      </div>
      <div>
        <AdminProductReviewListComponent/>
      </div>
    </div>
  );
};

export default AdminProductDetail;
