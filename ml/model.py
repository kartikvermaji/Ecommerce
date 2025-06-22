import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

# Image dimensions and hyperparameters
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 50  # You can reduce this now with better accuracy

# Dataset path
base_dir = os.path.dirname(__file__)
train_dir = os.path.join(base_dir, 'augmented_data')

# Data loading and rescaling (no extra augmentation since you have it)
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
)

train_generator = datagen.flow_from_directory(
    train_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_generator = datagen.flow_from_directory(
    train_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Save label map
label_map = train_generator.class_indices
label_map = {v: k for k, v in label_map.items()}

utils_dir = os.path.join(base_dir, 'ml', 'utils')
os.makedirs(utils_dir, exist_ok=True)

with open(os.path.join(utils_dir, 'labels.py'), 'w') as f:
    f.write("categories = " + str([label_map[i] for i in sorted(label_map)]))

# Load pretrained MobileNetV2 model
base_model = MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False  # Freeze base model

# Add custom classification head
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.5)(x)
output = Dense(train_generator.num_classes, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=output)

# Compile model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()

# Callbacks
early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
checkpoint = ModelCheckpoint(
    os.path.join(base_dir, 'ml', 'model', 'product_classifier.h5'),
    save_best_only=True
)

# Train the model
history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS,
    callbacks=[early_stop, checkpoint]
)
