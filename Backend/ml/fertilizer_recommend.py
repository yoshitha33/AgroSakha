import sys, json, os
import numpy as np

def respond(obj):
    print(json.dumps(obj, ensure_ascii=False))

def main():
    try:
        data = json.load(sys.stdin)
        temp = float(data.get('temp', 0))
        humid = float(data.get('humid', 0))
        mois = float(data.get('mois', 0))
        soil_label = data.get('soil', '')
        crop_label = data.get('crop', '')
        nitro = float(data.get('nitro', 0))
        pota = float(data.get('pota', 0))
        phos = float(data.get('phos', 0))

        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'agri', 'plant', 'fertilizer'))
        model_path = os.path.join(base_dir, 'fertilizer_model.pkl')
        soil_enc_path = os.path.join(base_dir, 'soil_encoder.pkl')
        crop_enc_path = os.path.join(base_dir, 'crop_encoder.pkl')
        fert_enc_path = os.path.join(base_dir, 'fert_encoder.pkl')

        # Heuristic recommendations based on crop and conditions
        fert_map = {
            'rice': 'NPK 17-17-17',
            'wheat': 'NPK 20-10-10',
            'maize': 'NPK 18-18-18',
            'cotton': 'NPK 18-18-6',
            'sugarcane': 'NPK 6-24-24',
            'pulses': 'NPK 20-40-20',
            'vegetables': 'NPK 20-20-20',
            'fruits': 'NPK 10-52-10',
        }

        if all(os.path.exists(p) for p in [model_path, soil_enc_path, crop_enc_path, fert_enc_path]):
            try:
                import pickle
                import warnings
                warnings.filterwarnings('ignore')

                model = pickle.load(open(model_path, 'rb'))
                soil_enc = pickle.load(open(soil_enc_path, 'rb'))
                crop_enc = pickle.load(open(crop_enc_path, 'rb'))
                fert_enc = pickle.load(open(fert_enc_path, 'rb'))

                # Handle soil encoding
                if isinstance(soil_label, str):
                    soil_classes = list(soil_enc.classes_)
                    soil = soil_classes.index(soil_label) if soil_label in soil_classes else 0
                else:
                    soil = int(soil_label)

                # Handle crop encoding
                if isinstance(crop_label, str):
                    crop_classes = list(crop_enc.classes_)
                    crop = crop_classes.index(crop_label) if crop_label in crop_classes else 0
                else:
                    crop = int(crop_label)

                try:
                    X = np.array([[temp, humid, mois, soil, crop, nitro, pota, phos]])
                    pred_idx = int(model.predict(X)[0])
                    fert_label = str(fert_enc.inverse_transform([pred_idx])[0])

                    respond({
                        'fertilizer': fert_label,
                        'details': 'Model-based fertilizer recommendation',
                        'tips': ['Apply in early morning or late evening', 'Ensure proper soil moisture before application'],
                        'ok': True
                    })
                    return
                except Exception as e:
                    # Model predict failed, fall back to heuristic
                    pass

            except Exception as e:
                pass  # Fall through to heuristic

        # Heuristic fallback
        crop_key = crop_label.lower() if isinstance(crop_label, str) else 'wheat'
        fert = fert_map.get(crop_key, 'NPK 20-20-20')

        respond({
            'fertilizer': fert,
            'details': 'Heuristic-based recommendation for ' + (crop_label if isinstance(crop_label, str) else 'unknown crop'),
            'tips': ['Apply fertilizer based on soil test report', 'Use recommended dose for optimal yield', 'Apply at proper growth stage'],
            'ok': True
        })
    except Exception as e:
        respond({ 'error': str(e), 'ok': False })

if __name__ == '__main__':
    main()

