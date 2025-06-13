// Intro Section javascript:-
document.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector('.counter');
  const typeText = document.querySelector('.type-text');
  const intro = document.querySelector('.intro');
  const main = document.querySelector('.main-content');

  // Just set the text directly
  typeText.textContent = "Loading Portfolio...";

  let percent = 0;

  // Counter effect
  const countInterval = setInterval(() => {
    counter.textContent = `${percent}%`;
    percent++;
    if (percent > 100) {
      clearInterval(countInterval);
    }
  }, 30); // 100 x 30ms = 3s

  // Transition to main content after 4s
  setTimeout(() => {
    intro.style.display = 'none';
    // main.classList.add('show');
    document.body.style.overflow = 'auto';
  }, 4000);
});

// --------------------------------------------------
// Scroll Navigation javascript:-

 const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 4) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
// ----------------------------------
// Main content javascript:-

const hoverSign = document.querySelector(".hover-sign");

// Sidebar elements
const sidebar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const close = document.querySelector('.close-icon');


window.addEventListener('DOMContentLoaded', function () {
  const videoList = [
    document.getElementById('projectVideo1'),
    document.getElementById('projectVideo2'),
    document.getElementById('projectVideo3')
  ];

  videoList.forEach(function(video) {
    if (video) {
      video.addEventListener('mouseover', function () {
        video.play();
        hoverSign.classList.add("active")
      });
      video.addEventListener('mouseout', function () {
        video.pause();
        hoverSign.classList.remove("active")
      });
    }
  });
});

// Sidebar elements
menu.addEventListener("click", function(){
  sidebar.classList.remove("close-sidebar")
  sidebar.classList.add("open-sidebar")
})

close.addEventListener("click", function(){
  sidebar.classList.remove("open-sidebar")
  sidebar.classList.add("close-sidebar")
}
)


// ------------------------------------
