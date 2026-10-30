import React, { useReducer, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TitleContext } from "../App";

const initialState = {
  username: "",
  password: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function Login() {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle("Login");
  }, [setTitle]);

  const [form, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Login form submitted!");

    dispatch({ type: "RESET" });
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 text-center mb-4">Login</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>

                <p className="text-center mt-3 mb-0">
                  Don't have an account? <a href="/register">Register</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
