import { useEffect, useMemo, useState } from "react";
import ListCard from "./BoardListCard";
import { useParams } from "react-router-dom";

interface Props{
    boards:shopBoard[],
}

const BoardList:React.FC<Props> = ({boards}) => {
    const [selectID, setSelectID] = useState<string>(null as unknown as string);
    const params = useParams<{type:string}>();
    const makeBoardList = useMemo(():JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < boards.length; i++){
          result.push(<ListCard key={i} board={boards[i]} selectID={selectID} setSelectID={setSelectID}></ListCard>);
        }
        return result;
    }, [boards, selectID]);
    useEffect(() => {
        setSelectID(null as unknown as string);
    }, [params.type]);
    return (
        <div>
            {makeBoardList}
        </div>
    );
}
    
export default BoardList;
