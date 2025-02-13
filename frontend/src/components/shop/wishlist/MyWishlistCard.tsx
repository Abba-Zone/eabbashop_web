import { useNavigate } from "react-router-dom";
import { deleteToWishlist_s } from "../../../services/wishlist";

interface Props{
  wishlist:wishlist,
  dropItmeToList(wishlistID:string):void,
}
const MyWishlistCard:React.FC<Props> = ({wishlist, dropItmeToList}) => {
    const navigate = useNavigate();
    const removeItem = async () => {
      await deleteToWishlist_s(wishlist.wishlistID, null as unknown as string);
      dropItmeToList(wishlist.wishlistID);
    }
    return (
      <div>
        <div onClick={()=>{navigate(`/productdetail/${wishlist.productID}`)}}>
          <img src={wishlist.thumbnail} style={{width:'200px', height:'200px'}} alt="상품이미지" />
          <div>{wishlist.name} </div>
          <div>US${wishlist.realPrice}</div>
          <div>{wishlist.LP}LP</div>
          <div>{wishlist.SP}SP</div>
          <div>{wishlist.AK}AK</div>
        </div>
        <button onClick={removeItem}>제거</button>
      </div>
    );
}
    
export default MyWishlistCard;
