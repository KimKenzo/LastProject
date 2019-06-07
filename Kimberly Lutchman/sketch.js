let zodiac = document.getElementById("zodiac")
let flower = document.getElementById("flower")
let x 
let y
let kim
let kobe
let picses
let taurus
let direction
let score
let level
let time
let leah
let scoreboard = {  }
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA15gex1Ap9X6C3Pp6C14CjaeqZm3I0Ed0",
    authDomain: "kimberly-a6aa6.firebaseapp.com",
    databaseURL: "https://kimberly-a6aa6.firebaseio.com",
    projectId: "kimberly-a6aa6",
    storageBucket: "kimberly-a6aa6.appspot.com",
    messagingSenderId: "142325788659",
    appId: "1:142325788659:web:fb725c22d9dbe05e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  	let database = firebase.database()

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/936
  x=500
  y=400
  kim=200
  kobe=200
  leah=4
  level=1
  pisces=[50,80,500,200,90,42,665,50,30,300]
  taurus=[500,40,280,263,11,6,32,420,68,300]
  direction=1
  score=0
  time=15
}

  
function draw() {
  if (time > 0) {
  background(251, 116, 204);
  fill( 182, 126, 234)
  circle(x*s, y, 200*s)
  fill(240, 255, 115)  
  circle(kim*s, kobe, 90*s)
  fill(255, 48, 85 )
  y=y+9*direction
  x=x-9*direction

for (i=0; i<leah; i=i+1) {
  circle(pisces[i]*s, taurus[i], 100*s)
  pisces[i]=pisces[i] +6*direction
  taurus[i]=taurus[i] +6*direction
  if (dist( kim, kobe, pisces[i], taurus[i]) < 90 +100) {
	score = score - 1
    time = time-.02
  }
}
  
  
  
  text("score:" +score, 70,50)
  text("time:"+time.toFixed(0), 80,70)
  
  
  
    if (keyIsDown(LEFT_ARROW)) {
    kim = kim - 15
  }
      if (keyIsDown(RIGHT_ARROW)) {
    kim = kim + 15
  }
      if (keyIsDown(DOWN_ARROW)) {
    kobe = kobe + 15
  }
    if (keyIsDown(UP_ARROW)) {
    kobe = kobe - 15
  }
  if ( y > height) {
	direction=direction*-1
    
}
if ( x > width) {
	direction = direction*-1
}
if ( x > height) {
	direction=direction*1
}
  if (dist( x, y, kim, kobe) < 200 + 90) {
	score = score + 1
  }
  if (score > 100 && level == 1) {
leah = leah + 1
level = 2
}
  if (score > 200 && level == 2) {
leah = leah + 1
level = 3
}
  if (score > 300 && level == 3) {
leah = leah + 1
level = 4
}
  }
 
  else {
    zodiac.innerHTML = "Name? <input id='flower'><button onclick='restart()'>Restart</button>"
noLoop()
onclick=generate_alltime_leaderboard()
    
    
   }
  
  
}

function restart() { 
let flower = document.getElementById("flower")
		name = flower.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
			
		}
alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 15
		score = 0
		loop()
		zodiac.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
		database.ref(name).set(score)
		
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()

