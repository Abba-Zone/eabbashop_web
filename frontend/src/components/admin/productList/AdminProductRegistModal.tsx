import { useState } from "react";
import Editor from "../editor/Editor";
import { registProduct_s } from "../../../services/product";
import { registImageFiles_s, registThumbnail_s, registVideoFiles_s } from "../../../services/file";
import ViewEditor from "../editor/ViewEditor";

interface Props{
  setModalOpen(type:boolean):void;
}

const AdminProductRegistModal:React.FC<Props> = ({setModalOpen}) => {
  const [preview, setPreview] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<IFile | null>(null);
  const [taxFreePrice, setTaxFreePrice] = useState<number>(0);
  const [SPPrice, setSPPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [summary, setSummary] = useState<string>("");
  const [paybackRate, setPaybackRate] = useState<number>(0);
  const [allowNation, setAllowNation] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ID:string, name:string}[]>([]);
  const [viewSite, setViewSite] = useState<string>("A");
  const [showYN, setShowYN] = useState<string>("Y");
  const [activeYN, setActiveYN] = useState<string>("Y");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<IFile[]>([]);
  const [videos, setVideos] = useState<IFile[]>([]);
  const nation = ["KOR", "CHN", "JPN", "USA", "HKG"];
  const category = [{ID:"1234qwea1", name:"이름1"}, {ID:"1234qwea2", name:"이름2"}, {ID:"1234qwea3", name:"이름3"}, {ID:"1234qwea4", name:"이름4"}, {ID:"1234qwea5", name:"이름5"}];
  
  const registProduct = async () =>{
    const registCategories: string[] = categories.map(item => item.ID);
    if(thumbnail === null)
      return;
    const thumnailUrl = await registThumbnail_s(thumbnail);
    const imageUrls = await registImageFiles_s(description, images);
    const videoUrls = await registVideoFiles_s(description, videos);
    changeUrls(imageUrls, videoUrls);
    const productInfo : registProduct = {
      name : name, 
      thumbnail: thumnailUrl,
      taxFreePrice: taxFreePrice,
      SPPrice: SPPrice,
      stock: stock,
      summary : summary,
      description : description,
      paybackRatio : paybackRate,
      allowNation : allowNation,
      categories : registCategories	,
      viewSite : viewSite	,
      showYN : showYN,
      activeYN : activeYN
    };
    await registProduct_s(productInfo);
    setModalOpen(false);
  }
  const changeUrls = (imageUrls:{preUrl:string[], lastUrl:string[]}, videoUrls:{preUrl:string[], lastUrl:string[]}) =>{
    for(let i = 0 ; i < imageUrls.preUrl.length; i++){
      setDescription(description.replace(imageUrls.preUrl[i], imageUrls.lastUrl[i]));
    }
    for(let i = 0 ; i < videoUrls.preUrl.length; i++){
      setDescription(description.replace(videoUrls.preUrl[i], videoUrls.lastUrl[i]));
    }
  }
  const changeNation =(event: React.ChangeEvent<HTMLSelectElement>) =>{
    const targeIdx = Number(event.target.value);
    for(let i = 0 ; i < allowNation.length; i++){
      if(allowNation[i] === nation[targeIdx]){
        setAllowNation(allowNation.filter(item=> item !== nation[targeIdx]))
        return
      }
    }
    setAllowNation([...allowNation, nation[targeIdx]]);
  }
  const nationsOption = (): JSX.Element[] => {
    const result = [];
    result.push(<option key={0} value="" disabled hidden>국가 선택</option>)
    for(let i = 0 ; i < nation.length; i++){
      result.push(<option key={i + 1} value={i}>{nation[i]}</option>);
    }
    return result;
  }
  const selectNations = (): JSX.Element[] =>{
    const result = [];
    for(let i = 0 ; i < allowNation.length; i++){
      result.push(<p key={i}>{allowNation[i]}</p>)
    }
    return result;
  }
  const changeCategory =(event: React.ChangeEvent<HTMLSelectElement>) =>{
    const targeIdx = Number(event.target.value);
    for(let i = 0 ; i < categories.length; i++){
      if(categories[i].ID === category[targeIdx].ID){
        setCategories(categories.filter(item=> item.ID !== category[targeIdx].ID))
        return
      }
    }
    setCategories([...categories, category[targeIdx]]);
  }
  const categoriesOption = (): JSX.Element[] => {
    const result = [];
    result.push(<option key={0} value="" disabled hidden>카테고리 선택</option>)
    for(let i = 0 ; i < category.length; i++){
      result.push(<option key={i + 1} value={i}>{category[i].name}</option>);
    }
    return result;
  }
  const selectCategories = (): JSX.Element[] =>{
    const result = [];
    for(let i = 0 ; i < categories.length; i++){
      result.push(<p key={i}>{categories[i].name}</p>)
    }
    return result;
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const id = file.name;
      const previewURL = URL.createObjectURL(file);
      const imageFile = file;
      setThumbnail({name:id, previewURL:previewURL, file:imageFile});
    }
  };
  return (
    <div style={{backgroundColor:"white", overflow : "scroll"}}>
      <h2>상품등록</h2>
      <div>
        <label htmlFor='name'>상품명 : </label>
        <input type='text' value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setName(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor='thumbnail'>썸네일 : </label>
        {thumbnail &&<img src={thumbnail.previewURL} alt="Preview" style={{ width: '100px', height: '100px' }}/>}
        <input type='file' accept="image/*" onChange={handleFileChange}/>
      </div>
      <div>
        <label htmlFor='taxFreePrice'>세금제외가격 : </label>
        <input type='number' value={taxFreePrice} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setTaxFreePrice(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='SPPrice'>SPPrice : </label>
        <input type='number' value={SPPrice} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setSPPrice(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='stock'>재고 : </label>
        <input type='number' value={stock} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setStock(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='summary'>요약설명 : </label>
        <input type='text' value={summary} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setSummary(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor='paybackRate'>페이백 : </label>
        <input type='text' value={paybackRate} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setPaybackRate(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='allowNation'>국가 : </label>
        <select name="allowNation" value="" onChange={changeNation}>
          {nationsOption()}
        </select>
      </div>
      {selectNations()}
      <div>
        <label htmlFor='categories'>카테고리 : </label>
        <select name="categories" value="" onChange={changeCategory}>
          {categoriesOption()}
        </select>
      </div>
      {selectCategories()}
      <div>
        <label htmlFor='viewSite'>웹/모바일 : </label>
        <input type='radio' name='viewSite' value='all' onChange={() => {setViewSite("A")}} checked={viewSite==="A"}/>전체
        <input type='radio' name='viewSite' value='web' onChange={() => {setViewSite("W")}} checked={viewSite==="W"}/>웹
        <input type='radio' name='viewSite' value='mobile' onChange={() => {setViewSite("M")}} checked={viewSite==="M"}/>모바일
      </div>
      <div>
        <label htmlFor='showYN'>보여주기 : </label>
        <input type='radio' name='show' value='Y' onChange={() => {setShowYN("Y")}} checked={showYN==="Y"}/>활성화
        <input type='radio' name='show' value='N' onChange={() => {setShowYN("N")}} checked={showYN==="N"}/>비활성화
      </div>
      <div>
        <label htmlFor='topYN'>활성화 : </label>
        <input type='radio' name='top' value='Y' onChange={() => {setActiveYN("Y")}} checked={activeYN==="Y"}/>활성화
        <input type='radio' name='top' value='N' onChange={() => {setActiveYN("N")}} checked={activeYN==="N"}/>비활성화
      </div>
      {preview? <ViewEditor content={description}/>: <Editor images={images} setImages={setImages} videos={videos} setVideos={setVideos} content={description} setContent={setDescription}></Editor>}
      {!preview && <button onClick={() => setModalOpen(false)}>상품등록취소</button>}
      <button onClick={() => setPreview(!preview)}>{preview? "수정하기":"설명 미리보기"}</button>
      <button onClick={registProduct}>상품등록</button>
    </div>
  );
}
    
export default AdminProductRegistModal;