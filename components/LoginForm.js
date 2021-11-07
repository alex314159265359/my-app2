import React, { useState } from "react";

export default function LoginForm() {
  const [isLoading, setLoading] = useState(false);

  const onClickLogin = () => {
    if (!isLoading) {
      setLoading(true);

      setTimeout(() => setLoading(false), 1000);
    }
  };
  return (
    <>
      <div className="ui container left aligned">
        <form className="ui form">
          <div className="field">
            <label>First Name</label>
            <input type="text" name="first-name" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input type="text" name="last-name" placeholder="Last Name" />
          </div>
          <div
            className={
              "ui fluid large black submit button" +
              (isLoading ? " loading" : "")
            }
            onClick={onClickLogin}
          >
            Login
          </div>
        </form>
      </div>
    </>
  );
}
