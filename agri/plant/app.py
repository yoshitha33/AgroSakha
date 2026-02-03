import streamlit as st
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import os

# Model trained on leaf diseases
MODEL_ID = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
LOCAL_DIR = "leaf_model"

@st.cache_resource
def load_model():
    if not os.path.exists(LOCAL_DIR):
        processor = AutoImageProcessor.from_pretrained(MODEL_ID)
        model = AutoModelForImageClassification.from_pretrained(MODEL_ID)
        processor.save_pretrained(LOCAL_DIR)
        model.save_pretrained(LOCAL_DIR)
    else:
        processor = AutoImageProcessor.from_pretrained(LOCAL_DIR)
        model = AutoModelForImageClassification.from_pretrained(LOCAL_DIR)
    return processor, model

# ✅ Leaf-related terms (used in model's labels)
LEAF_KEYWORDS = ["leaf", "blight", "spot", "scab", "rot", "rust", "mildew", "healthy"]

# Streamlit UI
st.title("🍃 Leaf Image Classifier")
st.write("Upload a **leaf image only**. Non-leaf images will be rejected.")

uploaded_file = st.file_uploader("Upload a leaf image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_column_width=True)

    processor, model = load_model()

    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()
        label = model.config.id2label[predicted_class_idx]

    # Check if label contains any leaf-related keyword
    if any(keyword in label.lower() for keyword in LEAF_KEYWORDS):
        st.success(f"🩺 Leaf Detected - Predicted Disease: **{label}**")
    else:
        st.error("❌ This image is NOT recognized as a leaf. Please upload a valid **leaf image**.")
