//  REELS DATA
const reelsData = [
  {
    username: "userName1",
    profileImg: "https://i.pinimg.com/736x/d5/07/49/d50749f9c34b1ba48297e5a724577392.jpg",
    videoSrc: "./Assets/video01.mp4",
    likes: 40,
    comments: 20,
    shares: 11,
    bio: "hello this is text about this reel...",
    musicImg: "https://i.pinimg.com/736x/24/ed/15/24ed15bd7297c4e5dfdc05f9df3137fb.jpg"
  },
  {
    username: "anotherUser",
    profileImg: "https://i.pinimg.com/736x/f1/a1/38/f1a138717753b6af49c296b8f46fe397.jpg",
    videoSrc: "./Assets/video02.mp4",
    likes: 82,
    comments: 17,
    shares: 3,
    bio: "Second reel description...",
    musicImg: "https://i.pinimg.com/736x/24/ed/15/24ed15bd7297c4e5dfdc05f9df3137fb.jpg"
  },
  {
    username: "coolGuy",
    profileImg: "https://i.pinimg.com/736x/fc/77/06/fc77064d1dcaae8a1b00e2ba0c9eb3bf.jpg",
    videoSrc: "./Assets/video03.mp4",
    likes: 120,
    comments: 44,
    shares: 18,
    bio: "Aesthetic vibes reel...",
    musicImg: "https://i.pinimg.com/736x/24/ed/15/24ed15bd7297c4e5dfdc05f9df3137fb.jpg"
  },
  {
    username: "coolGuy",
    profileImg: "https://i.pinimg.com/736x/19/3a/c0/193ac0d5bde3fac49257f4e6ce85df14.jpg",
    videoSrc: "./Assets/video04.mp4",
    likes: 220, 
    comments: 64, 
    shares: 38, 
    bio: "Aesthetic vibes reel...", 
    musicImg: "https://i.pinimg.com/736x/24/ed/15/24ed15bd7297c4e5dfdc05f9df3137fb.jpg" 
  }  
];


//  CREATE REEL

function createReel(data) {
  const reel = document.createElement("div");
  reel.className = "reel";

  reel.innerHTML = `
    <div class ="sound-d"> <i class="ri-volume-up-fill"></i></div>
    <div class="progress-bar"> <span></span> </div>  
    <video src="${data.videoSrc}" muted loop></video>

    <div class="right-icons">
      <div class="icon-d like-div">
        <i class="ri-heart-line"></i>
        <span>${data.likes}</span>
      </div>
      <div class="icon-d">
        <i class="ri-chat-1-line"></i>
        <span>${data.comments}</span>
      </div>
      <div class="icon-d">
        <i class="ri-send-plane-fill"></i>
        <span>${data.shares}</span>
      </div>
      <div class="icon-d">
        <i class="ri-more-2-line"></i>
      </div>
      <div class="music-box">
        <img src="${data.musicImg}">
      </div>
    </div>

    <div class="user-info">
      <div class="user">
        <div class="sec-profile-d">
          <div class="story-circle"></div>
          <img src="${data.profileImg}">
        </div>
        <div class="used-music">
          <h2>${data.username}</h2>
          <span>music name</span>
        </div>
        <button class="follow-btn">Follow</button>
      </div>
      <p class="bio">${data.bio}</p>
    </div>

    <div class="reel-like-d">
      <i class="ri-heart-fill"></i>
    </div>
  `;

  setupLikeSystem(reel);
  observer.observe(reel);

  return reel;
}


//   AUTO PLAY OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");
    entry.isIntersecting ? video.play() : video.pause();
  });
}, { threshold: 0.7 });



//  LOAD REELS ON SCROLL
const reelsContainer = document.querySelector(".reels");
let index = 0;

function loadNextReel() {
  if (index >= reelsData.length) return;
  const reel = createReel(reelsData[index]);
  reelsContainer.appendChild(reel);
  index++;
}

// initial reels
loadNextReel();
loadNextReel();

// infinite scroll
reelsContainer.addEventListener("scroll", () => {
  if (
    reelsContainer.scrollTop + reelsContainer.clientHeight >=
    reelsContainer.scrollHeight - 50
  ) {
    loadNextReel();
  }
});

//   LIKE + DOUBLE TAP + SOUND SYSTEM --------------------------
//   LIKE + DOUBLE TAP + SOUND SYSTEM --------------------------
function setupLikeSystem(reel) {
  const video = reel.querySelector("video");
  const soundWrap = reel.querySelector(".sound-d");
  const soundIcon = soundWrap.querySelector("i");

  const bigHeart = reel.querySelector(".reel-like-d");
  const likeDiv = reel.querySelector(".like-div");
  const likeIcon = likeDiv.querySelector("i");
  const likeCount = likeDiv.querySelector("span");

  const progress = reel.querySelector(".progress-bar span");

  let liked = false;
  let lastTap = 0;
  let singleTapTimer = null;

  let pressTimer = null;
  let isLongPress = false;

  video.muted = true; // default muted

  /*********************************
    TAP SYSTEM (SINGLE = SOUND, DOUBLE = LIKE)
  *********************************/
  video.addEventListener("click", () => {
    const now = Date.now();

    if (now - lastTap < 300) {
      // DOUBLE TAP ❤️
      clearTimeout(singleTapTimer);
      likeReel();
    } else {
      // SINGLE TAP 🔊
      singleTapTimer = setTimeout(toggleSound, 250);
    }

    lastTap = now;
  });

  /*********************************
    SOUND TOGGLE
  *********************************/
  function toggleSound() {
    video.muted = !video.muted;

    soundIcon.className = video.muted
      ? "ri-volume-mute-fill"
      : "ri-volume-up-fill";

    soundWrap.classList.add("active");

    setTimeout(() => {
      soundWrap.classList.remove("active");
    }, 3000);
  }

  /*********************************
    LIKE SYSTEM
  *********************************/
  function likeReel() {
    bigHeart.classList.add("show");
    setTimeout(() => bigHeart.classList.remove("show"), 400);

    if (!liked) toggleLike();
  }

  function toggleLike() {
    let count = parseInt(likeCount.innerText);
    liked = !liked;

    if (liked) {
      likeIcon.className = "ri-heart-fill";
      likeIcon.style.color = "red";
      likeCount.innerText = count + 1;
    } else {
      likeIcon.className = "ri-heart-line";
      likeIcon.style.color = "#fff";
      likeCount.innerText = count - 1;
    }
  }

  likeDiv.addEventListener("click", toggleLike);


  /*********************************
    VIDEO PROGRESS BAR
  *********************************/
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + "%";
  });

  video.addEventListener("ended", () => {
    progress.style.width = "0%";
  });
}
