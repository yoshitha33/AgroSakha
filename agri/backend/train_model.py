# train_model.py
import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pickle

# Load dataset
df = pd.read_csv('crop_data.csv')  # Ensure you have your dataset here

# Features and labels
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# Encode label
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
model = xgb.XGBClassifier()
model.fit(X_train, y_train)

# Save model and encoder
with open('crop_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)
