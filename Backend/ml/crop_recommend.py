import sys, json, os
import numpy as np

def respond(obj):
    print(json.dumps(obj, ensure_ascii=False))

def main():
    try:
        data = json.load(sys.stdin)
        N = float(data.get('N', 0))
        P = float(data.get('P', 0))
        K = float(data.get('K', 0))
        temperature = float(data.get('temperature', 0))
        humidity = float(data.get('humidity', 0))
        ph = float(data.get('ph', 7))
        rainfall = float(data.get('rainfall', 0))

        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'agri', 'backend'))
        model_path = os.path.join(base_dir, 'crop_model.pkl')
        le_path = os.path.join(base_dir, 'label_encoder.pkl')

        if os.path.exists(model_path) and os.path.exists(le_path):
            import pickle
            model = pickle.load(open(model_path, 'rb'))
            le = pickle.load(open(le_path, 'rb'))
            X = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            # Try proba for top-k
            crops = []
            if hasattr(model, 'predict_proba'):
                proba = model.predict_proba(X)[0]
                top_idx = np.argsort(proba)[::-1][:3]
                for i in top_idx:
                    crops.append({
                        'name': str(le.inverse_transform([i])[0]),
                        'confidence': round(float(proba[i]) * 100, 2)
                    })
            else:
                pred = model.predict(X)
                label = le.inverse_transform(pred)[0]
                crops.append({'name': str(label), 'confidence': 100.0})

            respond({
                'crops': crops,
                'meta': {'source': 'model', 'ok': True}
            })
            return

        # Fallback simple heuristic if model files missing
        fallback = [
            {'name': 'Wheat', 'confidence': 40.0},
            {'name': 'Rice', 'confidence': 35.0},
            {'name': 'Maize', 'confidence': 25.0},
        ]
        respond({ 'crops': fallback, 'meta': {'source': 'fallback', 'ok': True} })
    except Exception as e:
        respond({ 'error': str(e), 'ok': False })

if __name__ == '__main__':
    main()
