import "./style.css";
interface OwnProps{
    lastPage:number,
    nowPage:number,
    changePage(move:number):void
}

const BottomButton:React.FC<OwnProps> = ({lastPage,nowPage,changePage}) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        const firstNum = nowPage - (nowPage - 1) % 5
        for(let i = 0 ; i < 5 && firstNum + i <= lastPage ; i++){
            result.push(<div className={nowPage===firstNum + i?"select-page-number-button":"none-select-page-number-button"} key={i} onClick={() => {changePage(firstNum + i)}}>{firstNum + i}</div>);
        }
        return result;
    }
    const clickFirst =()=>{
        if (nowPage===1)
            return; 
        changePage(1);
    }
    const clickPre =()=>{
        if (nowPage===1)
            return; 
        changePage(nowPage - 1);
    }
    const clickNext =()=>{
        if (nowPage===lastPage)
            return;
        changePage(nowPage + 1)
    }
    const clickLast =()=>{
        if (nowPage===lastPage)
            return;
        changePage(lastPage)
    }
    return (
      <div className="bottom-button-set">
          <div className={nowPage === 1?"page-move-button-first-page":"page-move-button-any-page"} onClick={clickFirst}>gotoFirst </div>
          <div className={nowPage === 1?"page-move-button-first-page":"page-move-button-any-page"} onClick={clickPre}>gotoPre</div>
          {rendering()}
          <div className={nowPage === lastPage?"page-move-button-last-page":"page-move-button-any-page"} onClick={clickNext}>gotoNext</div>
          <div className={nowPage === lastPage?"page-move-button-last-page":"page-move-button-any-page"} onClick={clickLast}>gotoLast</div>
      </div>
    );
  }
  
  export default BottomButton;
  