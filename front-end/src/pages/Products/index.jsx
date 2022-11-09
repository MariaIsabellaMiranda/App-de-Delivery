import lS from 'manager-local-storage';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { getTotalPrice } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';
import dataTestIds from '../../helpers/dataTestIds';
import './styles/Products.css';

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
    <div className="_page_products">
      <Header />
      <main>
        <button
          type="button"
          data-testid={ dataTestIds('21b') }
          onClick={ () => history.push('/customer/checkout') }
          disabled={ !existCart() }
          className="_btn_cart"
        >
          <Icon icon="eva:shopping-cart-outline" />
          <span>
            R$
            <span data-testid={ dataTestIds('21') }>
              {priceFormat(price)}
            </span>
          </span>
        </button>
        <section className="_products">
          {products.length > 0 && products.map((product, i) => (
            <ProductCard
              key={ i }
              productData={ product }
              id={ i }
              updatePrice={ updatePrice }
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Products;
