export const signUpPageData = [
  {
    tag: "UserName",
    placeholder: "please enter your userName",
    value: "credentials.username",
    onChange:
      "{(e) => setCredentials({ ...credentials, email: e.target.value }",
  },
  {
    tag: "Passowrd",
    placeholder: "please enter your password",
    value: "credentials.password",
    onChange:
      "{(e) => setCredentials({ ...credentials, password: e.target.value }",
    type: "password",
  },
];
