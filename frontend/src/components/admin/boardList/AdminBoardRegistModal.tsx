import { useState } from "react";
import Editor from "../editor/Editor";
import { registBoard_s } from "../../../services/board";
import { registImageFiles_s, registVideoFiles_s } from "../../../services/file";

interface Props{
  type : string,
  setModalOpen(type:boolean):void;
}
const AdminBoardRegistModal:React.FC<Props> = ({type, setModalOpen}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [show, setShow] = useState<string>("Y");
  const [top, setTop] = useState<string>("N");
  const [images, setImages] = useState<IFile[]>([]);
  const [videos, setVideos] = useState<IFile[]>([]);
  const registBoard = async () =>{
    const imageUrls = await registImageFiles_s(content, images);
    const videoUrls = await registVideoFiles_s(content, videos);
    changeUrls(imageUrls, videoUrls);
    const boardInfo:registBoard = {
      title : title,
      content : content,
      show : show,
      top : top,
      type : type
    }
    console.log(content);
    await registBoard_s(boardInfo);
    setModalOpen(false);
  }
  const changeUrls = (imageUrls:{preUrl:string[], lastUrl:string[]}, videoUrls:{preUrl:string[], lastUrl:string[]}) =>{
    for(let i = 0 ; i < imageUrls.preUrl.length; i++){
      setContent(content.replace(imageUrls.preUrl[i], imageUrls.lastUrl[i]));
    }
    for(let i = 0 ; i < videoUrls.preUrl.length; i++){
      setContent(content.replace(videoUrls.preUrl[i], videoUrls.lastUrl[i]));
    }
  }
  return (
    <div style={{backgroundColor:"white", overflow : "scroll"}}>
      <h2>{type}</h2>
      <div>
        <label htmlFor='Title'>제목 : </label>
        <input type='text' name='input_last' value={title} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setTitle(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor='showYN'>보여주기 : </label>
        <input type='radio' name='show' value='Y' onChange={() => {setShow("Y")}} checked={show==="Y"}/>활성화
        <input type='radio' name='show' value='N' onChange={() => {setShow("N")}} checked={show==="N"}/>비활성화
      </div>
      <div>
        <label htmlFor='topYN'>상단고정 : </label>
        <input type='radio' name='top' value='Y' onChange={() => {setTop("Y")}} checked={top==="Y"}/>활성화
        <input type='radio' name='top' value='N' onChange={() => {setTop("N")}} checked={top==="N"}/>비활성화
      </div>
      <Editor images={images} setImages={setImages} videos={videos} setVideos={setVideos} content={content} setContent={setContent}></Editor>
      <button onClick={() => setModalOpen(false)}>작성취소</button>
      <button onClick={registBoard}>글쓰기</button>
    </div>
  );
}
    
export default AdminBoardRegistModal;