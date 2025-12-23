from PIL import Image

def main():
    # Create a simple 64x64 green square PNG
    img = Image.new("RGB", (64, 64), (0, 200, 0))
    img.save("test.png", format="PNG")
    print("Created test.png")

if __name__ == "__main__":
    main()