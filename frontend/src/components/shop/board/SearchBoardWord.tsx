import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


interface Props{
    setSearchWord(WORD:string):void
}
const SearchBoardWord:React.FC<Props> = ({setSearchWord}) => {
    const [word, setWord] = useState<string>("");
    const params = useParams<{type:string}>();
    useEffect(() => {
        setWord("");
    }, [params.type]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setWord(value);
    };
    const search = () => {
        setSearchWord(word);
    };
    return (
        <div >
            <input type="text" value={word} onChange={handleChange}/>
            <button onClick={search}>찾기</button>
        </div>
    );
}
    
export default SearchBoardWord;
