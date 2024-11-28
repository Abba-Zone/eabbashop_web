import { useState } from "react";

interface OwnProps{
    lastPage:number,
    nowPage:number,
    changePage(move:string):void
}
type style = {
    color: string;
}
const BottomButton:React.FC<OwnProps> = (props) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        const firstNum = props.nowPage - (props.nowPage - 1) % 5
        for(let i = 0 ; i < 5 && firstNum + i <= props.lastPage ; i++){
            result.push(<div style={props.nowPage===firstNum + i?{backgroundColor:'gray'} : {}} key={i} onClick={() => {props.changePage((firstNum + i).toString())}}>{firstNum + i}</div>);
        }
        return result;
    }
    const clickFirst =()=>{
        if (props.nowPage===1)
            return; 
        props.changePage('first');
    }
    const clickPre =()=>{
        if (props.nowPage===1)
            return; 
        props.changePage('pre');
    }
    const clickNext =()=>{
        if (props.nowPage===props.lastPage)
            return;
        props.changePage('next')
    }
    const clickLast =()=>{
        if (props.nowPage===props.lastPage)
            return;
        props.changePage('last')
    }
    return (
      <div>
          <div style={props.nowPage === 1?{color:"gray"}:{}} onClick={clickFirst}>gotoFirst </div>
          <div style={props.nowPage === 1?{color:"gray"}:{}} onClick={clickPre}>gotoPre</div>
          {rendering()}
          <div style={props.nowPage === props.lastPage?{color:"gray"}:{}} onClick={clickNext}>gotoNext</div>
          <div style={props.nowPage === props.lastPage?{color:"gray"}:{}} onClick={clickLast}>gotoLast</div>
      </div>
    );
  }
  
  export default BottomButton;
  