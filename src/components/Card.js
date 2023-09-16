import "../App.css";
import { useEffect, useState } from "react";
import Form from "./Form";
import {useUserContext} from '../context/UserList';

export default function Card({ id, user }) {
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);

  const {users, setUsers} =useUserContext();

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const deleteUser = (e, userId) => {
    e.preventDefault();
    const updatedArray = users.filter((user) => {
      return user.id !== userId;
    });
    setUsers(() => updatedArray);
  };

  const openEditModal = () => {
    setShowEditUserModal(true);
  };

  const closeEditModal = () => {
    setShowEditUserModal(false);
  };

  const openViewModal = () => {
    setShowViewUserModal(true);
  };

  const closeViewModal = () => {
    setShowViewUserModal(false);
  };

  const ageCategory = (age) => {
    if (age >= 0 && age < 25) {
      return "green";
    } else if (age >= 25 && age < 50) {
      return "purple";
    }
    return "red";
  };

  return (
    <div className="Card">
      <div className="identity">
        <h2>{user.name}</h2>
        <div
          className="ageCate"
          style={{ backgroundColor: ageCategory(user.age) }}
        ></div>
      </div>
      <div className="details">
        <div className="ageDiv">
          <p>Age : {user.age} </p>
        </div>
        <div className="dobDiv">
          <p>DOB : {user.dob}</p>
        </div>
        <div className="Div">
          <p>Food : {user.food}</p>
        </div>
        <div className="ageDiv">
          <p>Hobby : {user.hobbies}</p>
        </div>
      </div>

      <div className="btn-container">
        <button
          className="delete-btn"
          type="submit"
          onClick={(e) => deleteUser(e, user.id)}
        >
          Delete
        </button>
        <button className="edit-btn" type="submit" onClick={openEditModal}>
          Edit
        </button>
        <button className="view-btn" type="submit" onClick={openViewModal}>
          View
        </button>
      </div>

      {showEditUserModal && (
        <Form
          title="Edit User"
          currUser={user}
          users={users}
          setUsers={setUsers}
          closeModal={closeEditModal}
        />
      )}

      {showViewUserModal && (
        <Form
          title="View User"
          currUser={user}
          users={users}
          setUsers={setUsers}
          closeModal={closeViewModal}
        />
      )}
    </div>
  );
}
