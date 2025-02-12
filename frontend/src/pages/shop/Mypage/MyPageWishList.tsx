import { useCallback, useEffect, useState } from "react";
import { getWishList_s } from "../../../services/wishlist";

const MyPageWishList:React.FC = () => {
    const [Products, setProducts] = useState<shopProduct[]>([]);
    const getWishList = useCallback( async () => {
        try {
            const totalAndWishlist : shopProductList = await getWishList_s();
            console.log(totalAndWishlist)
            setProducts(totalAndWishlist.list);
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    },[]);
    useEffect(() => {
        getWishList(); // 비동기 함수 호출
    }, [getWishList]);
    return (
      <div>
        <h1>찜목록</h1>
      </div>
    );
  }
  
  export default MyPageWishList;
  