import UserNavbar from "../../../components/UserNavbar";
import DropZone from "../../components/DropZone/DropZone";
import Image from "../../../../../components/Shared/Image/Image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fetchFolderById,
  fetchGallery,
  fetchImageById,
} from "../../../../../services/GalleryDataService";
import { useParams } from "react-router-dom";
import Footer from "../../../../portfolio/components/Sections/Footer";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import PhotosContext from "../../../../../contexts/photos/PhotosContext";
import Loading from "../../../../loading/Loading";

export default function FolderView() {
  const { id, pastaId } = useParams();
  const [galleryFetched, setGalleryFetched] = useState({});
  const [folderFetched, setFolderFetched] = useState({});
  const [pictures, setPictures] = useState([]);
  const fetchedPhotoIdsRef = useRef({});
  const [selectedImages, setSelectedImages] = useState({});
  const [loading, setLoading] = useState(true);

  const handleImageSelect = (index) => {
    setSelectedImages((prevSelectedImages) => ({
      ...prevSelectedImages,
      [index]: !prevSelectedImages[index],
    }));
  };

  const fetchGalleryData = useCallback(async () => {
    const [galleryResponse, folderResponse] = await Promise.all([
      fetchGallery(id),
      fetchFolderById(id, pastaId),
    ]);

    let pictures = [];
    if (folderResponse.photos) {
      const uniquePhotos = new Set(folderResponse.photos);
      const fetchImagePromises = Array.from(uniquePhotos).map((photo) => {
        if (!fetchedPhotoIdsRef.current[photo]) {
          return fetchImageById(id, photo)
            .then((response) => {
              const newImage = URL.createObjectURL(response);
              fetchedPhotoIdsRef.current[photo] = true;
              return newImage;
            })
            .catch((error) => {
              console.error(`Failed to fetch image with id ${photo}:`, error);
              return null;
            });
        }
        return null;
      });

      pictures = await Promise.all(fetchImagePromises);
      pictures = pictures.filter(Boolean);
    }

    setGalleryFetched(galleryResponse);
    setFolderFetched(folderResponse);
    setPictures(pictures);
    setLoading(false);
  }, [id, pastaId]);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  const acceptedImageTypes = {
    "image/jpeg": [],
    "image/jpg": [],
    "image/png": [],
  };

  const acceptedDocumentTypes = {
    "application/pdf": [],
  };

  if (loading) {
    return <Loading />
  }
  return (
    <PhotosContext.Provider value={[pictures, setPictures]}>
      <UserNavbar />
      <BreadCrumb
        home={["Página Inicial", "/app"]}
        currentSection={["Galerias", "/app/galerias/"]}
        currentSubsection={[galleryFetched.title, "/app/galerias/" + id]}
        currentSubsection2={[
          folderFetched.title,
          "/app/galerias/" + id + "/pastas/" + pastaId,
        ]}
      />
      <div className="xs:w-11/12 lg:w-5/6 mx-auto bg-[#f9f9f9] p-4 my-4 rounded-md">
        <h4 className="text-3xl font-bold text-center mb-9 text-secondary">
          {folderFetched && folderFetched.title}
        </h4>
        <h4 className="text-2xl font-bold text-center mb-9 text-secondary">
          Fotos
        </h4>

        <div className="w-full">
          <DropZone
            setPhotos={setPictures}
            acceptedFileTypes={acceptedImageTypes}
            currentPhotosNumber={pictures.length}
            introText="Arraste e solte arquivos aqui, ou clique para selecionar imagens."
            supportedFiles="Formatos suportados: .jpeg, .jpg, .png"
          />
        </div>
        <p className="mt-2 mb-4">
          Lista de imagens adicionadas na pasta{" "}
          {folderFetched && folderFetched.title}:{" "}
        </p>
        <div className="lg:w-full grid lg:grid-cols-3 gap-8 md:grid-cols-2 xxs:grid-cols-1">
          {!loading && pictures.length === 0 && (
            <div className="flex justify-center w-full"></div>
          )}
          {!loading && pictures.length === 0 && (
            <div className="flex justify-center w-full">
              <p className="text-center">Nenhuma imagem adicionada.</p>
            </div>
          )}
          {pictures.map((blobUrl, index) => (
            <ImageComponent
              key={index}
              src={blobUrl}
              alt={`Foto ${index + 1}`}
              isSelected={selectedImages[index] || false}
              onSelect={() => handleImageSelect(index)}
            />
          ))}
        </div>
        <div className="w-full">
          <h4 className="text-2xl font-bold text-center mt-20 text-secondary">
            Documentos
          </h4>
          <DropZone
            acceptedFileTypes={acceptedDocumentTypes}
            introText="Arraste e solte arquivos aqui, ou clique para selecionar documentos."
            supportedFiles="Formatos suportados: .pdf"
          />
        </div>
        <p className="mt-2 mb-4">
          Lista de documentos adicionados na pasta{" "}
          {folderFetched && folderFetched.title}:
        </p>
      </div>
      <Footer />
    </PhotosContext.Provider>
  );
}

const ImageComponent = React.memo(({ src, alt, isSelected, onSelect }) => (
  <div className="relative">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={onSelect}
      className="absolute top-0 right-0 m-2 h-6 w-6 rounded-full z-10"
    />
    <Image
      src={src}
      alt={alt}
      className={`w-full h-64 object-cover rounded-md transform transition-transform duration-500 ${
        isSelected ? "scale-105" : ""
      }`}
    />
  </div>
));
