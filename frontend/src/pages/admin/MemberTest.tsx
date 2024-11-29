import { useEffect, useState } from "react";
import { getUserList_s } from "../../services/member";
import MemberList from "../../components/admin/member/MemberList";

const MemberTest:React.FC = () => {
    const [users, setUsers] = useState<testuser[]>([]);
    const getUserList = async () => {
        try {
          const tempUsers = await getUserList_s(); // 비동기 호출
          setUsers(tempUsers);
        } catch (error) {
          console.error('Error fetching user list:', error);
        }
      };
    useEffect(() => {
        getUserList(); // 비동기 함수 호출
      }, []);
    return (
      <div>
        {/* <MemberList users={users}></MemberList> */}
      </div>
    );
  }
  
  export default MemberTest;
  