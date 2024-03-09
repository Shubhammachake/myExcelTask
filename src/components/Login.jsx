import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    let mydata = localStorage.getItem("myInfo");
    let myData = JSON.parse(mydata);

    if (myData) {
      if (myData.email === data.email && myData.password === data.password) {
        alert("Login SucessFull");
        navigate("/Home");
      } else if (
        myData.email === data.email &&
        myData.password !== data.password
      ) {
        alert("incorect password");
      }
    } else {
      alert("no user found please try Register");
    }
  };

  return (
    <div className="cont">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => handleChange(e)}
          name="email"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => handleChange(e)}
          name="password"
          required
        />
        <br />
        <button className="btns" type="submit">
          Login
        </button>
        <div className="button-div">
          <Link to="/Register">
            <button className="btns">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
