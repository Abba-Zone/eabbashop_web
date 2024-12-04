import "./style.css";
interface OwnProps{
    lastPage:number,
    nowPage:number,
    changePage(move:string):void
}

const BottomButton:React.FC<OwnProps> = (props) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        const firstNum = props.nowPage - (props.nowPage - 1) % 5
        for(let i = 0 ; i < 5 && firstNum + i <= props.lastPage ; i++){
            result.push(<div className={props.nowPage===firstNum + i?"select-page-number-button":"none-select-page-number-button"} key={i} onClick={() => {props.changePage((firstNum + i).toString())}}>{firstNum + i}</div>);
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
      <div className="bottom-button-set">
          <div className={props.nowPage === 1?"page-move-button-first-page":"page-move-button-any-page"} onClick={clickFirst}>gotoFirst </div>
          <div className={props.nowPage === 1?"page-move-button-first-page":"page-move-button-any-page"} onClick={clickPre}>gotoPre</div>
          {rendering()}
          <div className={props.nowPage === props.lastPage?"page-move-button-last-page":"page-move-button-any-page"} onClick={clickNext}>gotoNext</div>
          <div className={props.nowPage === props.lastPage?"page-move-button-last-page":"page-move-button-any-page"} onClick={clickLast}>gotoLast</div>
      </div>
    );
  }
  
  export default BottomButton;
  