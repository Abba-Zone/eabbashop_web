import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavSearch:React.FC = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>("");
    const [word, setWord] = useState<string>("");
    const categories = [{ID:"1234qwea1", name:"이름1"}, {ID:"1234qwea2", name:"이름2"}, {ID:"1234qwea3", name:"이름3"}, {ID:"1234qwea4", name:"이름4"}, {ID:"1234qwea5", name:"이름5"}];
    const categoriesOption = (): JSX.Element[] => {
        const result = [];
        result.push(<option key={0} value="" disabled hidden>카테고리</option>)
        for(let i = 0 ; i < categories.length; i++){
          result.push(<option key={i + 1} value={i}>{categories[i].name}</option>);
        }
        return result;
    }
    const Search = () => {
        navigate('search?category='+category +'&q=' + word)
    }
    return (
        <div>
            <select name="category" value={category} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setCategory(event.target.value)}}>
                {categoriesOption()}
            </select>
            <input type='word' value={word} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setWord(event.target.value)}}/>
            <button onClick={Search}>검색</button>
        </div>
    );
};

export default NavSearch;
  