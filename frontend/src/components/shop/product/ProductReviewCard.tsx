import StarMark from "./StarMark";
import ReviewViewer from "./ReviewViewer";
import { useState } from "react";
import { reviewLikes_s } from "../../../services/product";

interface Props{
  review:review;
}
const ProductReviewCard:React.FC<Props> = ({review}) => {
  const [like, setLike] = useState<number>(review.like);
  const [dislike, setDislike] = useState<number>(review.dislike);
  const upLike = async () =>{
    const result = await reviewLikes_s(review.productReviewID, 1);
    setLike(result.like);
    setDislike(result.dislike);
  }
  const upDislike = async () =>{
    const result = await reviewLikes_s(review.productReviewID, 2);
    setLike(result.like);
    setDislike(result.dislike);
  }
  return (
    <div>
      <div>{review.name}</div>
      <div><StarMark scores={review.score}></StarMark><span>{review.createdDateTime}</span></div>
      <div onClick={upLike}>좋아요{like}</div>
      <div onClick={upDislike}>싫어요{dislike}</div>
      <ReviewViewer content={review.review}></ReviewViewer>
    </div>
  );
}
    
export default ProductReviewCard;
    