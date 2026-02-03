from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import googlemaps

app = Flask(__name__)
CORS(app)

gmaps = googlemaps.Client(key='AIzaSyAIvOQ5TMxm9IdWuZeipj4OyASsOyiKLTo')  # Use your valid API key

@app.route('/')
def home():
    return render_template('index.html')  # Render the frontend HTML

@app.route('/nearby-pest-shops', methods=['POST'])
def get_nearby_pest_shops():
    try:
        location = request.json
        lat = location.get('lat')
        lng = location.get('lng')
        if not lat or not lng:
            return jsonify({"error": "Missing lat/lng"}), 400

        places = gmaps.places_nearby(
            location=(lat, lng),
            radius=2000,
            keyword='pest control'
        )
        return jsonify(places.get('results', []))

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
