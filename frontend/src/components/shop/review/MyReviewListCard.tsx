import { useRef, useState } from "react";
import { deleteReview_s } from "../../../services/product";
import ReviewViewer from "./ReviewViewer";
import ReviewModifyModal from "./ReviewModifyModal";

interface Props{
    reviewList:review[],
    review:review,
    selectID:string,
    setSelectID(ID:string):void,
    deleteItem(itemID:string):void
    setReviewList(modifyList:review[]):void,
}
const MyReviewListCard:React.FC<Props> = ({reviewList, review, selectID, setSelectID, deleteItem, setReviewList}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const deleteReview = async () => {
        await deleteReview_s(review.productReviewID);
        deleteItem(review.productReviewID);
    }
    return (
        <div>
            {
                modalOpen && 
                <div 
                style={{
                "width": "100%",
                "height": "100%",
                "position": "fixed",
                "top": "0",
                "left": "0",
                "display": "flex",
                "background": "rgba(0, 0, 0, 0.5)"
                }}><ReviewModifyModal reviewList= {reviewList} review={review} setModalOpen={setModalOpen} setReviewList={setReviewList}/></div>
            }
            <div onClick={() => setSelectID(selectID === review.productReviewID? "":review.productReviewID)}>
                <h2>{review.productName}</h2>
                <div>좋아요{review.like}</div>
                <div>싫어요{review.dislike}</div>
            </div>
            <button onClick={deleteReview}>리뷰 삭제</button>
            <button onClick={() => setModalOpen(true)}>리뷰 수정</button>
            {selectID === review.productReviewID ? <ReviewViewer content={review.review}/> : null}
        </div>
    );
}
    
export default MyReviewListCard;
