  var seconds;
  var seconds2 = 0;
  var mode;
  var tbh;
  let unlockedShown = false;
  let burstUnlocked = false;
  let hit = 0;
  let bmode = false;
  let stats = false;
  let paused = false;
  let interval;
  let interval2;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let streak = document.getElementById("streak");
  let box = { x: 0, y: 0, width: 50, height: 50 };
  document.getElementById("gameOver").style.display = "none";

  function count() {
    if (seconds > 0) {
      seconds--;
      time.innerHTML = "Time: " + seconds;

    } else if (seconds == 0 && stats == false && bmode == false) {
      clearInterval(interval);
      time.style.display = "none";
      gameOver.style.display = "block";

      document.getElementById("btnStats").style.display = "none";
      document.getElementById("btnClose").style.display = "none";
      if (hit >= 10 && canvas.width == 1000 && unlockedShown == false) {
        document.getElementById("unlock").style.display = "block";
        burstUnlocked = true; 
        unlockedShown = true;
      }
      
    } else if (seconds == 0 && bmode == true) {
      clearInterval(interval);
      time.style.display = "none";
      document.getElementById("burstOver").style.display = "block";
      if (bmode == false ){
        tbh = 10 / hit;
      }
      else {
        tbh = seconds2 / hit;
      }
      
      document.getElementById("tbh").innerHTML = isFinite(tbh) && hit > 0 ?
        "average time between hits: " + Number(tbh.toFixed(2)) :
        "average time between hits: 0";
      document.getElementById("hits").innerHTML = "Hits: " + hit;
      document.getElementById("tbhBurst").innerHTML = isFinite(tbh) && hit > 0 ?
        "average time between hits: " + Number(tbh.toFixed(2)) :
        "average time between hits: 0";
      document.getElementById("hits").innerHTML = "Hits: " + hit;

    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      if (seconds > 0 && !paused) {
        paused = true;
        clearInterval(interval);
        clearInterval(interval2);
        document.getElementById("pause").style.display = "block";
      } else if (paused) {
        paused = false;
        interval = setInterval(count, 1000);
        interval2 = setInterval(betweenHits, 1000); 
        document.getElementById("pause").style.display = "none";
      }
    }
  });
  function betweenHits() {
    seconds2++;
  }
  function showStats() {
    if (seconds > 0 && !paused) {
      paused = true;
      clearInterval(interval);
      clearInterval(interval2);
      stats = true;
      document.getElementById("pause").style.display = "none";
      document.getElementById("stats").style.display = "block";
      if (bmode == true){
        tbh = 10 / hit;
      }
      else {
        tbh = seconds2 / hit;
      }
      document.getElementById("tbh").innerHTML = isFinite(tbh) && hit > 0 ?
        "average time between hits: " + Number(tbh.toFixed(2)) :
        "average time between hits: 0";
      document.getElementById("hits").innerHTML = "Hits: " + hit;
      document.getElementById("tbh").innerHTML = isFinite(tbh) && hit > 0 ?
        "average time between hits: " + Number(tbh.toFixed(2)) :
        "average time between hits: 0";
      document.getElementById("hits").innerHTML = "Hits: " + hit;
    }
  }

  function resumeGame() {
    paused = false;
    interval = setInterval(count, 1000);
    document.getElementById("pause").style.display = "none";
  }

  function showMenu() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("menu").style.display = "block";
  }

  function hideMenu() {
    document.getElementById("menu").style.display = "none";
  }

  function easy() {
    interval = setInterval(count, 1000);
    interval2 = setInterval(betweenHits, 1000);
    stats = false;
    seconds = 4;
    canvas.width = 400;
    canvas.height = 300;
    time.innerHTML = "Time: " + seconds;
    document.getElementById("time").style.display = "block";
    document.getElementById("h2").style.display = "none";
    document.getElementById("burst").style.display = "none";
    document.getElementById("select").style.display = "none";
    document.getElementById("divCanvas").style.display = "flex";
    document.getElementById("btnStats").style.display = "block ";
    document.getElementById("btnClose").style.display = "block";
    ctx.fillStyle = "green";
    mode = 4;
    script();
  }

  function normal() {
    interval = setInterval(count, 1000);
    interval2 = setInterval(betweenHits, 1000);
    stats = false;
    seconds = 2;
    canvas.width = 600;
    canvas.height = 450;
    time.innerHTML = "Time: " + seconds;
    document.getElementById("h2").style.display = "none";
    document.getElementById("time").style.display = "block";
    document.getElementById("burst").style.display = "none";
    document.getElementById("select").style.display = "none";
    document.getElementById("divCanvas").style.display = "flex";
    document.getElementById("btnStats").style.display = "block ";
    document.getElementById("btnClose").style.display = "block";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    mode = 2;
    script();
  }

  function hard() {
    interval = setInterval(count, 1000);
    interval2 = setInterval(betweenHits, 1000);
    seconds = 2;
    stats = false;
    canvas.width = 1000;
    canvas.height = 625;
    document.getElementById("time").style.marginTop = "-40px";
    time.innerHTML = "Time: " + seconds;
    document.getElementById("h2").style.display = "none";
    document.getElementById("time").style.display = "block";
    document.getElementById("select").style.display = "none";
    document.getElementById("burst").style.display = "none";
    document.getElementById("divCanvas").style.display = "flex";
    document.getElementById("btnStats").style.display = "block ";
    document.getElementById("btnClose").style.display = "block";
    document.getElementById("divCanvas").style.marginTop = "10px";
    ctx.fillStyle = "red";
    mode = 2;
    script();
  }

  function burst() {
    bmode = true;
    interval = setInterval(count, 1000);
    seconds = 10;
    canvas.width = 1000;
    canvas.height = 625;
    document.getElementById("time").style.marginTop = "-40px";
    time.innerHTML = "Time: " + seconds;
    document.getElementById("h2").style.display = "none";
    document.getElementById("time").style.display = "block";
    document.getElementById("select").style.display = "none";
    document.getElementById("burst").style.display = "none";
    document.getElementById("divCanvas").style.display = "flex";
    document.getElementById("btnStats").style.display = "block ";
    document.getElementById("btnClose").style.display = "block";
    document.getElementById("divCanvas").style.marginTop = "10px";
    ctx.fillStyle = "black";
    mode = 10;
    script();
  }

  function script() {
    box.x = Math.random() * (canvas.width - box.width);
    box.y = Math.random() * (canvas.height - box.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(box.x, box.y, box.width, box.height);
    if (canvas.width == 600) {
      ctx.strokeRect(box.x, box.y, box.width, box.height);
    }
  }

  canvas.addEventListener("click", function (e) {
    if (paused || seconds <= 0) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (
      mouseX >= box.x &&
      mouseX <= box.x + box.width &&
      mouseY >= box.y &&
      mouseY <= box.y + box.height &&
      seconds > 0
    ) {
      script();
      hit++;
      streak.innerHTML = "SCORE: " + hit;
      if (!bmode) {
        seconds = mode;
        time.innerHTML = "TIME: " + mode;
      }
    }
  });

  function closeStatsAndResume() {
    document.getElementById("stats").style.display = "none";
    paused = false;
    interval = setInterval(count, 1000);
    interval2 = setInterval(betweenHits, 1000);
    if (bmode == false) {
      stats = false;
    }
  }
  function resetGame() {
    tbh = 0;
    seconds = 0;
    seconds2 = 0;
    mode = undefined;
    clearInterval(interval);
    clearInterval(interval2);
    seconds2 = 0;
    streak.innerHTML = "";
    document.getElementById("pause").style.display = "none";
    document.getElementById("tbhBurst").innerHTML = "";
    document.getElementById("hitsBurst").innerHTML = "";
    document.getElementById("unlock").style.display = "none";
    document.getElementById("divCanvas").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("h2").style.display = "flex";
    document.getElementById("select").style.display = "flex";
    document.getElementById("divCanvas").style.marginTop = "70px";
    document.getElementById("time").style.marginTop = "0px";
    document.getElementById("menu").style.display = "none";
    document.getElementById("btnStats").style.display = "none";
    document.getElementById("btnClose").style.display = "none";
    document.getElementById('burstOver').style.display = "none";
    select.style.gap = "4px";

    if (burstUnlocked) {
      document.getElementById("burst").style.display = "block";
    }

    if (bmode) {
      document.getElementById("stats").style.display = "none";
      document.getElementById("burst").style.display = "block";
    }

    hit = 0;
    bmode = false;
    stats = false;
    paused = false;
  }
