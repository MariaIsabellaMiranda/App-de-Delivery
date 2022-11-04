import { Link, useHistory } from 'react-router-dom';
import lS from 'manager-local-storage';

function Header() {
  const history = useHistory();
  const user = lS.get('user');

  const logout = () => {
    history.push('/');
    lS.remove(['user', 'cart']);
  };

  return (
    <header>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <p data-testid="customer_products__element-navbar-user-full-name">
        {user.name}
      </p>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ logout }
      >
        Sair
      </Link>
    </header>
  );
}

export default Header;
