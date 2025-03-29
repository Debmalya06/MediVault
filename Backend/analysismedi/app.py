import streamlit as st
from PIL import Image
from cr_extractor import extract_text_from_image  # Corrected import
from gemini_analyzer import analyze_medical_report

# Streamlit App UI
st.title("🩺 Medical Report Analyzer")
st.write("Upload a medical report image (e.g., sugar, blood pressure, diabetes, etc.), and get health suggestions.")

# File uploader
uploaded_file = st.file_uploader("Upload Image", type=["png", "jpg", "jpeg"])

if uploaded_file:
    # Display uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Report", use_column_width=True)

    # Extract text using OCR
    with st.spinner("Extracting text..."):
        extracted_text = extract_text_from_image(image)
        st.subheader("Extracted Text:")
        st.write(extracted_text)

    # Analyze text with Gemini AI
    if extracted_text:
        with st.spinner("Analyzing report..."):
            analysis_result = analyze_medical_report(extracted_text)
            st.subheader("Health Suggestions:")
            st.write(analysis_result)