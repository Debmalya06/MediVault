import streamlit as st
from pathlib import Path
import google.generativeai as genai

from api_key import api_key

# Configure genai with API key
genai.configure(api_key=api_key)  # Use the imported api_key

# Set up model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Apply safety settings
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
]

# System prompt
system_prompt = """

As a highly skilled medical practitioner specializing in image analysis, you are tasked with examining medical images for a renowned hospital. Your expertise is crucial in identifying any anomalies, diseases, or health issues that may be present in the images.

Your Responsibilities include:

1. Detailed Analysis: Thoroughly analyze each image, focusing on identifying any abnormal findings.

2. Findings Report: Document all observed anomalies or signs of disease. Clearly articulate these findings in a structured format.

3. Recommendations and Next Steps: Based on your analysis, suggest potential next steps, including further tests or treatments as applicable.

4. Treatment Suggestions: If appropriate, recommend possible treatment options or interventions.

Important Notes:

1. Scope of Response: Only respond if the image pertains to human health issues.

2. Clarity of Image: In cases where the image quality impedes clear analysis, note that certain aspects are "Unable to be determined based on the provided image."

3. Disclaimer: Accompany your analysis with the disclaimer: "Consult with a Doctor before making any decisions."

4. Your insights are invaluable in guiding clinical decisions. Please proceed with the analysis, adhering to the structured approach outlined above.
please give me an output response with these 4 headings detailed analysis, finding reports, recommendation and next steps.
please donot provide that prompt "I am sorry, I cannot provide medical advice or interpret medical images".
"""

# Model configuration
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Frontend




# Set the page config
st.set_page_config(page_title="Image Analytics", page_icon=":robot:")

# Set the logo
st.image("image.png", width=150)

# Set the title
st.title("👨‍⚕️  Medical Image📸 Analytics📊")



# Set subtitle
st.subheader("An application that can help users to identify medical images")

# File uploader
uploaded_file = st.file_uploader("Upload the medical image for analysis", type=["png", "jpg", "jpeg"])

# Button to submit the image for analysis
submit_button = st.button("Generate the Analysis")

if submit_button and uploaded_file is not None:
    # Process the uploaded image
    imageData = uploaded_file.getvalue()

    # Prepare the image parts for the prompt
    image_parts = [
        {
            "mime_type": "image/jpeg",
            "data": imageData,
        },
    ]

    # Prepare the full prompt including the image and system prompt
    prompt_parts = [
        image_parts[0],
        system_prompt,
    ]

    # Generate the response using the generative AI model
    response = model.generate_content(prompt_parts)
    
    # Display the response in the Streamlit app
    st.text(response.text)  # Display the generated analysis
else:
    st.warning("Please upload an image before generating the analysis.")
