import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# Load your CSV
df = pd.read_csv("f2.csv")

# Label encoding for categorical columns
le_soil = LabelEncoder()
le_crop = LabelEncoder()
le_fert = LabelEncoder()

df["Soil_Type"] = le_soil.fit_transform(df["Soil_Type"])
df["Crop_Type"] = le_crop.fit_transform(df["Crop_Type"])
df["Fertilizer"] = le_fert.fit_transform(df["Fertilizer"])

# Save encoders
with open("soil_encoder.pkl", "wb") as f:
    pickle.dump(le_soil, f)

with open("crop_encoder.pkl", "wb") as f:
    pickle.dump(le_crop, f)

with open("fert_encoder.pkl", "wb") as f:
    pickle.dump(le_fert, f)

# Features and target
X = df.drop("Fertilizer", axis=1)
y = df["Fertilizer"]

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
with open("fertilizer_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model & encoders saved.")
