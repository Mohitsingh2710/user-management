import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Pagination from "./components/Pagination";
import {useUserContext} from './context/UserList';

function App() {
  const {users, setUsers} =useUserContext();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(6);   
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    // Restoring Local Storage data in Users
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const screenWidth = window.innerWidth;
    //  For Desktop
    if (screenWidth > 700) {
      setPageSize(6);
    }
    //  For Tablet User
    else if (screenWidth <= 700 && screenWidth > 450) {
      setPageSize(4);
    }
    //  For mobile User
    else {
      setPageSize(storedUsers.length);
    }
  }, []);

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  const closeModal = () => {
    setShowAddUserModal(false);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Users Container && UserList */}
      <div className="users-container">
        <div className="addUsers">
          <h2>List of Users</h2>
          <button onClick={openAddUserModal}>Add Users</button>
        </div>

        <div className="users-list">
          {users?.length > 0 &&
            users
              .slice((pageNo - 1) * pageSize, pageNo * pageSize)
              .map((user, ind) => {
                return (
                  <Card
                    key={ind}
                    id={ind}
                    users={users}
                    setUsers={setUsers}
                    user={user}
                  />
                );
              })}
        </div>
      </div>

      {/* Add user Modal */}

      {showAddUserModal && (
        <Form
          title={"Add User"}
          currUser={null}
          users={users}
          setUsers={setUsers}
          closeModal={closeModal}
        />
      )}

      <Pagination
        users={users}
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
      />
    </div>
  );
}

export default App;
