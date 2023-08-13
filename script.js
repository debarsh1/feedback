// JavaScript code for fetching and displaying feedback
const submitBtn = document.getElementById("submitBtn");
const feedbackInput = document.getElementById("feedbackInput");
const feedbackDisplay = document.getElementById("feedbackDisplay");

submitBtn.addEventListener("click", () => {
    const feedbackText = feedbackInput.value;
    if (feedbackText.trim() !== "") {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "post_feedback.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                fetchAndDisplayFeedback(); // Fetch and display feedback after submitting
                feedbackInput.value = ""; // Clear the input
            }
        };
        xhr.send("feedback=" + encodeURIComponent(feedbackText));
    }
});

// Function to fetch and display feedback
function fetchAndDisplayFeedback() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_feedback.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            feedbackDisplay.innerHTML = ""; // Clear existing content

            response.forEach(feedbackItem => {
                const feedbackElement = document.createElement("div");
                feedbackElement.innerHTML = `
                    <p><strong>Submitted at:</strong> ${feedbackItem.timestamp}</p>
                    <p>${feedbackItem.text}</p>
                    <hr>
                `;
                feedbackDisplay.appendChild(feedbackElement);
            });
        }
    };
    xhr.send();
}

// Fetch and display feedback when the page loads
fetchAndDisplayFeedback();
