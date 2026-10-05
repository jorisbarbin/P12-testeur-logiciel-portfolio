// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && menuToggle.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menuToggle).hide();
            }
        });
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    function setActiveLink(id) {
        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            );
        });
    }

    function handleScroll() {
        const scrollPosition = window.scrollY + 140;

        let currentSection = "home";

        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 10;

        if (atBottom) {
            currentSection = "contact";
        }

        setActiveLink(currentSection);
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();
}

updateActiveNav();

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.title}" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" alt="${item.title}" style="width:100%" />
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${item.text}</p>
                            <div class="portfolio-footer">
                            <div class="portfolio-tags">
                                ${(item.tags || [])
                                    .map((tag) => `<span class="portfolio-tag">${tag}</span>`)
                                    .join("")}
                            </div>
                        <div class="text-center">
                            <a href="${item.link}"
                            class="portfolio-btn"
                            target="_blank"
                            rel="noopener noreferrer">
                                <i class="fa-brands fa-github"></i>
                                Voir sur GitHub
                            </a>
                        </div>
                    </div>
                </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
