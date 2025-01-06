import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail_s } from "../../services/product";
import { ProductDescription, ProductInfo, ProductReviews, ProductSaleButtons, SellerInfo } from "../../components";

const Product:React.FC = () => {
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
  if(!productDetail || !productSeller){
    return(
      <div></div>
    )
  }
  return (
    <div>
      <ProductInfo productInfo={productDetail}/>
      <ProductSaleButtons productId={productDetail.productID}/>
      <ProductDescription content={productDetail.description}/>
      <ProductReviews/>
      <SellerInfo productSellerInfo={productSeller}/>
    </div>
  );
}

export default Product;
