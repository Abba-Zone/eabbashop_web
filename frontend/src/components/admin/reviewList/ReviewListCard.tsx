import { useNavigate } from "react-router-dom";

interface Props{
  review:review;
  }
  const ReviewListCard:React.FC<Props> = ({review}) => {
    const navigate = useNavigate();
    return (
      <tr onClick={()=>{navigate(`/admin/reviewdetail/${review.productReviewID}`)}}>
        <td>선택</td>
        <td>{review.name}</td>
        <td>{review.score}</td>
        <td>{review.like}</td>
        <td>{review.dislike}</td>
        <td>{review.createdDateTime}</td>
      </tr>
    );
}
    
export default ReviewListCard;
    