export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email !== "" && password !== "") {
        resolve(
          localStorage.setItem("username", email.split("@")[0]),
          localStorage.setItem("email", email),
        );
        window.location.href = "/dashboard";
      }
      reject("Invalid email or password");
    }, 500);
  });
};

export const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localStorage.removeItem("username"), localStorage.removeItem("email"));
      window.location.href = "/login";
    }, 500);
  });
};

export const useSession = () => {
  if (localStorage.getItem("username") !== null) {
    return {
      isLogin: true,
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
    };
  }
  return {
    isLogin: false,
    username: null,
  };
};
