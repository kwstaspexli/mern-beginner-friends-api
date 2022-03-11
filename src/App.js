import "./App.css";
import React, { useState,useEffect } from 'react';
import Axios from "axios";

function App() {

  const mystyle = {
    margin:"20px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "centre",
    alignItems: "centre",
    flexGrow: "1",
    border: "2px solid",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    width: "250px",
    borderRadius: "20px"
  };

  const flex = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "centre",
    alignItems: "centre",
    flexGrow: "1",
  }

  const button = {
    width: "150px",
    border: "2px solid",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
  }

  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

    useEffect(() => {
      Axios.get("https://mern-beginner-friends-app.herokuapp.com/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        alert("it didnt work");
      });
    }, [] );

    const addFriend = () => {
      Axios.post("https://mern-beginner-friends-app.herokuapp.com/addFriend", {
        name,
        age,
      }).then((response) => {
        setListOfFriends([
          ...listOfFriends,
          {
            _id: response.data.id,
            name: name,
            age: age,
          },
        ]);
      });
    };

    const updateFriend = (id) => {
      const newAge = prompt("Enter new age: ");

      Axios.put("https://mern-beginner-friends-app.herokuapp.com/update", { newAge: newAge, id: id })
      .then(() => {
        setListOfFriends(listOfFriends.map((val) => {
          return val._id == id ? {_id: id, name: val.name, age: newAge}
                               : val;
        }))
      });
    };


    const deleteFriend = (id) => {
      Axios.delete(`https://mern-beginner-friends-app.herokuapp.com/${id}`)
      .then(() => {
        setListOfFriends(listOfFriends.filter((val) => {
          return val._id !== id;
        })
        )
      });
    };


  return <div style={flex}>
    <div style={mystyle} >
    <input type="text" placeholder="name" 
      onChange={(event) => {
        setName(event.target.value);
      }} />
    <input type="number" placeholedr="age" 
      onChange={(event) => {
        setAge(event.target.value);
      }} />
       <button onClick={addFriend}> Add Friend </button>
       </div>

    {listOfFriends.map((val) => {
      return  <>
        <div style={mystyle}> 
          <h3>name:{val.name}</h3>
          <h3>age:{val.age}</h3>

          <button onClick={() => { updateFriend(val._id);}} 
          style={button}>update</button>

          <button style={button}
          onClick={() => {deleteFriend(val._id); }} >delete</button>

        </div>
      </>
    })}
  </div>;
}

export default App;
