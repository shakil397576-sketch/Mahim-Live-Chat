const name = localStorage.getItem("litechat_name");
if (!name) window.location.href = "index.html";

document.getElementById("headerName").innerText = name;

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");

// Listen for new messages
db.ref("messages").on("child_added", snapshot => {
  const data = snapshot.val();
  const msg = document.createElement("div");
  msg.innerText = `${data.name}: ${data.text}`;
  msg.className = (data.name === name) ? "me" : "other";
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send message
function sendMsg() {
  const text = input.value.trim();
  if (!text) return;
  db.ref("messages").push({ name, text });
  input.value = "";
}
