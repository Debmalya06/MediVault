// document.getElementById("loginForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent page reload

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//         const response = await fetch("http://localhost:8081/api/admins/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ email: email, password: password })
//         });

//         const data = await response.json();

//         if (response.ok && data.success) {
//             // Store the admin name in local storage
//             localStorage.setItem("adminname", data.data.adminname);
//             // Redirect to admin.html
//             window.location.href = "admin.html";
//         } else {
//             // Display error message
//             document.getElementById("loginError").textContent = data.message || "Invalid login credentials. Please try again.";
//             document.getElementById("loginError").style.display = "block";
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         document.getElementById("loginError").innerText = "An error occurred. Please try again.";
//         document.getElementById("loginError").style.display = "block";
//     }
// });