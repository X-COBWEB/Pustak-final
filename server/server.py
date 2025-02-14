import os
import json
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

# Azure Vision Setup
endpoint = "https://magnum.cognitiveservices.azure.com/"
key = "4ideuxnCLcWS3Ysb7qmjZI6DJkkZme3HF2KxQ1aFZUd6Rv269EADJQQJ99BAACqBBLyXJ3w3AAAFACOGW4fo"

# Gemini Setup
genai.configure(api_key='AIzaSyAF8G1xWsUlsTmqgtJfqNO1KX6alwq7i1w')
model = genai.GenerativeModel('gemini-1.5-flash')

def analyze_book_cover(image_url):
    client = ImageAnalysisClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(key)
    )
    
    result = client.analyze_from_url(
        image_url=image_url,
        visual_features=[VisualFeatures.CAPTION, VisualFeatures.READ],
    )
    
    # Extract all text from the image
    text_content = ""
    if result.read:
        for block in result.read.blocks:
            for line in block.lines:
                text_content += line.text + " "
    
    return text_content

def process_with_gemini(text_content):
    prompt = f"""
    Analyze the following book cover text and extract information. Provide the output as **valid JSON only**, without any additional text, formatting, or explanations. The JSON must strictly follow this structure:

    {{
    "is_valid_book": <is the book a valid book that exists?>,
    "title": "<book title>",
    "author": "<author name>",
    "genre": "<best guess for genre based on text and write about 3 to 5 related genres>",
    "rating": <best estimate for rating out of 5 (e.g., 4.5)>,
    "summary": "<brief description of the book that should be precise or if it is not then give the most probable educated guess and mention that there is no more data on this>",
    "price": <avg or common price of the book + type of currency, if available>
    }}

    If the exact genre or rating cannot be determined from the text, make an educated guess based on context or similar works. Always include all fields in the output.

    Book cover text:
    {text_content}

    Ensure the response is valid JSON and includes no additional comments, code blocks, or formatting.
    """

    response = model.generate_content(prompt)
    raw_text = response.text.strip()
    print(f"Raw response from Gemini: {raw_text}")
    
    # Remove code block markers if present
    if raw_text.startswith("```json") and raw_text.endswith("```"):
        raw_text = raw_text[7:-3].strip()  # Remove "```json" and "```"

    try:
        # Attempt to parse the cleaned response as JSON
        return json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse response as JSON: {e}. Response text: {raw_text}")

@app.route('/analyze-book', methods=['POST'])
def analyze_book():
    if request.content_type != 'application/json':
        return jsonify({'error': 'Unsupported Media Type. Content-Type must be application/json'}), 415

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Empty JSON payload'}), 400
        
        image_url = data.get('image_url')
        if not image_url:
            return jsonify({'error': 'No image URL provided'}), 400

        # Get text from book cover
        cover_text = analyze_book_cover(image_url)
        
        # Process with Gemini
        book_info = process_with_gemini(cover_text)
       
        # Return a properly formatted JSON response
        return jsonify(book_info)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/recommend-books', methods=['POST'])
# def recommend_books():
#     try:
#         data = request.get_json()
#         user_query = data.get('query', "")

#         if not user_query:
#             return jsonify({"error": "No query provided"}), 400

#         # Get recommendations based on the user query
#         recommendations = get_book_recommendations(user_query)

#         # If there is an error in fetching recommendations, return it
#         if "error" in recommendations:
#             return jsonify(recommendations), 404

#         return jsonify(recommendations)

#     except Exception as e:
#         print(f"Error: {str(e)}")  # Add logging for the error
#         return jsonify({'error': str(e)}), 500

@app.route('/gemini-chatbot', methods=['POST'])
def gemini_chatbot():
    try:
        data = request.get_json()
        user_query = data.get('query', "")

        if not user_query:
            return jsonify({"error": "No query provided"}), 400

        prompt = f"""
        You are a book recommendation chatbot. Your are allowed to do some preety basic greetings and conversations. but your main task is, based on the user's query, recommend books that are currently present in our database. The recommendations should be based on the user's nature and liking as provided in the query.

        User query: {user_query}

        Provide the recommendations in the following JSON format:
        {{
            "recommendations": [
                {{
                    "title": "<book title>",
                    "author": "<author name>",
                    "genre": "<book genre>",
                    "summary": "<brief summary of the book>"
                }},
                ...
            ]
        }}
        dont write anything more than you are told to write. the user might make common typos so make a educated guess on that.
        dont ask for any more detail response from the user than once. if you need more information, make an educated guess based on the query.
        always send any conversational message in the top of the reply not in the end .Also be very friendly and chat with the user and reply very precise and shortly. try to get little more information from the user to provide better recommendations only once. 
        """

        response = model.generate_content(prompt)
        raw_text = response.text.strip()
        print(f"Raw response from Gemini: {raw_text}")

        # Split the response into conversational text and JSON data
        conversation_text = raw_text.split('```json')[0].strip()
        json_data = raw_text.split('```json')[1].strip('```').strip() if '```json' in raw_text else '{}'

        try:
            # Attempt to parse the cleaned JSON data
            recommendations = json.loads(json_data)
            return jsonify({
                'conversation': conversation_text,
                'recommendations': recommendations
            })
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse response as JSON: {e}. Response text: {json_data}")

    except Exception as e:
        print(f"Error: {str(e)}")  # Add logging for the error
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)