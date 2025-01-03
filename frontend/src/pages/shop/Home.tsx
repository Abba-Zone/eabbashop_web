import { useCallback, useEffect, useState } from "react";
import { Banner, HomeProductList } from "../../components";
import { getMainProductLists_s } from "../../services/product";

const Home:React.FC = () => {
  const [newProducts, setNewProducts] = useState<shopProduct[]>([]);
  const [bestProducts, setBestProducts] = useState<shopProduct[]>([]);
  const [randomProducts, setRandomProducts] = useState<shopProduct[]>([]);
  const getProductList = useCallback( async () => {
        try {
          const ProductLists:mainProductList = await getMainProductLists_s("KOR","W");
          setNewProducts(ProductLists.newProducts);
          setBestProducts(ProductLists.bestProducts);
          setRandomProducts(ProductLists.randomProducts);
        } catch (error) {
          console.error('Error fetching product list:', error);
        }
    },[]);
  useEffect(() => {
    getProductList(); // 비동기 함수 호출
  }, [getProductList]);
  return (
    <div>
      <Banner/>
      <div>
        <h2>오늘의 발견</h2>
        <HomeProductList products={randomProducts}></HomeProductList>
      </div>
      <div>
        <h2>신제품</h2>
        <HomeProductList products={newProducts}></HomeProductList>
      </div>
      <div>
        <h2>베스트셀러</h2>
        <HomeProductList products={bestProducts}></HomeProductList>
      </div>
    </div>
  );
}

export default Home;
