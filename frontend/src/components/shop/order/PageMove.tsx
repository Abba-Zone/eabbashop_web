interface Props{
    movePage(type:string): void,
  }
  
  const PageMove:React.FC<Props> = ({movePage}) => {
    return (
      <div>
        <button onClick={() => movePage("before")}>이전</button>
        <button onClick={() => movePage("after")}>다음</button>
      </div>
    );
  }
    
  export default PageMove;