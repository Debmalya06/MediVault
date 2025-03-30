document.addEventListener("DOMContentLoaded", async () => {
    const resultElement = document.getElementById("result");
    const refreshButton = document.getElementById("refreshButton");

    try {
        let response = await fetch("http://127.0.0.1:5000/analyze");
        let data = await response.json();

        resultElement.innerText = data.analysis || "No analysis available.";
    } catch (error) {
        resultElement.innerText = "Error fetching analysis.";
    }

    refreshButton.addEventListener("click", () => {
        location.reload();
    });
});
