import React, { useRef } from 'react';
import { FaCamera, FaTrash } from 'react-icons/fa';

const ImageUpload = ({ currentImage, onImageChange, label = "Profile Picture" }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (jpg, png, etc).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress the image using Canvas
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to Base64 with 70% quality to keep it small
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        onImageChange(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <div className="flex items-center gap-4">
        {/* Image Preview */}
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800 relative group">
          {currentImage ? (
            <>
              <img 
                src={currentImage} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove photo"
              >
                <FaTrash />
              </button>
            </>
          ) : (
            <FaCamera className="text-gray-400 text-2xl" />
          )}
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="btn-secondary text-sm py-2 px-4"
          >
            Browse Image
          </button>
          <p className="text-xs text-gray-500 mt-1">Max 400x400px (auto-resized)</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;