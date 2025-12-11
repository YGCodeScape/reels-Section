const followBtns = document.querySelectorAll(".follow-btn");

followBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.innerText = btn.classList.contains("active") ? "Followed" : "Follow";
    });
});