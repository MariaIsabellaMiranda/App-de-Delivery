import { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminRegister from '../../components/AdminRegister';
import AdminUsersTable from '../../components/AdminUsersTable';
import Header from '../../components/Header';
import easyFetch from '../../helpers/easyFetch';
import './styles/AdminManage.css';
import './styles/AdminManage-mobile.css';

function AdminManage({ token }) {
  const [users, setUsers] = useState([]);

  const updateUsers = useCallback(async () => {
    const response = await easyFetch(
      'http://localhost:3001/adm',
      { Authorization: token },
    );
    const responseJSON = await response.json();
    setUsers(responseJSON);
  }, [token]);

  useEffect(() => {
    updateUsers();
  }, [updateUsers]);

  return (
    <div className="_page_admin">
      <Header />
      <main>
        <AdminRegister updateUsers={ updateUsers } />
        <div className="_admin_users_table_area">
          <AdminUsersTable users={ users } updateUsers={ updateUsers } />
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(AdminManage);

AdminManage.propTypes = {
  token: PropTypes.string.isRequired,
};
