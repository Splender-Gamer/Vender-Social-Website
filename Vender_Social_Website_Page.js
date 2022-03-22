
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
    apiKey: "AIzaSyBMZLQrz_MHKjVXqRUrRNAmYQg68wexaew",
    authDomain: "vender-social-app.firebaseapp.com",
    databaseURL: "https://vender-social-app-default-rtdb.firebaseio.com",
    projectId: "vender-social-app",
    storageBucket: "vender-social-app.appspot.com",
    messagingSenderId: "952503693110",
    appId: "1:952503693110:web:d9b38b021df0496afccd97",
    measurementId: "G-N84NC1ZXDW"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome "+user_name+"!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "Vender_Social_Website_Room.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
  Room_names = childKey;
  row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
  document.getElementById("output").innerHTML += row;
  });});
}
getData();

function redirectToRoomName(name)
{
  localStorage.setItem("room_name", name);
  window.location = "Vender_Social_Website_Room.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  localStorage.removeItem("user_email");
  window.location = "Login.html";
}