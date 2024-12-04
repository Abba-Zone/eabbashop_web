import { useState } from "react";
import "./style.css";

interface Props{
  selectList:{
    select:string,
    selectName:string,
    selectType:string,
    itemList:string[],
  }[],
  searchClick(key:number, value:string):void
}

const SearchSet:React.FC<Props> = ({selectList, searchClick}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [searchItemName, setSearchItemName] = useState<string>('속성');
  const [searchNumber, setSearchNumber] = useState<number>(-1);
  const [searchWord, setSearchWord] = useState<string>('');
  const pushSearchButtin = () =>{
    setVisible(!visible);
  }
  const pushItemButtin = () =>{
    setVisible2(!visible2);
  }
  const Search = (idx:number) =>{
    setSearchItemName(selectList[idx].selectName);
    setSearchNumber(idx);
    setSearchWord('');
    setVisible2(false);
    setVisible(!visible);
  }
  const Search2 = (word:string) =>{
    setSearchWord(word);
    setVisible2(false);
  }
  const rendering = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < selectList.length ; i++)
      result.push(<div key={i} onClick={() => {Search(i)}}> {selectList[i].selectName} </div>);
    return result; 
  }
  const rendering2 = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < selectList[searchNumber].itemList.length ; i++)
      result.push(<div key={i} onClick={() => {Search2(selectList[searchNumber].itemList[i])}}> {selectList[searchNumber].itemList[i]} </div>);
    return result; 
  }

  const changeWord = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }

  const searchingTool = (): JSX.Element => {
    if(searchNumber === -1 || selectList[searchNumber].selectType ==='text'){
      return(<input onChange={changeWord} type="text" value={searchWord}></input>);
    } else if(selectList[searchNumber].selectType ==='select'){
      return(<div onClick={pushItemButtin}>{searchWord===''?'속성 값':searchWord}</div>);
    }
    else{
      return(<input onChange={changeWord} type="date" value={searchWord}></input>);
    }
  }
  return (
    <div className="search-set">
        <div className="search-set-category" onClick={pushSearchButtin}>{searchItemName}</div>
        {visible?rendering():<></>}
        {searchingTool()}
        {visible2?rendering2():<></>}
        <div onClick={()=>{searchClick(searchNumber, searchWord)}}>검색</div>
    </div>
  );
}

export default SearchSet;
  