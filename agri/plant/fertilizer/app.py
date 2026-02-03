from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load model & encoders
model = pickle.load(open("fertilizer_model.pkl", "rb"))
soil_encoder = pickle.load(open("soil_encoder.pkl", "rb"))
crop_encoder = pickle.load(open("crop_encoder.pkl", "rb"))
fert_encoder = pickle.load(open("fert_encoder.pkl", "rb"))

@app.route("/", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        try:
            temp = float(request.form["temp"])
            humid = float(request.form["humid"])
            mois = float(request.form["mois"])
            soil = int(request.form["soil"])
            crop = int(request.form["crop"])
            nitro = float(request.form["nitro"])
            pota = float(request.form["pota"])
            phos = float(request.form["phos"])

            features = np.array([[temp, humid, mois, soil, crop, nitro, pota, phos]])
            pred = model.predict(features)[0]
            result = fert_encoder.inverse_transform([pred])[0]

            return render_template("index.html", x=result)

        except Exception as e:
            return render_template("index.html", x=f"Error: {e}")

    return render_template("index.html", x="")

if __name__ == "__main__":
    app.run(debug=True)
