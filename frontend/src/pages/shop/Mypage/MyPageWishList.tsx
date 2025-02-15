import { useCallback, useEffect, useState } from "react";
import { getWishList_s } from "../../../services/wishlist";
import { MyWishlist } from "../../../components";

const MyPageWishList:React.FC = () => {
    const [wishs, setWishs] = useState<wishlist[]>([]);
    const getWishList = useCallback( async () => {
        try {
            const totalAndWishlist : wishlistList = await getWishList_s();
            console.log(totalAndWishlist)
            setWishs(totalAndWishlist.list);
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
        <MyWishlist setWhishList={setWishs} wishlists={wishs}></MyWishlist>
      </div>
    );
  }
  
  export default MyPageWishList;
  