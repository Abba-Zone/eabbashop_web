import { useState } from "react";
import Editor from "../editor/Editor";
import ViewEditor from "../editor/ViewEditor";
import { useTranslation } from "react-i18next";
import { deleteFiles_s, modifyThumbnail_s, registImageFiles_s, registVideoFiles_s } from "../../../services/file";
import { modifyProduct_s } from "../../../services/product";

interface Props{
  productDetail:productDetail,
  setModalOpen(type:boolean):void
}

const AdminProductModifyModal:React.FC<Props> = ({productDetail, setModalOpen}) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<boolean>(false);
  const [name, setName] = useState<string>(productDetail.name);
  const [thumbnail, setThumbnail] = useState<string>(productDetail.thumbnail);
  const [modifyThumbnail, setModifyThumbnail] = useState<IFile | null>(null);
  const [taxFreePrice, setTaxFreePrice] = useState<number>(productDetail.taxFreePrice);
  const [SPPrice, setSPPrice] = useState<number>(productDetail.SPPrice);
  const [stock, setStock] = useState<number>(productDetail.stock);
  const [summary, setSummary] = useState<string>(productDetail.summary);
  const [paybackRate, setPaybackRate] = useState<number>(productDetail.paybackRatio);
  const [allowNation, setAllowNation] = useState<string[]>(productDetail.allowNation);
  const [categories, setCategories] = useState<{ID:string, name:string}[]>(productDetail.categories);
  const [viewSite, setViewSite] = useState<string>(productDetail.viewSite);
  const [showYN, setShowYN] = useState<string>(productDetail.showYN);
  const [activeYN, setActiveYN] = useState<string>(productDetail.activeYN);
  const [description, setDescription] = useState<string>(productDetail.description);
  const [images, setImages] = useState<IFile[]>([]);
  const [videos, setVideos] = useState<IFile[]>([]);
  const nation = ["KOR", "CHN", "JPN", "USA", "HKG"];
  const category = [{ID:"1234qwea1", name:"이름1"}, {ID:"1234qwea2", name:"이름2"}, {ID:"1234qwea3", name:"이름3"}, {ID:"1234qwea4", name:"이름4"}, {ID:"1234qwea5", name:"이름5"}];

  const modifyProduct = async () =>{
    const registCategories: string[] = categories.map(item => item.ID);
    if(modifyThumbnail !== null){
       const thumbnailUrl = await modifyThumbnail_s(productDetail.thumbnail, modifyThumbnail);
       setThumbnail(thumbnailUrl);
    }
    await deleteFiles_s(productDetail.description, description);
    const imageUrls = await registImageFiles_s(description, images);
    const videoUrls = await registVideoFiles_s(description, videos);
    changeUrls(imageUrls, videoUrls);
    const productInfo : modifyProduct = {
        productID: productDetail.productID,
        name : name, 
        thumbnail: thumbnail,
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
    await modifyProduct_s(productInfo);
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
    result.push(<option key={0} value="" disabled hidden>{t("AdminProduct:Regist.Option08")}</option>)
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
    result.push(<option key={0} value="" disabled hidden>{t("AdminProduct:Regist.Option09")}</option>)
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
      setThumbnail(previewURL);
      setModifyThumbnail({name:id, previewURL:previewURL, file:imageFile});
    }
  };

  return (
    <div style={{backgroundColor:"white", overflow : "scroll"}}>
      <h2>{t("AdminProduct:Regist.Title")}</h2>
      <div>
        <label htmlFor='name'>{t("AdminProduct:Regist.Filter01")} : </label>
        <input type='text' value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setName(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor='thumbnail'>{t("AdminProduct:Regist.Filter02")} : </label>
        {thumbnail &&<img src={thumbnail} alt="Preview" style={{ width: '100px', height: '100px' }}/>}
        <input type='file' accept="image/*" onChange={handleFileChange}/>
      </div>
      <div>
        <label htmlFor='taxFreePrice'>{t("AdminProduct:Regist.Filter03")} : </label>
        <input type='number' value={taxFreePrice} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setTaxFreePrice(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='SPPrice'>{t("AdminProduct:Regist.Filter04")} : </label>
        <input type='number' value={SPPrice} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setSPPrice(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='stock'>{t("AdminProduct:Regist.Filter05")} : </label>
        <input type='number' value={stock} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setStock(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='summary'>{t("AdminProduct:Regist.Filter06")} : </label>
        <input type='text' value={summary} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setSummary(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor='paybackRate'>{t("AdminProduct:Regist.Filter07")} : </label>
        <input type='text' value={paybackRate} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setPaybackRate(Number(event.target.value))}}/>
      </div>
      <div>
        <label htmlFor='allowNation'>{t("AdminProduct:Regist.Filter08")} : </label>
        <select name="allowNation" value="" onChange={changeNation}>
          {nationsOption()}
        </select>
      </div>
      {selectNations()}
      <div>
        <label htmlFor='categories'>{t("AdminProduct:Regist.Filter09")} : </label>
        <select name="categories" value="" onChange={changeCategory}>
          {categoriesOption()}
        </select>
      </div>
      {selectCategories()}
      <div>
        <label htmlFor='viewSite'>{t("AdminProduct:Regist.Filter10")} : </label>
        <input type='radio' name='viewSite' value='all' onChange={() => {setViewSite("A")}} checked={viewSite==="A"}/>{t("AdminProduct:Regist.Option10.Attribute01")}
        <input type='radio' name='viewSite' value='web' onChange={() => {setViewSite("W")}} checked={viewSite==="W"}/>{t("AdminProduct:Regist.Option10.Attribute02")}
        <input type='radio' name='viewSite' value='mobile' onChange={() => {setViewSite("M")}} checked={viewSite==="M"}/>{t("AdminProduct:Regist.Option10.Attribute03")}
      </div>
      <div>
        <label htmlFor='showYN'>{t("AdminProduct:Regist.Filter11")} : </label>
        <input type='radio' name='show' value='Y' onChange={() => {setShowYN("Y")}} checked={showYN==="Y"}/>{t("AdminProduct:Regist.Option11.Attribute01")}
        <input type='radio' name='show' value='N' onChange={() => {setShowYN("N")}} checked={showYN==="N"}/>{t("AdminProduct:Regist.Option11.Attribute02")}
      </div>
      <div>
        <label htmlFor='topYN'>{t("AdminProduct:Regist.Filter12")} : </label>
        <input type='radio' name='top' value='Y' onChange={() => {setActiveYN("Y")}} checked={activeYN==="Y"}/>{t("AdminProduct:Regist.Option12.Attribute01")}
        <input type='radio' name='top' value='N' onChange={() => {setActiveYN("N")}} checked={activeYN==="N"}/>{t("AdminProduct:Regist.Option12.Attribute02")}
      </div>
      {preview? <ViewEditor content={description}/>: <Editor images={images} setImages={setImages} videos={videos} setVideos={setVideos} content={description} setContent={setDescription}></Editor>}
      {!preview && <button onClick={() => setModalOpen(false)}>{t("AdminProduct:Regist.Button01")}</button>}
      <button onClick={() => setPreview(!preview)}>{preview? t("AdminProduct:Regist.Button02"):t("AdminProduct:Regist.Button03")}</button>
      <button onClick={modifyProduct}>{t("AdminProduct:Regist.Button04")}</button>
    </div>
  );
}
    
export default AdminProductModifyModal;