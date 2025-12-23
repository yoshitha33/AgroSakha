import streamlit as st
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import os

# Model info
MODEL_ID = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
LOCAL_DIR = "leaf_model"

# Keywords related to leaf diseases
LEAF_KEYWORDS = ["leaf", "blight", "spot", "scab", "rot", "rust", "mildew", "healthy"]

# Load model with caching
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

# --- Streamlit UI ---
st.set_page_config(page_title="Leaf Disease Detector", page_icon="🍃", layout="centered")

st.markdown(
    """
    <div style="text-align:center">
        <h1>🍃 Leaf Disease Detection</h1>
        <p>Upload a clear image of a <strong>leaf</strong> to identify potential diseases.<br>
        Ensure the leaf is the main subject of the image.</p>
    </div>
    """,
    unsafe_allow_html=True
)

uploaded_file = st.file_uploader("📤 Upload a leaf image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    try:
        image = Image.open(uploaded_file).convert("RGB")
        st.image(image, caption="📸 Uploaded Image", use_column_width=True)

        processor, model = load_model()
        inputs = processor(images=image, return_tensors="pt")

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()
            label = model.config.id2label[predicted_class_idx]

        if any(keyword in label.lower() for keyword in LEAF_KEYWORDS):
            st.success(f"✅ **Leaf Detected**\n\n🩺 Predicted Disease: **{label}**")
        else:
            st.error("❌ This image is not recognized as a leaf. Please upload a valid **leaf image**.")
    except Exception as e:
        st.error(f"⚠️ Error processing image: {e}")
else:
    st.info("📎 Please upload a **leaf image** to begin prediction.")
