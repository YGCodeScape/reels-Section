const followBtns = document.querySelectorAll(".follow-btn");
const likeIcon = document.querySelectorAll("#like-btn")

function followLogic() {
    followBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.innerText = btn.classList.contains("active") ? "Followed" : "Follow";
    });
});

likeIcon.forEach(like => {
    like.addEventListener("click",() => {
        console.log("liked");
    })
})
}
followLogic()

