import { useEffect, useState } from "react";
import Editor from "../editor/Editor";
import { registBoard_s } from "../../../services/board";
import { registImageFiles_s, registVideoFiles_s } from "../../../services/file";
import ViewEditor from "../editor/ViewEditor";
import { useTranslation } from "react-i18next";

interface Props{
  type : number,
  setModalOpen(type:boolean):void;
}
const AdminBoardRegistModal:React.FC<Props> = ({type, setModalOpen}) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [show, setShow] = useState<string>("Y");
  const [top, setTop] = useState<string>("N");
  const [images, setImages] = useState<IFile[]>([]);
  const [videos, setVideos] = useState<IFile[]>([]);
  const registBoard = async () =>{
    const imageUrls = await registImageFiles_s(content, images);
    const videoUrls = await registVideoFiles_s(content, videos);
    const newContent = changeUrls(imageUrls, videoUrls);
    const boardInfo:registBoard = {
      title : title,
      content : newContent,
      show : show,
      top : top,
      type : type
    }
    await registBoard_s(boardInfo);
    setModalOpen(false);
  }
  const getTitle = (type:number):string =>{
    if(type === 100)
      return "공지사항";
    else if(type === 200)
      return "아빠의 편지";
    else if(type === 300)
      return "기부사항";
    return "";
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
  const changeUrls = (imageUrls:{preUrl:string[], lastUrl:string[]}, videoUrls:{preUrl:string[], lastUrl:string[]}):string =>{
    let updatedContent = content;
    for (let i = 0; i < imageUrls.preUrl.length; i++) {
      updatedContent = updatedContent.replace(imageUrls.preUrl[i], imageUrls.lastUrl[i]);
    }
    for (let i = 0; i < videoUrls.preUrl.length; i++) {
      updatedContent = updatedContent.replace(videoUrls.preUrl[i], videoUrls.lastUrl[i]);
    }
    return updatedContent;
  }
  return (
    <div style={{backgroundColor:"white", overflow : "scroll"}}>
      <h2>{getTitle(type)}</h2>
      <div>
        <label htmlFor='Title'>{t("AdminBoard:Regist.Filter01")} : </label>
        <input type='text' name='input_last' value={title} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setTitle(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor='showYN'>{t("AdminBoard:Regist.Filter02")} : </label>
        <input type='radio' name='show' value='Y' onChange={() => {setShow("Y")}} checked={show==="Y"}/>{t("AdminBoard:Regist.Option02.Attribute01")}
        <input type='radio' name='show' value='N' onChange={() => {setShow("N")}} checked={show==="N"}/>{t("AdminBoard:Regist.Option02.Attribute02")}
      </div>
      <div>
        <label htmlFor='topYN'>{t("AdminBoard:Regist.Filter03")} : </label>
        <input type='radio' name='top' value='Y' onChange={() => {setTop("Y")}} checked={top==="Y"}/>{t("AdminBoard:Regist.Option03.Attribute01")}
        <input type='radio' name='top' value='N' onChange={() => {setTop("N")}} checked={top==="N"}/>{t("AdminBoard:Regist.Option03.Attribute02")}
      </div>
      {preview? <ViewEditor content={content}/>: <Editor inputImageFile={inputImageFile} inputVideoFile={inputVideoFile} content={content} setContent={setContent}></Editor>}
      {!preview && <button onClick={() => setModalOpen(false)}>{t("AdminBoard:Regist.Button01")}</button>}
      <button onClick={() => setPreview(!preview)}>{preview? t("AdminBoard:Regist.Button02"):t("AdminBoard:Regist.Button03")}</button>
      <button onClick={registBoard}>{t("AdminBoard:Regist.Button04")}</button>
    </div>
  );
}
    
export default AdminBoardRegistModal;