// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));


// Before / After Slider
document.querySelectorAll(".comparison").forEach((comparison) => {

    const after = comparison.querySelector(".after-img");
    const line = comparison.querySelector(".slider-line");
    const handle = comparison.querySelector(".slider-handle");

    let dragging = false;

    function updateSlider(x){

        const rect = comparison.getBoundingClientRect();

        let position = x - rect.left;

        position = Math.max(0, Math.min(position, rect.width));

        const percent = (position / rect.width) * 100;

        after.style.clipPath = `inset(0 ${100-percent}% 0 0)`;

        line.style.left = percent + "%";

        handle.style.left = percent + "%";
    }

    comparison.addEventListener("mousedown", (e) => {

    if (e.button !== 0) return;

    e.preventDefault();

    dragging = true;

    updateSlider(e.clientX);

});

    window.addEventListener("mouseup", () => dragging = false);

    window.addEventListener("mousemove",(e)=>{

        if(!dragging) return;

        updateSlider(e.clientX);

    });

    comparison.addEventListener("touchstart",()=>dragging=true);

    window.addEventListener("touchend",()=>dragging=false);

    window.addEventListener("touchmove",(e)=>{

        if(!dragging) return;

        updateSlider(e.touches[0].clientX);

    });

});