import sys
import os
import io
import json
import base64
import argparse
from PIL import Image

LEAF_KEYWORDS = ["leaf", "blight", "spot", "scab", "rot", "rust", "mildew", "healthy"]


def respond(obj):
    print(json.dumps(obj, ensure_ascii=False))


def decode_image_b64(data_url_or_b64: str) -> Image.Image:
    s = data_url_or_b64.strip()
    if s.startswith("data:"):
        # Strip data URL header
        idx = s.find(",")
        s = s[idx + 1:] if idx != -1 else s
    img_bytes = base64.b64decode(s)
    return Image.open(io.BytesIO(img_bytes)).convert("RGB")


def load_model():
    """Load the HF image classification model, caching locally if available.
    Returns (processor, model) or (None, None) if transformers isn't installed.
    """
    local_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "agri", "plantdisease", "leaf_model")
    )
    model_id = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
    try:
        from transformers import AutoImageProcessor, AutoModelForImageClassification
    except ImportError:
        return None, None

    if not os.path.exists(local_dir):
        processor = AutoImageProcessor.from_pretrained(model_id)
        model = AutoModelForImageClassification.from_pretrained(model_id)
        os.makedirs(local_dir, exist_ok=True)
        processor.save_pretrained(local_dir)
        model.save_pretrained(local_dir)
    else:
        processor = AutoImageProcessor.from_pretrained(local_dir)
        model = AutoModelForImageClassification.from_pretrained(local_dir)
    return processor, model


def read_input():
    """Read JSON from stdin if piped; otherwise parse CLI args.

    Expected input (either):
      - JSON via stdin with key 'imageBase64'
      - CLI arg '--imageBase64' or '--imagePath'
    """
    if not sys.stdin.isatty():
        try:
            return json.load(sys.stdin)
        except Exception:
            # Fall through to CLI parsing if stdin isn't valid JSON
            pass

    parser = argparse.ArgumentParser(description="Plant disease classifier input")
    parser.add_argument("--imageBase64", help="Image as base64 or data URL", required=False)
    parser.add_argument("--imagePath", help="Path to image file", required=False)
    args = parser.parse_args()

    data = {}
    if args.imageBase64:
        data["imageBase64"] = args.imageBase64
    elif args.imagePath:
        if not os.path.exists(args.imagePath):
            respond({"ok": False, "error": f"Image not found: {args.imagePath}"})
            sys.exit(2)
        with open(args.imagePath, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("ascii")
            data["imageBase64"] = b64
    else:
        respond({
            "ok": False,
            "error": "No input provided. Pipe JSON with 'imageBase64' or use --imagePath/--imageBase64.",
        })
        sys.exit(2)

    return data


def classify(image: Image.Image):
    processor, model = load_model()
    if processor is None or model is None:
        # Fallback when transformers isn't installed
        return {
            "label": "Plant Leaf (Classification Unavailable)",
            "confidence": 0,
            "isLeaf": True,
            "ok": True,
            "message": "Model not available; image accepted as leaf",
        }

    import torch
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits[0]
        probs = torch.softmax(logits, dim=-1)
        idx = int(torch.argmax(probs).item())
        conf = float(probs[idx].item()) * 100.0
        label = model.config.id2label[idx]

    is_leaf = any(k in label.lower() for k in LEAF_KEYWORDS)
    return {
        "label": label,
        "confidence": round(conf, 2),
        "isLeaf": bool(is_leaf),
        "ok": True,
    }


def main():
    try:
        data = read_input()
        image_b64 = data.get("imageBase64")
        if not image_b64:
            respond({"ok": False, "error": "imageBase64 missing"})
            return

        image = decode_image_b64(image_b64)
        result = classify(image)
        respond(result)
    except Exception as e:
        respond({"ok": False, "error": str(e)})


if __name__ == "__main__":
    main()
