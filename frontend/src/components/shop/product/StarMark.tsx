interface Props{
    scores:number;
}

const StarMark:React.FC<Props> = ({scores}) => {
    const makeStar = ():JSX.Element[] => {
        const result : JSX.Element[] =[];
        for(let i = 0 ; i < 5;i++){
            if(scores >= 1)
                result.push(<span key={i} style={{color:'orange'}}>★</span>)
            else
                result.push(<span key={i} style={{color:'gray'}}>★</span>)
            scores--;
        }
        return result;
    }
    return (
        <div >
            {makeStar()}
        </div>
    );
}
export default StarMark;
