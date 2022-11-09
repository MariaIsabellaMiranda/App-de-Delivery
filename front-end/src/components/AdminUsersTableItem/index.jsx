import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import easyFetch from '../../helpers/easyFetch';
import dataTestId from '../../helpers/dataTestIds';

function AdminUsersTableItem({ userData, updateUsers, index, token }) {
  const { name, email, role, id } = userData;

  const deleteUser = async () => {
    await easyFetch(
      `http://localhost:3001/adm/${id}`,
      { Authorization: token },
      'DELETE',
    );
    updateUsers();
  };

  return (
    <tr>
      <td
        data-testid={ dataTestId('69', index) }
      >
        {index + 1}
      </td>
      <td
        data-testid={ dataTestId('70', index) }
      >
        {name}
      </td>
      <td
        data-testid={ dataTestId('71', index) }
      >
        {email}
      </td>
      <td
        data-testid={ dataTestId('72', index) }
      >
        {role}
      </td>
      <td>
        <button
          type="button"
          onClick={ deleteUser }
          data-testid={ dataTestId('73', index) }
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(AdminUsersTableItem);

AdminUsersTableItem.propTypes = {
  token: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  updateUsers: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
