import { useState } from "react";
import Menu from "../menu/Menu";
import "./style.css"

const AdminHaeder:React.FC = () => {
    const [ visible, setVisible ] = useState<boolean>(false)
    const openMenu = () => {
        if(visible){
            setVisible(false);
        }else{
            setVisible(true);
        }
    }
    return (
        <div className="admin-header-and-menu">
            <div className="admin-header">
                <div className="admin-header-left">
                    <div className="admin-header-menu-button" onClick={openMenu}>햄버거</div> 
                    <div className="admin-header-logo">로고</div>
                </div>
                <div className="admin-header-right">
                    <div>도움말</div>
                    <div>프로필</div>
                    <div>유저명</div>
                </div>
            </div>
            {visible?<Menu/>:<></>}
        </div>
    );
  }
  
  export default AdminHaeder;
  