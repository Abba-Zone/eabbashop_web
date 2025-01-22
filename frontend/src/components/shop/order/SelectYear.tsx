interface Props{
    year: number,
    setYear(newYear:number):void,
  }
  
const SelectYear:React.FC<Props> = ({year, setYear}) => {
  const thisYear = new Date().getFullYear();
  const rendering = (): JSX.Element[] => {
    const result = [];
    console.log("유저 생성 연도");//유저 생성 연도
    for(let i = thisYear ; i >= 2020; i--){
      result.push(<button key={i} onClick={() => {setYear(i)}}>{i}</button> );
    }
    return result;
  }
  return (
    <div>
      {rendering()}
    </div>
  );
}
  
export default SelectYear;