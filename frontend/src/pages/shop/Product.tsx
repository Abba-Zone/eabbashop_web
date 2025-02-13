import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail_s } from "../../services/product";
import { ProductDescription, ProductInfo, ProductReviews, ProductSaleButtons, SellerInfo } from "../../components";

const Product:React.FC = () => {
  const [productDetail, setProductDetail] = useState<productDetail | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getProductDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const productDetailAndReviewList : productDetail = await getProductDetail_s(params.id);
        setProductDetail(productDetailAndReviewList);
      }
    } catch (error) {
      console.error('Error fetching productDetail:', error);
    }
  }, [params.id]);
  const changeWishList = () => {
    if(productDetail)
      setProductDetail({...productDetail, isWishList:!productDetail.isWishList})
  }
  useEffect(() => {
    getProductDetail(); // 비동기 함수 호출
  }, [getProductDetail]);
  if(!productDetail){
    return(
      <div></div>
    )
  }
  return (
    <div>
      <ProductInfo productInfo={productDetail} changeWishList={changeWishList}/>
      <ProductSaleButtons/>
      <ProductDescription content={productDetail.description}/>
      <ProductReviews/>
      <SellerInfo SellerID={productDetail.sellerId}/>
    </div>
  );
}

export default Product;
