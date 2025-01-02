document.getElementById("learningForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const outputDiv = document.getElementById("output");
    // Collecting form data
    const formData = new FormData(this);
    let pathwayDetails = "<h2>Your Personalized Learning Pathway</h2><ul>";

    formData.forEach((value, key) => {
        pathwayDetails += `<li><strong>${key.replace(/([A-Z])/g, ' $1')}: </strong>${value}</li>`;
    });
    pathwayDetails += "</ul>";
    // Displaying the output
    outputDiv.innerHTML = pathwayDetails;
});
document.addEventListener("DOMContentLoaded", () => {
    const formSections = document.querySelectorAll(".form-section");
    const submitButton = document.querySelector("button.btn");
    let currentSectionIndex = 0;

    // Initially hide all sections except the first one
    formSections.forEach((section, index) => {
        if (index > 0) {
            section.style.display = "none";
        }
    });

    // Add fade-in animation style
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .fade-in {
            animation: fadeIn 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Function to show the next section
    const showNextSection = () => {
        if (currentSectionIndex < formSections.length - 1) {
            const nextSection = formSections[currentSectionIndex + 1];
            nextSection.style.display = "block";
            nextSection.classList.add("fade-in");
            currentSectionIndex++;
        } else {
            alert("You have completed all sections!");
        }
    };

    // Add event listener for form submission
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Validate current section inputs
        const currentSection = formSections[currentSectionIndex];
        const inputs = currentSection.querySelectorAll("input, textarea");
        let isValid = true;

        inputs.forEach((input) => {
            if (!input.checkValidity()) {
                isValid = false;
                input.reportValidity(); // Show native validation message
            }
        });

        // If valid, show the next section
        if (isValid) {
            showNextSection();
        }
    });
});
