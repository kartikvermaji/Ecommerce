import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
from PIL import Image

# Setup augmentation generator (same as in your model code)
augmentor = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    rotation_range=25,
    width_shift_range=0.1,
    height_shift_range=0.1,
    brightness_range=[0.8, 1.2],
    horizontal_flip=True,
    fill_mode='nearest'
)

# Source and destination directories
base_dir = os.path.dirname(__file__)
source_dataset_dir = os.path.join(base_dir, 'dataset')
augmented_dataset_dir = os.path.join(base_dir, 'augmented_data')

# Create the augmented_data directory if it doesn't exist
os.makedirs(augmented_dataset_dir, exist_ok=True)

# Loop through each category (class folder)
for class_name in os.listdir(source_dataset_dir):
    class_path = os.path.join(source_dataset_dir, class_name)
    
    # Skip non-folder items
    if not os.path.isdir(class_path):
        continue
    
    print(f"Augmenting images in class: {class_name}")

    # Destination folder for augmented images
    class_augmented_path = os.path.join(augmented_dataset_dir, class_name)
    os.makedirs(class_augmented_path, exist_ok=True)

    # Loop through each image in the class
    for image_name in os.listdir(class_path):
        if not image_name.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue

        image_path = os.path.join(class_path, image_name)

        try:
            img = load_img(image_path)  # Load image
        except Exception as e:
            print(f"Error loading {image_path}: {e}")
            continue

        x = img_to_array(img)
        x = x.reshape((1,) + x.shape)

        # Generate and save 1000 augmented images per image
        i = 0
        for batch in augmentor.flow(
            x,
            batch_size=1,
            save_to_dir=class_augmented_path,
            save_prefix=f'aug_{os.path.splitext(image_name)[0]}',
            save_format='jpeg'
        ):
            i += 1
            if i >= 20:
                break

print("\n✅ Augmentation complete. All images saved to 'augmented_data/'")
