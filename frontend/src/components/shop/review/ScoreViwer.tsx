interface Props{
    scores:number,
    clickScore(newScore:number):void,
}

const ScoreViwer:React.FC<Props> = ({scores, clickScore}) => {
    const makeStar = ():JSX.Element[] => {
        const result : JSX.Element[] =[];
        for(let i = 0 ; i < 5;i++){
            if(scores >= 1)
                result.push(<span key={i} style={{color:'orange'}} onClick={() => clickScore(i + 1)}>★</span>)
            else
                result.push(<span key={i} style={{color:'gray'}} onClick={() => clickScore(i + 1)}>★</span>)
            scores--;
        }
        return result;
    }
    return (
        <div >
            <span>
                별점:
            </span>
            {makeStar()}
            <span>
                ({scores + 5})
            </span>
        </div>
    );
}
export default ScoreViwer;
