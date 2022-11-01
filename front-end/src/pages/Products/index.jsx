import lS from 'manager-local-storage';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { getTotalPrice } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';

function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(getTotalPrice());

  useEffect(() => {
    const getProducts = async () => {
      const productsResponse = await fetch('http://localhost:3001/products');
      const productsJson = await productsResponse.json();
      setProducts(productsJson);
    };
    getProducts();
  }, []);

  const updatePrice = () => setPrice(getTotalPrice());

  const existCart = () => {
    const cart = lS.get('cart') ?? [];
    return cart.length > 0;
  };

  return (
    <div>
      <Header />
      <main>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ !existCart() }
        >
          Ver Carrinho: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {priceFormat(price)}
          </span>
        </button>
        {products.length > 0 && products.map((product, i) => (
          <ProductCard
            key={ i }
            productData={ product }
            id={ i }
            updatePrice={ updatePrice }
          />
        ))}
      </main>
    </div>
  );
}

export default Products;
