import BoardViewer from "./BoardViewer";

interface Props{
  board:shopBoard,
  selectID:string,
  setSelectID(ID:string):void
}
const BoardListCard:React.FC<Props> = ({board, selectID, setSelectID}) => {
    return (
    <div>
        <div onClick={() => setSelectID(selectID === board.boardID? "":board.boardID)}>
            <h2>{board.title}</h2>
            <div>{board.createDateTime}</div>
        </div>
        {selectID === board.boardID ? <BoardViewer content={board.contents}/> : null}
    </div>
    );
}
    
export default BoardListCard;
