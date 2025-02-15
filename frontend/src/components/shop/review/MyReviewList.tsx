import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ListCard from './MyReviewListCard';

interface Props{
    reviewList:review[],
    deleteItem(itemID:string):void,
    setReviewList(modifyList:review[]):void,
}

const MyReviewList:React.FC<Props> = ({reviewList, deleteItem, setReviewList}) => {
    const [selectID, setSelectID] = useState<string>(null as unknown as string);
    const params = useParams<{type:string}>();
    const makeBoardList = useMemo(():JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < reviewList.length; i++){
          result.push(<ListCard key={i} review={reviewList[i]} selectID={selectID} setSelectID={setSelectID} deleteItem={deleteItem} setReviewList={setReviewList} reviewList={reviewList}></ListCard>);
        }
        return result;
    }, [reviewList, selectID]);
    useEffect(() => {
        setSelectID(null as unknown as string);
    }, [params.type]);
    return (
        <div>
            {makeBoardList}
        </div>
    );
}
    
export default MyReviewList;
