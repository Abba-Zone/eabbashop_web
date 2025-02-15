import { useState } from "react";
import ScoreViwer from "./ScoreViwer";
import Editor from "../../admin/editor/Editor";
import { deleteFiles_s, registImageFiles_s, registVideoFiles_s } from "../../../services/file";
import { modifyProductReview_s } from "../../../services/product";

interface Props{
  review:review,
  reviewList:review[],
  setModalOpen(type:boolean):void,
  setReviewList(modifyList:review[]):void,
}

const ReviewModifyModal:React.FC<Props> = ({review, reviewList, setModalOpen, setReviewList}) => {
    const [images, setImages] = useState<IFile[]>([]);
    const [videos, setVideos] = useState<IFile[]>([]);
    const [content, setContent] = useState<string>(review.review);
    const [score, setScore] = useState<number>(review.score);
    const modifyReview = async () =>{
        await deleteFiles_s(review.review, content);
        const imageUrls = await registImageFiles_s(content, images);
        const videoUrls = await registVideoFiles_s(content, videos);
        const newDescription = changeUrls(imageUrls, videoUrls);
        const reviewInfo :modifyReview = {
            productReviewID: review.productReviewID,
            review: newDescription,
            score: score
        }
        await modifyProductReview_s(reviewInfo);
        setReviewList(
            reviewList.map(item =>
                item.productReviewID === review.productReviewID
                    ? {...item, ...reviewInfo } // ✅ 기존 객체를 복사하고 새로운 속성 적용
                    : item
            )
        );
        setModalOpen(false)
    }
    const changeUrls = (imageUrls:{preUrl:string[], lastUrl:string[]}, videoUrls:{preUrl:string[], lastUrl:string[]}):string =>{
        let updatedDescription = content;
        for (let i = 0; i < imageUrls.preUrl.length; i++) {
          updatedDescription = updatedDescription.replace(imageUrls.preUrl[i], imageUrls.lastUrl[i]);
        }
        for (let i = 0; i < videoUrls.preUrl.length; i++) {
          updatedDescription = updatedDescription.replace(videoUrls.preUrl[i], videoUrls.lastUrl[i]);
        }
        return updatedDescription;
      }
    const inputImageFile = (imagefile: IFile[]) => {
        setImages((prevImages) => {
          return [...prevImages, ...imagefile];
        });
      };
      const inputVideoFile = (videofile: IFile[]) => {
        setVideos((prevVideos) => {
          return [...prevVideos, ...videofile];
        });
    };
    const clickScore = (newScore:number) => {
        if(score === newScore){
            setScore(0);
        }else{
            setScore(newScore);
        }
    }
    return (
        <div style={{
            "margin": "20%",
            "width": "50%",
            "height": "50%",
            "background": "white",
            "overflow":  "scroll"
        }}>
        <>상품정보</>
        <ScoreViwer scores={score} clickScore={clickScore}></ScoreViwer> 
        <Editor inputImageFile={inputImageFile} inputVideoFile={inputVideoFile} content={content} setContent={setContent}></Editor>
        <button onClick={() => {setModalOpen(false)}}>취소</button>
        <button onClick={modifyReview}>수정</button>
    </div>
    );
}
    
export default ReviewModifyModal;