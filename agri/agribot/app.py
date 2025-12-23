from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health', methods=['GET'])
def health():
    has_key = bool(os.environ.get('GROQ_API_KEY', '').strip())
    return jsonify({ 'ok': True, 'hasKey': has_key })

@app.route('/chat', methods=['POST'])
def chat():
    user_input = (request.json or {}).get("message", "")
    api_key = os.environ.get("GROQ_API_KEY", "").strip()
    model = (request.json or {}).get("model", "llama3-8b-8192")

    if not api_key:
        return jsonify({
            "ok": False,
            "error": "GROQ_API_KEY not set",
            "message": "Set GROQ_API_KEY in environment to enable chat",
        }), 400

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": user_input}
        ]
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        reply = data.get('choices', [{}])[0].get('message', {}).get('content', '')
        return jsonify({"response": reply, "ok": True})
    except requests.RequestException as e:
        return jsonify({
            "response": "Error contacting Groq API",
            "error": str(e),
            "ok": False
        }), 502

if __name__ == '__main__':
    port = int(os.environ.get('PORT', '5001'))
    host = os.environ.get('HOST', '127.0.0.1')
    app.run(debug=True, host=host, port=port)
