import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import lS from 'manager-local-storage';
import { logoutUser } from '../../redux/actions/userAction';
import dataTestIds from '../../helpers/dataTestIds';
import './styles/Header.css';
import logo from '../../helpers/logo';

function Header({ dispatch, name, role, status }) {
  const history = useHistory();
  const logout = () => {
    lS.remove(['user', 'cart']);
    dispatch(logoutUser());
    history.push('/login');
  };

  const isCustomer = role === 'customer';
  const isSeller = role === 'seller';
  const isAdmin = role === 'administrator';

  return (
    <header className={ `_header${status}` }>
      <nav className="_navbar">
        <Icon icon={ logo } className="_logo" />
        {isCustomer && (
          <>
            <Link
              to="/customer/products"
              data-testid={ dataTestIds('11') }
            >
              Produtos
            </Link>
            <Link
              to="/customer/orders"
              data-testid={ dataTestIds('12') }
            >
              Meus Pedidos
            </Link>
          </>
        )}
        {isSeller && (
          <Link
            to="/seller/orders"
            data-testid={ dataTestIds('12') }
          >
            Pedidos
          </Link>
        )}
        {isAdmin && (
          <Link
            to="/admin/manage"
            data-testid={ dataTestIds('12') }
          >
            Gerenciar Usuários
          </Link>
        )}
      </nav>
      <div className="_right_content">
        <p data-testid={ dataTestIds('13') }>
          {name}
        </p>
        <Link
          to="/login"
          data-testid={ dataTestIds('14') }
          onClick={ logout }
        >
          <Icon icon="heroicons-outline:logout" />
        </Link>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  role: state.userReducer.role,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  status: PropTypes.string,
};

Header.defaultProps = {
  status: '',
};
