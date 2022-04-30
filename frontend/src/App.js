import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  // get Users
  useEffect(() => {
      const url = "http://localhost:5000/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const newUser = { name: name, email: email, phone: phone };

    // Add an User
    const url = "http://localhost:5000/users";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId){
          alert('Successfully adedd the user!')
          e.target.reset();
        }
      });
    e.preventDefault();
  };
  // Delete User
  const handleDeleteUser =(id)=>{
    const proceed = window.confirm("Are you sure wnat to delete?")
    if (proceed){
      const url = `http://localhost:5000/users/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  }

  return (
    <div className="App">
      <h2 className="text-center mt-4 text-uppercase fw-bold">Total users: {users.length}</h2>
      <Form onSubmit={handleAddUser} className="px-5 py-3">
        <Form.Group className="mb-3">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control type="text" ref={nameRef} placeholder="Name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter your email</Form.Label>
          <Form.Control type="email" ref={emailRef} placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter your phone</Form.Label>
          <Form.Control type="tel" ref={phoneRef} placeholder="Phone" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="submit"
            className="btn btn-success"
          />
        </Form.Group>
      </Form>
      {users.length===0 ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <Card className="card">
          {users.map(({ name, phone, email, _id }) => (
            <Card className="card-items" key={_id}>
              <h1 className="fw-bold text-uppercase">{name}</h1>
              <h4>{email}</h4>
              {!phone ? <h4>No Number</h4> : <h5>{phone}</h5>}
              <div>
                <button className="btn btn-warning">Update</button>
                <button className="btn btn-danger" onClick={()=>handleDeleteUser(_id)}>X</button>
              </div>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
}

export default App;
