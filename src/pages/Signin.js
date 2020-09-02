import React, { useState } from "react";
import { Auth } from "aws-amplify";

const Signin = () => {
  const [showForm, setShowForm] = useState("signUp");

  let formInputState = {
    username: "",
    password: "",
    email: "",
    verificationCode: "",
  };

  const onChange = (e) => {
    formInputState = { ...formInputState, [e.target.name]: e.target.value };
  };

  async function signUp() {
    try {
      await Auth.signUp({
        username: formInputState.username,
        password: formInputState.password,
        attributes: {
          email: formInputState.email,
        },
      });
      setShowForm("confirmSignUp");
    } catch (err) {
      console.log({ err });
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(
        formInputState.username,
        formInputState.verificationCode
      );
    } catch (err) {
      console.log({ err });
    }
  }

  async function signIn() {
    try {
      await Auth.signIn(formInputState.username, formInputState.password);

      setShowForm("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }

  /* In the UI of the app, render forms based on form state */
  /* If the form state is "signUp", show the sign up form */
  if (showForm === "signUp") {
    return (
      <div>
        <p>Sign up form</p>
        <p>*Username</p>
        <input name="username" onChange={onChange} />
        <p>*Email</p>
        <input name="email" onChange={onChange} />
        <p>*Password</p>
        <input name="password" type="password" onChange={onChange} />

        <button onClick={signUp}>Sign Up</button>
        <div>
          <p>
            If you already have an account,{" "}
            <button onClick={() => setShowForm("signIn")}>Sign in</button>
          </p>
        </div>
      </div>
    );
  }

  /* If the form state is "confirmSignUp", show the sign up form */
  if (showForm === "confirmSignUp") {
    return (
      <div>
        <p>Sign up confirmation form</p>
        <p>*Username</p>
        <input name="username" onChange={onChange} />
        <p>*Verification code</p>
        <input name="verificationCode" onChange={onChange} />
        <button onClick={confirmSignUp}>Confirm sign up</button>
      </div>
    );
  }

  /* If the form state is "signIn", show the sign in form */
  if (showForm === "signIn") {
    return (
      <div>
        <p>Sign in form</p>
        <p>*Username</p>
        <input name="username" onChange={onChange} />
        <p>*Password</p>
        <input name="password" onChange={onChange} />
        <button onClick={signIn}>Sign In</button>
        <div>
          <p>
            If you don't have an account,{" "}
            <button onClick={() => setShowForm("signUp")}>Sign up</button>
          </p>
        </div>
      </div>
    );
  }

  if (showForm === "signedIn") {
    return (
      <div>
        <h1>Welcome to my app!</h1>
      </div>
    );
  }
};

export default Signin;
