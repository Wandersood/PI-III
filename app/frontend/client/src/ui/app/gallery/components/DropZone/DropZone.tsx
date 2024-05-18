import Dropzone from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function DropZone({setPhotos}) {
  const { id, pastaId } = useParams()

  const handleUpload = (acceptedFiles) => {
    const url = `http://localhost:8003/app/galerias/${id}/pasta/${pastaId}/upload-imagem/`
    const formData = new FormData()

    acceptedFiles.forEach((file) => {
      formData.append('photos', file);
    });

    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        data.photos && Array.from(data.photos).forEach(async (photo) => {
          const downloadUrl = `http://localhost:8003/app/galerias/${id}/fotos/${photo}/download/`;
          const response = await fetch(downloadUrl);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setPhotos(prevPhotos => [...prevPhotos, blobUrl]);
        });
      });
  }
  return (
    <Dropzone onDrop={handleUpload}>
      {({ getRootProps, getInputProps }) => (
        <section {...getRootProps()} className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer h-64 m-4">
          <input {...getInputProps()} />
          <input
    
            multiple
            type="hidden"
            name="section"
            value="yourSectionValue" 
          />
          <FaUpload className="text-4xl text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Arraste e solte arquivos aqui, ou clique para selecionar arquivos
          </p>
        </section>
      )}
    </Dropzone>
  );
  }
