import React, { useState } from "react";

function Login({ users, myName, setCurrentUser, evtLogin }) {
  return (
    <>
      <h2 className="loginName">{myName}</h2>
      <section className="login-box">
        <select name="" id="" onChange={(e) => setCurrentUser(e.target.value)}>
          <option value="">선택해주세요</option>
          {users?.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className="info">
          <button type="button" className="btn btn-dark" onClick={evtLogin}>
            로그인
          </button>
        </div>
      </section>
    </>
  );
}

export default Login;
