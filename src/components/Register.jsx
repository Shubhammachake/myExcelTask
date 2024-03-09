import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let regX = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  const isValidPass = (val) => {
    return regX.test(val);
  };
  const [data, setData] = useState({
    // userName: "",
    email: "",
    password: "",
    confPass: "",
  });

  const [passError, setPassError] = useState("");
  const [congPassError, setConfPassError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (!isValidPass(value)) {
        setPassError(
          "password must contain 8 charecter 1 uppercase 1 special charecter 1 number"
        );
      } else {
        setPassError("");
      }
    }

    if (name == "confPass") {
      if (data.password === value) {
        setConfPassError("");
      } else {
        setConfPassError("password Doesnot Match");
      }
    }

    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    let mydata = localStorage.getItem("myInfo");
    let myData = JSON.parse(mydata);

    if (myData) {
      if (myData.email === data.email) {
        alert("user Alredy Exist");
        navigate("/");
      } else if (passError) {
        navigate("/Register");
        alert("password must meet Criteria");
      } else {
        alert("user Created Successfully");
        navigate("/");
        localStorage.setItem("myInfo", JSON.stringify(data));
      }
    } else {
      alert("user Created Successfully");
      localStorage.setItem("myInfo", JSON.stringify(data));
      navigate("/");
    }
  };

  const handleBack = () => {
    navigate("/");
  };
  console.log(localStorage.getItem("myInfo"));

  return (
    <div className="cont">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {/* <input
          type="text"
          name="userName"
          placeholder="enter User Name"
          onChange={(e) => handleChange(e)}
          required
        />
        <br /> */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={(e) => handleChange(e)}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => handleChange(e)}
          required
        />
        {passError && <p>{passError}</p>}
        <br />
        <input
          type="password"
          name="confPass"
          placeholder="Confirm Password"
          onChange={(e) => handleChange(e)}
          required
        />
        {congPassError && <p>{congPassError}</p>}
        <br />

        <div className="btn-div">
          <button type="submit" className="btns">
            Register
          </button>
          <button className="btns" onClick={handleBack}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
