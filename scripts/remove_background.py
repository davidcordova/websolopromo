import math
from PIL import Image, ImageFilter

def make_transparent_pure_pil(input_path, output_webp_path, output_png_path, tolerance=24, feather=1):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Sample background color near corners
    samples = [
        img.getpixel((0, 0)),
        img.getpixel((width - 1, 0)),
        img.getpixel((5, 5)),
        img.getpixel((width - 6, 5))
    ]
    bg_r = sum(s[0] for s in samples) / len(samples)
    bg_g = sum(s[1] for s in samples) / len(samples)
    bg_b = sum(s[2] for s in samples) / len(samples)
    print(f"Sampled BG Color: ({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")

    # Create grayscale alpha mask
    # Fast bytearray construction
    raw_data = img.tobytes()
    alpha_bytes = bytearray(width * height)
    
    min_thresh = tolerance
    max_thresh = tolerance + 30
    thresh_range = max_thresh - min_thresh
    
    idx = 0
    alpha_idx = 0
    for y in range(height):
        for x in range(width):
            r = raw_data[idx]
            g = raw_data[idx + 1]
            b = raw_data[idx + 2]
            
            # Euclidean distance to bg
            dr = r - bg_r
            dg = g - bg_g
            db = b - bg_b
            dist = math.sqrt(dr * dr + dg * dg + db * db)
            
            if dist <= min_thresh:
                a = 0
            elif dist >= max_thresh:
                a = 255
            else:
                a = int(((dist - min_thresh) / thresh_range) * 255)
                
            alpha_bytes[alpha_idx] = a
            idx += 4
            alpha_idx += 1
            
    alpha_mask = Image.frombytes("L", (width, height), bytes(alpha_bytes))
    
    if feather > 0:
        alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(feather))
        
    img.putalpha(alpha_mask)
    
    # Crop to bounding box
    bbox = img.getbbox()
    if bbox:
        bbox = (max(0, bbox[0]-2), max(0, bbox[1]-2), min(width, bbox[2]+2), min(height, bbox[3]+2))
        img = img.crop(bbox)
        
    img.save(output_png_path, "PNG", optimize=True)
    img.save(output_webp_path, "WEBP", quality=95, method=6)
    print(f"Processed and saved: {output_webp_path} size={img.size}")

if __name__ == "__main__":
    make_transparent_pure_pil(
        "C:/Users/LuisDavidCordovaLope/.gemini/antigravity-ide/brain/9eacc2c7-9c81-4e63-aa8c-bc5c227c98ac/hero_ambassador_talent_1788739772913.jpg",
        "frontend/public/images/assets/hero_ambassador_cutout.webp",
        "frontend/public/images/assets/hero_ambassador_cutout.png",
        tolerance=22,
        feather=1
    )
    make_transparent_pure_pil(
        "C:/Users/LuisDavidCordovaLope/.gemini/antigravity-ide/brain/9eacc2c7-9c81-4e63-aa8c-bc5c227c98ac/hero_tech_display_cutout_1788740037828.jpg",
        "frontend/public/images/assets/hero_display_cutout.webp",
        "frontend/public/images/assets/hero_display_cutout.png",
        tolerance=18,
        feather=1
    )
