import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail_s } from '../../services/product';
import { AdminProductInfo, AdminProductReviewListComponent, AdminProductSellerInfo } from '../../components';

const AdminProductDetail: React.FC = () => {
  const [productDetail, setProductDetail] = useState<productDetail | undefined>(undefined);
  const [productSeller, setProductSeller] = useState<productSeller | undefined>(undefined);
  const params = useParams<{id:string}>();
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
        <h1>상품 정보가 없습니다.</h1>
      </div>
    );
  }
  return (
    <div>
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
