let restrictedFoods = [];

// Fetch analysis from Flask API
async function fetchAnalysis() {
    try {
        let response = await fetch("http://127.0.0.1:5000/analyze");
        let data = await response.json();
        
        if (data.analysis) {
            restrictedFoods = extractRestrictedFoods(data.analysis);
            console.log("Restricted Foods:", restrictedFoods);
        }
    } catch (error) {
        console.error("Error fetching analysis:", error);
    }
}

// Extract restricted foods from AI analysis
function extractRestrictedFoods(text) {
    let words = text.match(/\b\w+\b/g); // Extract words
    let commonRestrictedFoods = ["sugar", "chocolate", "soda", "junk food", "cake", "ice cream"];
    
    return words ? words.filter(word => commonRestrictedFoods.includes(word.toLowerCase())) : [];
}

// Listen for search terms
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "search_query") {
        let query = message.query.toLowerCase();
        
        for (let food of restrictedFoods) {
            if (query.includes(food.toLowerCase())) {
                alert(`⚠️ Warning: You searched for '${food}', which is restricted based on your medical report.`);
                break;
            }
        }
    }
});

// Run analysis fetch when extension loads
fetchAnalysis();
