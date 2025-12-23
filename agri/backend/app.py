from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open('crop_model.pkl', 'rb'))
label_encoder = pickle.load(open('label_encoder.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html', prediction_text='')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        N = float(request.form['N'])
        P = float(request.form['P'])
        K = float(request.form['K'])
        temperature = float(request.form['temperature'])
        humidity = float(request.form['humidity'])
        ph = float(request.form['ph'])
        rainfall = float(request.form['rainfall'])

        input_features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        prediction = model.predict(input_features)
        label = label_encoder.inverse_transform(prediction)[0]

        return render_template('index.html', prediction_text=f"✅ Recommended Crop: {label}")
    except Exception as e:
        return render_template('index.html', prediction_text=f"❌ Error: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)
