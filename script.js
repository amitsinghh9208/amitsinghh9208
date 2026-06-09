// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
};

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    // Typing animation
    var typed = new Typed("#typing", {
        strings: [
            "Software Professional",
            "Lead QA Analyst",
            "Aspiring Architect"
        ],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    console.log("Portfolio loaded ✅");

    // Resume download tracking
    const resumeBtn = document.getElementById("downloadCV");

    if (resumeBtn) {
        resumeBtn.addEventListener("click", function () {
            console.log("Resume download started ✅");
        });
    }

    // Contact form
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("service_t92ua1s", "template_pbtfazg", this)
            .then(function () {
                document.getElementById("status").innerText =
                    "Message sent successfully ✅";
            }, function (error) {
                document.getElementById("status").innerText =
                    "Failed to send ❌";
            });
    });

});
