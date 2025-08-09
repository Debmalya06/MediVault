import google.generativeai as genai

# Configure Google Gemini API
API_KEY = "API_Key"  # Replace with your Gemini API key
genai.configure(api_key=API_KEY)

def analyze_medical_report(text):
    """Analyze extracted text using Gemini AI."""
    model = genai.GenerativeModel("gemini-1.5-flash")  # Using Gemini 1.5 Flash for faster response

    response = model.generate_content(
        [f"Analyze the following medical report and provide health suggestions:\n\n{text}"]
    )

    return response.text if response else "Could not analyze the report."
