// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXYmx-vK_iyFDdg-KkEHxFnT53olB-UYQ",
    authDomain: "suset-pleasure.firebaseapp.com",
    databaseURL: "https://suset-pleasure.firebaseio.com",
    projectId: "suset-pleasure",
    storageBucket: "suset-pleasure.appspot.com",
    messagingSenderId: "66742822866",
    appId: "1:66742822866:web:e303f55f30a029ae"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()
let x
let y
let s
let c
let direction_h
let direction_v
let score
let k
let j
let direction_h2
let direction_v2
let rapid
let level
let time 
let records = document.getElementById("records")
let scoreboard = {  }






function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 700
  y = 80
  s = 80
  c = 600
  direction_h = 1
  direction_v = 1 
  score = 0
  k = [ 100, 270, 340,420 ]
  j = [ 160,250, 380,400 ]
  direction_h2 = [1,1,-1,1]
  direction_v2 = [1,1,-1,1]
  rapid = 4
  level = 1
  time = 50
  
  

  
 
}

function draw() {
    if (time > 0) {

    background(5,145,130);
    fill(160,160,160)
    circle(x,y,30)
    x= x + 10*direction_h
    y= y + 10*direction_v
    fill(180,220,160)
    circle(s,c,55)
    if(keyIsDown(LEFT_ARROW)) {
      s = s - 10 
  }
    if(keyIsDown(RIGHT_ARROW)) {
      s = s + 10 
  }
    if(keyIsDown(UP_ARROW)) {
      c = c - 10
  }
    if(keyIsDown(DOWN_ARROW)) {
      c = c + 10 
  }
   x = x + 2* direction_h
   y = y - 3*direction_v
    if (x > width || x < 0) {
      direction_h = direction_h * -1
  }
     if ( y > height || y < 0) {
      direction_v = direction_v * -1
  }
    textSize(30)
    text("Score:" + score, 500, 100)	
      if (dist( x, y, s, c) < 30 + 55) {
      score = score + 1


  }

for (i=0; i<rapid; i=i+1) {
    fill(255,100,50)
    circle(k[i], j[i],25)
    k[i]= k[i] + 5*direction_h2[i]
    j[i]= j[i] + 5*direction_v2[i]

    if (k[i] > width || k[i] < 0) {
      direction_h2[i] = direction_h2[i] * -1 
  }
     if ( j[i] > height || j[i] < 0) {
      direction_v2[i] = direction_v2[i] * -1 
  }
        if (dist( s, c, k[i], j[i]) < 55 + 25) {
      score = score - 1
  }
 }
  if (score > 5 && level == 1) {
    rapid = rapid + 2
    level = 2
    k.push.apply(k, [480, 100])
    j.push.apply(j, [172,100])
    direction_h2.push.apply(direction_h2, [1,1])
    direction_v2.push.apply(direction_v2, [1,1])
   
}
  if (score > 10 && level == 2) {
    rapid = rapid + 4
    level = 3
    k.push.apply(k, [185, 190,120,170])
    j.push.apply(j, [200,290,400,355])
    direction_h2.push.apply(direction_h2,[1,1,1,-1,])
    direction_v2.push.apply(direction_v2,[1,1,1,-1,])
}
  if (score > 15 && level == 3) {
    rapid = rapid + 4
    level = 4
    k.push.apply(k, [150,200,65,100])
    j.push.apply(j, [75,90,100,155])
    direction_h2.push.apply(direction_h2,[1,1,1,1])
    direction_v2.push.apply(direction_v2,[1,1,1,1])
}
    if (score > 20 && level == 4) {
    rapid = rapid + 3
    level = 5
    k.push.apply(k, [500,600,700])
    j.push.apply(j, [100,150,200])
    direction_h2.push.apply(direction_h2,[1,1,1])
    direction_v2.push.apply(direction_v2,[1,1,1])
}
    if (score > 25 && level == 5) {
    rapid = rapid + 4
    level = 6
    k.push.apply(k, [330,650,500,600])
    j.push.apply(j, [80,400,100,150])
    direction_h2.push.apply(direction_h2,[1,1,1,-1])
    direction_v2.push.apply(direction_v2,[1,1,1,-1])
                                 
}
    if (score > 30 && level == 6) {
    rapid = rapid + 2
    level = 7
    k.push.apply(k, [80,100])
    j.push.apply(j, [600,600])
    direction_h2.push.apply(direction_h2,[1,1])
    direction_v2.push.apply(direction_v2,[1,1])
}
   if (score > 35 && level == 7) {
    rapid = rapid + 3
    level = 8
    k.push.apply(k, [200,170,200])
    j.push.apply(j, [600,600,500])
    direction_h2.push.apply(direction_h2,[1,1,-1])
    direction_v2.push.apply(direction_v2,[1,1,1])
}
  if (score > 40 && level == 8) {
    rapid = rapid + 3
    level = 9
    k.push.apply(k, [300,180,230])
    j.push.apply(j, [400,700,500])
    direction_h2.push.apply(direction_h2,[1,1,-1])
    direction_v2.push.apply(direction_v2,[1,1,1])
}
  
  
    text("Time:" + time.toFixed(1), 500, 60)
    time = time - .1
}
  else {
    records.innerHTML = "Name? <input id=tags><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
    noLoop() 
}
 
}
function restart() { 
        let tags = document.getElementById("tags")
		name = tags.value 
		if (name != "") { 
			scoreboard[name] = score
			database.ref(name).set(score)
		}
        alert("Scoreboard: " +
JSON.stringify(scoreboard,null,1)) 
		time = 50
		score = 0
        level = 1
        rapid = 4
		loop()
		records.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i< 3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
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



