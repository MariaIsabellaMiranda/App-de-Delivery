import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lS from 'manager-local-storage';
import { logoutUser } from '../../redux/actions/userAction';
import dataTestIds from '../../helpers/dataTestIds';

function Header({ dispatch, name }) {
  const history = useHistory();
  const logout = () => {
    lS.remove(['user', 'cart']);
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <header>
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
      <p data-testid={ dataTestIds('13') }>
        {name}
      </p>
      <Link
        to="/login"
        data-testid={ dataTestIds('14') }
        onClick={ logout }
      >
        Sair
      </Link>
    </header>
  );
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
