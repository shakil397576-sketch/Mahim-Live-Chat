// Get names
const myName = localStorage.getItem("litechat_name");
const partnerName = localStorage.getItem("partner_name");

if(!myName || !partnerName){
  window.location.href="index.html";
}

// Show username in header
document.getElementById("headerName").innerText = `Chat with ${partnerName}`;

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Determine chat path (alphabetical)
const chatPath = [myName, partnerName].sort().join("_");
const messagesRef = db.ref("chats/" + chatPath);

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");

// Listen for new messages
messagesRef.on("child_added", snapshot=>{
  const data = snapshot.val();
  const msg = document.createElement("div");
  msg.innerText = `${data.from}: ${data.text}`;
  msg.className = (data.from===myName) ? "me" : "other";
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send message
function sendMsg(){
  const text = input.value.trim();
  if(!text) return;
  messagesRef.push({from: myName, text});
  input.value="";
}
