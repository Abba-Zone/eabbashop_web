import { deleteReview_s } from "../../../services/product";
import ReviewViewer from "./ReviewViewer";

interface Props{
    review:review,
    selectID:string,
    setSelectID(ID:string):void,
    deleteItem(itemID:string):void
}
const MyReviewListCard:React.FC<Props> = ({review, selectID, setSelectID, deleteItem}) => {
    const deleteReview = async () => {
        await deleteReview_s(review.productReviewID);
        deleteItem(review.productReviewID);
    }
    return (
        <div>
            <div onClick={() => setSelectID(selectID === review.productReviewID? "":review.productReviewID)}>
                <h2>{review.productName}</h2>
                <div>좋아요{review.like}</div>
                <div>싫어요{review.dislike}</div>
            </div>
            <button onClick={deleteReview}>리뷰 삭제</button>
            {selectID === review.productReviewID ? <ReviewViewer content={review.review}/> : null}
        </div>
    );
}
    
export default MyReviewListCard;
