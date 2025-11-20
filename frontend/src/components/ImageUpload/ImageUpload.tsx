import { useState, useRef } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Por favor, selecciona una imagen válida (JPG o PNG)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
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
        alert('Imagen de perfil subida exitosamente');
      } else {
        throw new Error('Error en la subida');
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      alert('Error al subir la imagen. Por favor, intenta nuevamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Foto de Perfil</h3>
      <div className="flex flex-col items-center space-y-4 w-full">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            onClick={triggerFileInput}
            className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-xs text-gray-500">Subir foto</span>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          className="hidden"
        />
        {!previewUrl && (
          <button
            onClick={triggerFileInput}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Seleccionar Imagen
          </button>
        )}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Formatos: JPG, PNG
          </p>
          <p className="text-xs text-gray-500">
            Máximo: 5MB
          </p>
        </div>
        {previewUrl && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
              isUploading
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isUploading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Subiendo...</span>
              </div>
            ) : (
              'Guardar Foto'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;