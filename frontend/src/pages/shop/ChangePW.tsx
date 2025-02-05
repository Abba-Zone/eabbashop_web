import { updatePassword_s } from '../../services/member';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ChangePW = () => {
    const navigate = useNavigate();
    const [inputPassword, setInputPassword] = useState<string>('');
    const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
    const Cookies = require('js-cookie');
    const updatePassword = async (password: string) => {
        if (isPasswordSame) {
            const updatePasswordResult = await updatePassword_s(Cookies.get('email') || '', password);
            if (updatePasswordResult) {
                alert('비밀번호 변경 완료');
                alert('로그인 페이지로 이동합니다.');
                navigate('/login');
            } else {
                alert('비밀번호 변경에 실패했습니다. 관리자에게 문의하세요.');
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }

    const checkPasswordSame = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputPassword !== e.target.value) {
            setIsPasswordSame(false);
        } else {
            setIsPasswordSame(true);
        }
    }
  return (
    <div>
      <h1>새로운 비밀번호를 입력해주세요.</h1>
      <input value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} type="password" placeholder="새로운 비밀번호를 입력해주세요." />
      <input onChange={checkPasswordSame} type="password" placeholder="비밀번호를 다시 입력해주세요." />
      <button onClick={() => updatePassword(inputPassword)}>비밀번호 변경</button>
    </div>
  );
};

export default ChangePW;