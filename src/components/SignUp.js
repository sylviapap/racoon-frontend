import React from 'react';

const SignUp = props =>  {
  const { fields, handleSubmit, handleChange } = props;
    return (
        <div className="App">
        <form onSubmit={handleSubmit}>
          <div className="field">
          <i className="glyphicon glyphicon-user"></i>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
            //   value={fields.username}
              onChange={handleChange}
            />
          </div>
          <div className="field">
          <i className="glyphicon glyphicon-cloud"></i>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
            //   value={fields.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        </div>
      );
    }
  
  export default SignUp;