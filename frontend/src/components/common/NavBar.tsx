import NavButtonSet from "./Nav/NavButtonSet";
import NavSearch from "./Nav/NavSearch";

const NavBar:React.FC = () => {
    return (
        <div>
            <NavSearch></NavSearch>
            <NavButtonSet></NavButtonSet>
        </div>
    );
};

export default NavBar;
  