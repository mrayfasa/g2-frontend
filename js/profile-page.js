document.getElementById("LogoutButton").addEventListener("click", function () {
  window.location = "account-page.html";
  alert("Anda akan keluar.");
});

function getProfileDetails() {
  AjaxRequest(API_URL + "/v1/user/profile", "GET", {}, (res) => {
    const profile_name = document.getElementById("profile-name");
    const profile_email = document.getElementById("profile-email");
    profile_email.innerHTML = res.data.email;
    profile_name.innerHTML = res.data.fullname;
  });
}
function logoutButton() {
  setCookie("token", "", -1);
}
getProfileDetails();
