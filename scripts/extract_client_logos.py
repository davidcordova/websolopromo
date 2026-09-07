import os
from PIL import Image, ImageDraw, ImageFilter

# Load Ultra-HD page 3 (3368 x 2382)
img = Image.open('page_3_ultra.png').convert('RGBA')

# Centers mapped to Ultra-HD (scale 4.0)
centers_scale_2 = {
    'canon': (545, 442),
    'asus': (838, 442),
    'tcl': (1122, 442),
    'nexxt': (493, 680),
    'viewsonic': (784, 680),
    'klipxtreme': (1069, 680),
    'microsoft': (1332, 597),
    'accvent': (700, 908),
    'jbl': (980, 908),
    'belkin': (1290, 888)
}

output_dir = 'frontend/public/images/clients'
os.makedirs(output_dir, exist_ok=True)

# Outer radius of the cyan ring is 210 px
r = 212
dim = r * 2

for name, (cx2, cy2) in centers_scale_2.items():
    cx = cx2 * 2
    cy = cy2 * 2
    
    # Crop box around the center
    crop_box = (cx - r, cy - r, cx + r, cy + r)
    cropped = img.crop(crop_box)
    
    # Create smooth circular alpha mask
    mask = Image.new('L', (dim, dim), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((3, 3, dim - 3, dim - 3), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(0.8))
    
    # Apply alpha mask
    cropped.putalpha(mask)
    
    # Enhance sharpness slightly
    enhanced = cropped.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=2))
    
    # Save as WebP (high quality 95)
    webp_path = os.path.join(output_dir, f'logo_{name}.webp')
    enhanced.save(webp_path, 'WEBP', quality=95)
    
    # Save as PNG as well
    png_path = os.path.join(output_dir, f'logo_{name}.png')
    enhanced.save(png_path, 'PNG')
    
    print(f'[OK] Clean trimmed {name} logo: {webp_path}')

print('All 10 client logos trimmed cleanly in Ultra-HD with transparent background!')
