import ListCard from './MyWishlistCard';
interface Props{
    wishlists:wishlist[],
    setWhishList(newWishList:wishlist[]):void
}

const MyWishlist:React.FC<Props> = ({wishlists, setWhishList}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < wishlists.length; i++){
        result.push(<ListCard key={i} wishlist={wishlists[i]} dropItmeToList={dropItmeToList}></ListCard>);
      }
      return result;
  }
  const dropItmeToList = (removeID:string) => {
    setWhishList(wishlists.filter((item) => item.wishlistID !== removeID))
  }
  return (
    <div>
      {rendering()}
    </div>
  );
}
  
export default MyWishlist;