import { Breadcrumb, HelperText } from "flowbite-react";
import FolderCard from "../../components/FolderCard/FolderCard";
import UserNavbar from "../../../components/UserNavbar";
import Footer from "../../../../portfolio/components/Sections/Footer";
import ClickZone from "../../components/ClickZone/ClickZone";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllFoldersFromGallery, fetchGallery } from "../../../../../services/GalleryDataService";
import ClientCard from "../../components/ClientCard/ClientCard";

export default function GalleryView() {
  const { id } = useParams()
  const [galleryData, setGalleryData] = useState({})
  const [foldersData, setFoldersData] = useState({})
  
  useEffect(() => {
    fetchGallery(id).then((data) => {
      setGalleryData(data)
    })
    fetchAllFoldersFromGallery(id).then((data) => {
      setFoldersData(data)
    }
    )
  }, [id])
 

  return (
    <>
      <UserNavbar />
      <Breadcrumb className="mx-auto my-4 lg:w-5/6 xxs:w-11/12">
        <Breadcrumb.Item href="/">Página Inicial</Breadcrumb.Item>
        <Breadcrumb.Item href="/app/galerias">Galerias</Breadcrumb.Item>
        <Breadcrumb.Item>{galleryData.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="xs:w-11/12 lg:w-5/6 mx-auto bg-[#f9f9f9] p-4 my-4 rounded-md">
        <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
          {galleryData.title}
        </h1>
        <h4 className="font-bold text-2xl mt-2 text-secondary mb-4">
          Pastas desta galeria
        </h4>
        <HelperText className="mb-4 text-md">
          Adicione pastas para categorizar e organizar as fotos da galeria. Ao
          adicionar uma nova pasta você poderá adicionar fotos a ela.
        </HelperText>
        <div className="flex flex-wrap justify-start">
          <ClickZone isClient={false} />
          {foldersData && Array.from(foldersData).map((folder) => (
            <FolderCard
              foldersNumber={foldersData.length}
            folderTitle={folder && folder.title}
            photosNumber={galleryData.photosNumber}
              folderId={folder && folder.id}
            />
          ))
          }
          
        </div>
        <h4 className="font-bold text-2xl mt-6 text-secondary mb-4">
          Cliente Associado
        </h4>
        <HelperText className="mb-4 text-md">
          Gerencie o estado atual do cliente associado a esta galeria.
        </HelperText>
        <div className="flex flex-wrap justify-start">
          {galleryData.clientAssociated && (
            <ClientCard
              clientId={galleryData.clientAssociated}
              photosNumber={galleryData.photosNumber}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
