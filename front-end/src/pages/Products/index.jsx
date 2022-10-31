import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsResponse = await fetch('http://localhost:3001/products');
      const productsJson = await productsResponse.json();
      setProducts(productsJson);
    };
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {products.map((product, i) => (
          <ProductCard key={ i } productData={ product } id={ i } />
        ))}
      </main>
    </div>
  );
}

export default Products;
