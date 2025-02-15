import { useState } from "react";
import Editor from "../../admin/editor/Editor";
import { registImageFiles_s, registVideoFiles_s } from "../../../services/file";
import { registProductReview_s } from "../../../services/product";
import ScoreViwer from "./ScoreViwer";

interface Props{
    orderDetail:shopOrderDetail
    clickModal():void,
}
const RegistReviewModal:React.FC<Props> = ({orderDetail, clickModal}) => {
    const [images, setImages] = useState<IFile[]>([]);
    const [videos, setVideos] = useState<IFile[]>([]);
    const [content, setContent] = useState<string>("");
    const [score, setScore] = useState<number>(5);
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
    const registReview = async () =>{
        const imageUrls = await registImageFiles_s(content, images);
        const videoUrls = await registVideoFiles_s(content, videos);
        const newDescription = changeUrls(imageUrls, videoUrls);
        const reviewInfo :registReview = {
            orderDetailID: orderDetail.orderDetailID,
            review: newDescription,
            score: score
        }
        await registProductReview_s(reviewInfo);
        clickModal();
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
    const clickScore = (newScore:number) => {
        if(score === newScore){
            setScore(0);
        }else{
            setScore(newScore);
        }
    }
    const registCancel = () => {
        setImages([]);
        setVideos([]);
        setContent("");
        setScore(5);
        clickModal();
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
        <button onClick={registCancel}>취소</button>
        <button onClick={registReview}>작성</button>
      </div>
    );
}
  
export default RegistReviewModal;