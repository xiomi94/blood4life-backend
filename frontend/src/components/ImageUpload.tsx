// components/ImageUpload.tsx
import { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:8080/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Imagen subida:', result);
        alert('Imagen subida exitosamente');
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px' }} />
          <button onClick={handleUpload}>Subir Imagen</button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;