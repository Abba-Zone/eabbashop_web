import { useState } from "react";
import Menu from "../menu/Menu";

type style = {
    display : string,
}
const AdminHaeder:React.FC = () => {
    const [ style, setStyle ] = useState<style>({display: 'none'})
    const [ visible, setVisible ] = useState<boolean>(false)
    const openMenu = () => {
        if(visible){
            setStyle({display: 'none'});
            setVisible(false);
        }else{
            setStyle({display: 'block'});
            setVisible(true);
        }
    }
    return (
        <div>
            <div className="header">
                <div className="header-left"><div onClick={openMenu}>햄버거</div> <div>로고</div></div>
                <div className="header-right">도움말 + 프로필 + 유저명</div>
            </div>
            <div style={style}>
                <Menu/>
            </div>
            
        </div>
    );
  }
  
  export default AdminHaeder;
  