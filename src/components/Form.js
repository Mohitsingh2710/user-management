import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../context/UserList";
import "../App.css";

export default function Form({ title, currUser, closeModal }) {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    age: 0,
    gender: "male",
    dob: "",
    food: "Pizza",
    hobbies: "",
  });

  const { users, setUsers } = useUserContext();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!currUser) {
      setUser({
        id: Date.now(),
        name: "",
        age: 0,
        gender: "male",
        dob: "",
        food: "Pizza",
        hobbies: "",
      });
      return;
    }
    setUser(currUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Adding an event listener to detect clicks outside the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  //  Handling the changes in the input tags
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.age < 0) {
      alert("Enter Valid Age.");
      return;
    }

    if (user.name === "") {
      alert("Name field is required.");
      return;
    }

    const selectedUserIndex = users.findIndex(
      (existingUser) => existingUser.id === user.id
    );
    // console.log(selectedUserIndex);
    let updatedArray = [...users, user];
    if (users?.length > 0 && selectedUserIndex !== -1) {
      users[selectedUserIndex] = user;
      updatedArray = users;
    }

    // Directly setting the state variable users to the updatedArray.
    // This can be problematic in React because it may not trigger a
    // re-render of the component. React uses a concept called "reconciliation"
    //  to determine when to re-render components, and when you directly set the
    //  state to a new object or array, React may not detect the change, and the
    //  component won't re-render as expected.

    setUsers((prevValue) => [...updatedArray]);
    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef}>
        <h1>{title}</h1>

        {/* Marked Name as Required Field */}
        <form onSubmit={handleSubmit}>
          <div className="content">
            <label>Name</label>
            <input
              type="text"
              name="name"
              readOnly={title === "View User" ? true : false}
              value={user.name}
              onChange={handleChange}
              required={true}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="content">
            <label>Age</label>
            <input
              type="number"
              name="age"
              readOnly={title === "View User" ? true : false}
              value={user.age}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="content">
            <label>Gender</label>
            <select
              name="gender"
              readOnly={title === "View User" ? true : false}
              value={user.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="content">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              readOnly={title === "View User" ? true : false}
              value={user.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required={true}
            />
          </div>

          <div className="content">
            <label>Favorite Food</label>
            <select
              name="food"
              readOnly={title === "View User" ? true : false}
              value={user.food}
              onChange={handleChange}
            >
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Pasta">Pasta</option>
              <option value="Sushi">Sushi</option>
            </select>
          </div>

          <div className="content">
            <label>Hobbies</label>
            <textarea
              name="hobbies"
              readOnly={title === "View User" ? true : false}
              value={user.hobbies}
              onChange={handleChange}
              placeholder="Enter any Hobby"
              maxLength={100}
            ></textarea>
          </div>

          <button
            style={{ display: "block" }}
            className="delete-btn"
            onClick={closeModal}
          >
            close
          </button>
          <button
            style={title === "View User" ? { display: "none" } : {}}
            type="submit"
            className="view-btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
