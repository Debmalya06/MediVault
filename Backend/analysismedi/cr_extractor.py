import pytesseract

# Set the Tesseract OCR path (Windows only, update the path)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Update this path!

def extract_text_from_image(image):
    """Extract text from an image using Tesseract OCR."""
    text = pytesseract.image_to_string(image)
    return text.strip() if text else "No text detected."