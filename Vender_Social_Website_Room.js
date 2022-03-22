//YOUR FIREBASE LINKS
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
room_name = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}
function getData()
{
    firebase.database().ref("/"+room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = ""; snapshot.forEach(function(snapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
            //Start code
            console.log(firebase_message_id);
            console.log(message_data);
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];
            line_1 = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
            line_2 = "<h4 class='message_h4'>"+message+"</h4>";
            line_3 = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+"onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like : "+like+"</span></button><hr>";
            row = line_1 + line_2 + line_3;
            document.getElementById("output").innerHTML += row;
            //End code
    } }); });
}
getData();

function updateLike(message_id)
{
    likes = document.getElementById(message_id).value;
    update_Likes = Number(likes) + 1;
    console.log(update_Likes);
    firebase.database().ref(room_name).child(message_id).update(
        {
            like : update_Likes
        }
    );
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_email");
    window.location = "index.html";
}