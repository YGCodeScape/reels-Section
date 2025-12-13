/*********************************
  1. REELS DATA
*********************************/
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


/*********************************
  2. CREATE REEL
*********************************/
function createReel(data) {
  const reel = document.createElement("div");
  reel.className = "reel";

  reel.innerHTML = `
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


/*********************************
  3. AUTO PLAY OBSERVER
*********************************/
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");
    entry.isIntersecting ? video.play() : video.pause();
  });
}, { threshold: 0.7 });

  // LIKE + DOUBLE TAP SYSTEM

function setupLikeSystem(reel) {
  const video = reel.querySelector("video");
  const bigHeart = reel.querySelector(".reel-like-d");
  const likeDiv = reel.querySelector(".like-div");
  const likeIcon = likeDiv.querySelector("i");
  const likeCount = likeDiv.querySelector("span");

  let liked = false;
  let lastTap = 0;
  let pressTimer = null;
  let isLongPress = false;

  // Double tap on video
  video.addEventListener("click", () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      likeReel();
    }
    lastTap = now;
  });

  // Small like button
  likeDiv.addEventListener("click", () => {
    toggleLike();
  });

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

 //  LONG PRESS TO PAUSE
  video.addEventListener("mousedown", startPress);
  video.addEventListener("touchstart", startPress);

  video.addEventListener("mouseup", endPress);
  video.addEventListener("mouseleave", endPress);
  video.addEventListener("touchend", endPress);

  function startPress() {
    isLongPress = false;
    pressTimer = setTimeout(() => {
      isLongPress = true;
      video.pause();
    }, 350); // press duration
  }
function endPress() {
    clearTimeout(pressTimer);
    if (isLongPress) {
      video.play();
    }
  }
}


/*********************************
  5. LOAD REELS ON SCROLL
*********************************/
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
