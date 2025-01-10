import "./RegistAdmin.css";
const RegistAdmin: React.FC = () => {  
  localStorage.setItem('menuVisible', 'false');
  return (
    <div className="signup-container">
      <div className="logo-container">
        <img></img>
      </div>
      <h1>AbbaFamily가 되어보세요!</h1>
      <form className="signup-form">
        <input type="text" placeholder="아이디" required />
        <input type="password" placeholder="비밀번호 (영문+숫자+특수문자, 8-15자)" required />
        <input type="password" placeholder="비밀번호 확인" required />
        <input type="text" placeholder="이름" required />
        <input type="email" placeholder="이메일" required />
        <input type="text" placeholder="핸드폰번호(-제외)" required />
        <button type="button">인증요청</button>
      <div className="checkbox-group">
        <input type="checkbox" id="agree-all" />
        <label htmlFor="agree-all">모두 동의합니다</label>
        <p>모두 동의에는 필수 및 선택...</p>
        <div className="checkbox-item">
          <input type="checkbox" id="agree1" />
          <label htmlFor="agree1">[필수] 19세 이상입니다</label>
        </div>
      </div>
      <button type="submit" disabled>약관 동의하고 가입하기</button>
      </form>
  <p>이미 계정이 있나요? <a href="#">로그인</a></p>
  <p>해외 사업자분들은 <a href="#">글로벌 셀러 가입하기</a></p>
  </div>
  );
};

export default RegistAdmin;
