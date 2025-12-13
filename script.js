
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

//  CREATE REEL ELEMENT
function createReel(data) {
  const reelDiv = document.createElement("div");
  reelDiv.className = "reel";

  reelDiv.innerHTML = `
      <video src="${data.videoSrc}" muted loop autoplay></video>

      <div class="right-icons">
          <div class="icon-d">
              <i class="ri-heart-line" id="like-btn"></i>
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
              <i class="ri-more-2-line"></i></div>
          <div class="music-box"><img src="${data.musicImg}" /></div>
      </div>

      <div class="user-info">
          <div class="user">
              <div class="sec-profile-d">
                  <div class="story-circle"></div>
                  <img src="${data.profileImg}" />
              </div>

              <div class="used-music">
                  <h2>${data.username}</h2>
                  <span>music name</span>
              </div>

              <button class="follow-btn">Follow</button>
          </div>

          <p class="bio">${data.bio}</p>
      </div>
  `;

  return reelDiv;
}

//  AUTO-PLAY OBSERVER

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");

    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, { threshold: 0.7 });



//  INITIALIZE REELS

const reelsContainer = document.querySelector(".reels");
let currentReelIndex = 0;

// Load first 2 reels by default
function initReels() {
  loadNextReel();
  loadNextReel();
}
initReels();


//  LOAD NEXT REEL

function loadNextReel() {
  if (currentReelIndex >= reelsData.length) return;

  const newReel = createReel(reelsData[currentReelIndex]);
  reelsContainer.appendChild(newReel);

  observer.observe(newReel);

  currentReelIndex++;
}


// SCROLL TO LOAD MORE

reelsContainer.addEventListener("scroll", () => {
  const scrollPos = reelsContainer.scrollTop + reelsContainer.clientHeight;
  const scrollHeight = reelsContainer.scrollHeight;

  if (scrollPos >= scrollHeight - 50) {
    loadNextReel();
  }
});
