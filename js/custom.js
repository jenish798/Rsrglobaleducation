// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
}

    // Show/hide the Scroll to Top button when scrolling
    window.onscroll = function() {
        let scrollToTopBtn = document.getElementById("scrollToTopBtn");
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // Function to smoothly scroll to the top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

// Visa data changing

const visaData = [
    {
        title: "F-1 Visa (Academic Students)",
        content: "Work Options: F-1 visa holders are eligible for on-campus work (up to 20 hours per week during the school term and full-time during breaks), and Optional Practical Training (OPT) or Curricular Practical Training (CPT) for work related to their field of study.",
        image: "images/studydestination/usa/img-2.webp"
    },
    {
        title: "J-1 Visa (Exchange Visitor Program)",
        content: "Purpose: This visa is for students participating in exchange programs sponsored by the U.S. government, universities, or private organizations. It is often used for students in short-term study programs, research scholars, or interns.",
        image: "images/studydestination/usa/img-3.webp"
    },
    {
        title: "M-1 Visa (Vocational Students)",
        content: "Purpose: This visa is for students attending non-academic or vocational programs in the U.S. (e.g., technical schools or specialized training).",
        image: "images/studydestination/usa/img-4.webp"
    }
];

let currentIndex = 0;
let interval = setInterval(autoChange, 5000);

function changeContent(index) {
    currentIndex = index;
    updateContent();
    resetTimer();
}

function updateContent() {
    const visaContent = document.getElementById("visaContent");
    const visaImage = document.getElementById("visaImage");

    visaContent.style.opacity = 0;
    setTimeout(() => {
        visaContent.innerHTML = `<h3>${visaData[currentIndex].title}</h3><p>${visaData[currentIndex].content}</p>`;
        visaImage.src = visaData[currentIndex].image;
        visaContent.style.opacity = 1;
    }, 500);
}

function autoChange() {
    currentIndex = (currentIndex + 1) % visaData.length;
    updateContent();
}

function resetTimer() {
    clearInterval(interval);
    interval = setInterval(autoChange, 5000);
}

$(document).ready(function() {
    $('#welcomeModal').modal('show');
  });

  // Function to smoothly scroll uk jobs
  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("ukjobsSlider");
    let isScrolling = false;

    function scrollLeft() {
        if (isScrolling) return;
        isScrolling = true;
        slider.scrollBy({ left: -300, behavior: 'smooth' });

        setTimeout(() => {
            if (slider.scrollLeft <= 0) {
                slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
            }
            isScrolling = false;
        }, 500); // Wait for transition to complete
    }

    function scrollRight() {
        if (isScrolling) return;
        isScrolling = true;
        slider.scrollBy({ left: 300, behavior: 'smooth' });

        setTimeout(() => {
            if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                slider.scrollLeft = 0;
            }
            isScrolling = false;
        }, 500);
    }

    // Auto-scroll function for infinite loop
    function autoScroll() {
        scrollRight();
    }

    // Set interval for auto-scroll
    let autoScrollInterval = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds

    // Pause auto-scroll on hover
    slider.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    slider.addEventListener("mouseleave", () => autoScrollInterval = setInterval(autoScroll, 3000));

    // Attach buttons to scroll left & right
    document.querySelector(".ukjobs-btn-left").addEventListener("click", scrollLeft);
    document.querySelector(".ukjobs-btn-right").addEventListener("click", scrollRight);
});
