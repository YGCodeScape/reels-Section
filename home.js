var storyData = [
    {
       profilePic: "https://i.pinimg.com/736x/e7/6f/86/e76f86a7889232e98e2c6533d11f1c43.jpg",
       story: "https://i.pinimg.com/736x/e7/6f/86/e76f86a7889232e98e2c6533d11f1c43.jpg",
       userName : "its_anu",
       seen: false
    },
    {
        profilePic: "https://i.pinimg.com/736x/7d/32/f9/7d32f9666082a3853f8f196c6c9ebb50.jpg",
        story: "https://i.pinimg.com/736x/30/cd/1d/30cd1d698bf59586a52a703327fb00a7.jpg",
        userName : "jasmine987",
        seen: false
    },
    {
        profilePic: "https://i.pinimg.com/736x/24/11/23/2411236492a3b72e153b91f7c60470ba.jpg",
        story: "https://i.pinimg.com/736x/4d/ce/8b/4dce8bfb3935de3275787b21226c5aaf.jpg",
        userName : "prachi_07",
        seen: false
    },
    {
        profilePic: "https://i.pinimg.com/736x/e8/f3/b1/e8f3b1da358079e1a9994039fc47cd54.jpg",
        story: "https://i.pinimg.com/736x/fb/18/56/fb1856dec6da0b54f291cc0a171cd4d3.jpg",
        userName : "ankita_23",
        seen: false
    },
    {
        profilePic: "https://i.pinimg.com/736x/4b/a2/a0/4ba2a0286fc49124472da74c7585b59f.jpg",
        story : "https://i.pinimg.com/736x/b9/17/4c/b9174ce6ec4f5f20ab3714ff19c2e4e1.jpg",
        userName : "arpita_anuj",
        seen: false
    },
    {
        profilePic: "https://i.pinimg.com/736x/cf/e9/b9/cfe9b9654bda36a6e91c23e4858075e8.jpg",
        story : "https://i.pinimg.com/736x/02/9e/55/029e559eb4cc68407dc4c975947d6235.jpg",
        userName : "emily_will2",
        seen: false
    },
    {
        profilePic: "https://i.pinimg.com/736x/4c/f1/07/4cf107ea24550ceffba739c1be657132.jpg",
        story : "https://i.pinimg.com/736x/d9/d8/c6/d9d8c67d96e15ab6a17442fc55024cc7.jpg",
        userName : "its_prachi",
        seen: false
    },
]

const headDiv = document.querySelector('.head');
const fullStory = document.querySelector(".full-screen-story")
const storyImg = document.querySelector(".story-img")
const storyUser = document.querySelector(".story-username")
const profileImg = document.querySelector(".profile-img")

const STORY_DURATION = 4000;
let storyTimer = null;
let progressTimer = null;

let isPaused = false;
let elapsedTime = 0;

function renderStories() {
    headDiv.innerHTML = storyData.map((story, index) => `
         <div class="story" data-index="${index}">
             <div class="profile-img">
                 <div class="story-ring ${story.seen ? "seen": ""}"></div>
                 <img src="${story.profilePic}" alt="user-profile">
             </div>
           <span>${story.userName}</span>
         </div>
    `)
    .join("");
}
renderStories();

headDiv.addEventListener("click", (e) => {
    const story = e.target.closest(".story");
    if (!story) return;

    const index = story.dataset.index;
    openStory(index);

})
// ------------------------------------------
function openStory(index) {
    storyData[index].seen = true;
    renderStories();
    
    fullStory.classList.add("active");
    storyImg.src = storyData[index].story;
    storyUser.innerText = storyData[index].userName;
    profileImg.src = storyData[index].profilePic;

    elapsedTime = 0;
    startStoryTimer();
}

// --------------------------------------

// START STORY TIMERS
function startStoryTimer() {
  const progress = document.querySelector(".story-bar span");
  let startTime = Date.now() - elapsedTime;

  progressTimer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    const percent = (elapsedTime / STORY_DURATION) * 100;
    progress.style.width = percent + "%";

    if (elapsedTime >= STORY_DURATION) {
      closeStory();
    }
  }, 100);
}

// close story
function closeStory() {
    clearTimeout(progressTimer);
    clearInterval(storyTimer);

    fullStory.classList.remove("active");
}
// --------------------------------------
// STORY STOP OR PLAY BY CLICK
fullStory.addEventListener("mousedown", pauseStory);
fullStory.addEventListener("touchstart", pauseStory);

fullStory.addEventListener("mouseup", resumeStory);
fullStory.addEventListener("touchend", resumeStory);

function pauseStory() {
  clearInterval(progressTimer);
  clearTimeout(storyTimer);
  isPaused = true;
}

function resumeStory() {
  if (!isPaused) return;
  isPaused = false;
  startStoryTimer();
}