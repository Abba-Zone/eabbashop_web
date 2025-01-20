import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props{
    setFilterFlag(flag:boolean):void,
}
const SearchFilter:React.FC<Props> = ({setFilterFlag}) => {
    const [searchParams, setSearchParams]=useSearchParams();
    const [category, setCategory] = useState<string>(searchParams.get("category") || "");
    const [sellerID, setSellerID] = useState<string>(searchParams.get("sellerID") || "");
    const [minimum, setMinimum] = useState<number>(parseInt(searchParams.get("minimum") || "0"));
    const [maximum, setMaximum] = useState<number>(parseInt(searchParams.get("maximum") || "0"));
    const [pageSize, setPageSize] = useState<number>(parseInt(searchParams.get("pageSize") || "20"));
    const [order, setOrder] = useState<number>(parseInt(searchParams.get("order") || "0"));
    const categories = [{ID:"1234qwea1", name:"이름1"}, {ID:"1234qwea2", name:"이름2"}, {ID:"1234qwea3", name:"이름3"}, {ID:"1234qwea4", name:"이름4"}, {ID:"1234qwea5", name:"이름5"}];
    const reset = () => {
        setCategory("");
        setSellerID("");
        setMinimum(0);
        setMaximum(0);
        setPageSize(36);
        setOrder(0);
    }
    const searchCancel = () => {
        setFilterFlag(false);
    }
    const search = () => {
        const newParams = searchParams;
        if(category !== ""){
            newParams.set("category", category);
        }
        if (sellerID !== "")
            newParams.set("sellerID", sellerID);
        if (!(minimum === 0 && maximum === 0)){
            if(minimum <= maximum){
                newParams.set("minimum", minimum.toString());
                newParams.set("maximum", maximum.toString());
            }
            else{
                newParams.set("minimum", maximum.toString());
                newParams.set("maximum", minimum.toString());
            }
        }
        newParams.set("pageSize", pageSize.toString());
        newParams.set("order", order.toString());
        setSearchParams(newParams);
        setFilterFlag(false);
    }
    const categoriesOption = (): JSX.Element[] => {
        const result = [];
        result.push(<option key={0} value={""} disabled hidden>카테고리 설정</option>)
        for(let i = 0 ; i < categories.length; i++){
          result.push(<option key={i + 1} value={categories[i].ID}>{categories[i].name}</option>);
        }
        return result;
    }
    const changeCategory =(event: React.ChangeEvent<HTMLSelectElement>) =>{
        const targeIdx = event.target.value;
        setCategory(targeIdx);
    }
    const checkKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    }
    const changeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const money = Number(event.target.value);
        setMinimum(money);
        if(maximum < money)
            setMaximum(money);
    }
    const changeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
        const money = Number(event.target.value);
        setMaximum(money);
        if(minimum > money)
            setMinimum(money);
    }
    const pageSizeOption = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < 5; i++){
          result.push(<option key={i} value={20 + i * 10}>{20 + i * 10}</option>);
        }
        return result;
    }
    const changePageSize = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const targeSize = Number(event.target.value);
        setPageSize(targeSize);
    }
    const changeOrder = (type:number) =>{
        if(type != order)
            setOrder(type);
    }
    return (
        <div>
            <div>
                {order === 0 ? <span>최신순</span> : <button onClick={() => changeOrder(0)}>최신순</button>}
                {order === 1 ? <span>낮은가격순</span> : <button onClick={() => changeOrder(1)}>낮은가격순</button>}
                {order === 2 ? <span>높은가격순</span> : <button onClick={() => changeOrder(2)}>높은가격순</button>}
            </div>
            <div>
                <label htmlFor='category'>카테고리 설정 : </label>
                <select name="category" value={category} onChange={changeCategory}>
                {categoriesOption()}
                </select>
            </div>
            <div>
                <label htmlFor='seller'>판매자 설정 : </label>
                <input type='text' value={sellerID} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setSellerID(event.target.value)}}/>
            </div>
            <div>
                <label htmlFor='money'>가격 설정 : </label>
                최소 <input type='number' value={minimum} onKeyDown={checkKey} onChange={changeMin} min={0} step={1}/>$
                <> ~ </>
                최대 <input type='number' value={maximum} onKeyDown={checkKey} onChange={changeMax} min={0} step={1}/>$
            </div>
            <div>
                <label htmlFor='pageSize'>상품 </label>
                <select name="pageSize" value={pageSize} onChange={changePageSize}>
                {pageSizeOption()}
                </select>
                <>개 씩 보기</>
            </div>
            <button onClick={() => reset()}>필터 초기화</button>
            <button onClick={()=>{searchCancel()}}>검색 취소</button>
            <button onClick={()=>{search()}}>검색</button>
        </div>
    );
}
    
export default SearchFilter;
