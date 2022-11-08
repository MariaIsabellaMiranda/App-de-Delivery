import PropTypes from 'prop-types';
import AdminUsersTableItem from '../AdminUsersTableItem';

function AdminUsersTable({ users, updateUsers }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        {users.map((userData, i) => (
          <AdminUsersTableItem
            userData={ userData }
            key={ i }
            index={ i }
            updateUsers={ updateUsers }
          />
        ))}
      </tbody>
    </table>
  );
}

export default AdminUsersTable;

AdminUsersTable.propTypes = {
  updateUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
