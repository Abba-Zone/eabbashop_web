import { Banner } from "../../components";

const Home:React.FC = () => {
  return (
    <div>
      <Banner/>
      <div>
        <h2>오늘의 발견</h2>
        <div>(탬플릿만들어서 정보만 다르게 넣으면 됨)</div>
      </div>
      <div>
        <h2>신제품</h2>
        <div>(탬플릿만들어서 정보만 다르게 넣으면 됨)</div>
      </div>
      <div>
        <h2>베스트셀러</h2>
        <div>(탬플릿만들어서 정보만 다르게 넣으면 됨)</div>
      </div>
    </div>
  );
}

export default Home;
