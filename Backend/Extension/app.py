from flask import Flask, jsonify
import mysql.connector
import pytesseract
import requests
import google.generativeai as genai
import cv2
import numpy as np

# Configure Gemini API
genai.configure(api_key="AIzaSyDGlOKC1kb2snFirVNi58sqqM3FjwkWcrI")  # Replace with actual key

# Configure MySQL (only to fetch image URLs, not store anything)
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Poiu0987#",
    "database": "aiMedical"
}

app = Flask(__name__)

# Fetch report images from MySQL (no storing)
def fetch_image_urls():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    query = "SELECT id, file_url FROM report"
    cursor.execute(query)
    
    reports = [{"id": row[0], "file_url": row[1]} for row in cursor.fetchall()]
    
    cursor.close()
    conn.close()
    
    return reports

# Extract text from image
def extract_text(image_url):
    response = requests.get(image_url)
    image = np.frombuffer(response.content, np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return pytesseract.image_to_string(image).strip()

# Analyze medical report
def analyze_medical_report(text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Analyze this medical report:\n{text}\nList any health risks and food restrictions."
    
    response = model.generate_content([prompt])
    return response.text if response else "Could not analyze."

# API to fetch and analyze the latest report
@app.route("/analyze", methods=["GET"])
def analyze_reports():
    reports = fetch_image_urls()
    if not reports:
        return jsonify({"error": "No reports found"}), 404

    latest_report = reports[-1]  # Take the last report
    text = extract_text(latest_report["file_url"])
    analysis = analyze_medical_report(text)

    return jsonify({"analysis": analysis})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
