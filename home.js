var storyData = [
    {
       profilePic: "https://i.pinimg.com/736x/e7/6f/86/e76f86a7889232e98e2c6533d11f1c43.jpg",
       story: "https://i.pinimg.com/736x/e7/6f/86/e76f86a7889232e98e2c6533d11f1c43.jpg",
       userName : "its_anu"
    },
    {
        profilePic: "https://i.pinimg.com/736x/7d/32/f9/7d32f9666082a3853f8f196c6c9ebb50.jpg",
        story: "https://i.pinimg.com/736x/30/cd/1d/30cd1d698bf59586a52a703327fb00a7.jpg",
        userName : "jasmine987"
    },
    {
        profilePic: "https://i.pinimg.com/736x/24/11/23/2411236492a3b72e153b91f7c60470ba.jpg",
        story: "https://i.pinimg.com/736x/4d/ce/8b/4dce8bfb3935de3275787b21226c5aaf.jpg",
        userName : "prachi_07"
    },
    {
        profilePic: "https://i.pinimg.com/736x/e8/f3/b1/e8f3b1da358079e1a9994039fc47cd54.jpg",
        story: "https://i.pinimg.com/736x/fb/18/56/fb1856dec6da0b54f291cc0a171cd4d3.jpg",
        userName : "ankita_23"
    },
    {
        profilePic: "https://i.pinimg.com/736x/4b/a2/a0/4ba2a0286fc49124472da74c7585b59f.jpg",
        story : "https://i.pinimg.com/736x/b9/17/4c/b9174ce6ec4f5f20ab3714ff19c2e4e1.jpg",
        userName : "arpita_anuj"
    },
    {
        profilePic: "https://i.pinimg.com/736x/cf/e9/b9/cfe9b9654bda36a6e91c23e4858075e8.jpg",
        story : "https://i.pinimg.com/736x/02/9e/55/029e559eb4cc68407dc4c975947d6235.jpg",
        userName : "hemlata02"
    },
    {
        profilePic: "https://i.pinimg.com/736x/4c/f1/07/4cf107ea24550ceffba739c1be657132.jpg",
        story : "https://i.pinimg.com/736x/d9/d8/c6/d9d8c67d96e15ab6a17442fc55024cc7.jpg",
        userName : "its_prachi"
    },
]

var headDiv = document.querySelector('.head');
var fullStory = document.querySelector(".full-screen-story")
var storyImg = document.querySelector(".story-img")
var storyUser = document.querySelector(".story-username")
var profileImg = document.querySelector(".profile-img")

var clutter = ''

storyData.forEach(function(elem, index) {
    clutter += `
         <div class="story">
            <div class="profile-img">
                <div class="story-ring"></div>
                <img id ="${index}" src="${elem.profilePic}" alt="">
            </div>
            <span>${elem.userName}</span>
         </div>
     `
})

headDiv.innerHTML = clutter;

headDiv.addEventListener("click", function(para) {
    fullStory.style.display = 'flex';
    storyImg.setAttribute("src", `${storyData[para.target.id].story}`)
    storyUser.innerText = `${storyData[para.target.id].userName}`
    profileImg.setAttribute("src", `${storyData[para.target.id].profilePic}`)

    setTimeout(function() {
        fullStory.style.display = 'none'
    }, 3000)
})