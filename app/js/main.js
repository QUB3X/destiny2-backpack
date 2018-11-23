import api from "./api.js"
import cookies from "./cookies.js"

if(window.location.pathname != "/") {
  console.log(window.location.pathname)
}

const btn_login = document.querySelector("#login")

btn_login.addEventListener("click", () => {
  API.login()
})