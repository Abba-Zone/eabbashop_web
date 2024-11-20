import { useEffect, useState } from "react";
import ListCard from "./MemberListCard";
interface Props{
    users:testuser[];
}

const MemberList:React.FC<Props> = (props) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < props.users.length ; i++ ){
            result.push(<ListCard key={i} user={props.users[i]}></ListCard>);
        }
        return result;
    }
    return (
      <div>
        {props.users==null? <></>: rendering()}
      </div>
    );
}
  
export default MemberList;