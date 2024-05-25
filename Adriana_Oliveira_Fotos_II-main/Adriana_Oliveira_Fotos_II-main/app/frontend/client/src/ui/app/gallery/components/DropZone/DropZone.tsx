import Dropzone, { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { handleUpload } from "../../../../../helpers/gallery/handleUpload";

export default function DropZone({ setPhotos, photosNumber, currentPhotosNumber, acceptedFileTypes, introText, supportedFiles, currentPhotos }) {
  const { id, pastaId } = useParams();

  const { acceptedFiles } = useDropzone({
    accept: acceptedFileTypes,
    multiple: true,
  });

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        handleUpload(acceptedFiles, id, pastaId, setPhotos, currentPhotos);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          {...getRootProps()}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer h-64 m-4"
        >
          <input {...getInputProps()} multiple />
          <input
            multiple
            type="hidden"
            name="section"
            value="yourSectionValue"
          />
          <FaUpload className="text-4xl text-gray-400" />
          <p className="mt-2 text-sm text-center text-gray-600">{introText}</p>
          <p className="mt-2 text-sm text-center text-gray-600">
            {supportedFiles}
          </p>
        </section>
      )}
    </Dropzone>
  );
}