import { Breadcrumb } from "flowbite-react";
import Footer from "../../../../portfolio/components/Sections/Footer";
import UserNavbar from "../../../components/UserNavbar";
import NewGalleryForm from "../components/NewGalleryForm/NewGalleryForm";

const GalleryForm = () => {
  return (
    <>
      <UserNavbar />
      <Breadcrumb className="p-4 mx-auto">
        <Breadcrumb.Item>
          <a href="/app" className="text-[16px]">
            Página inicial
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/app/galerias" className="text-[16px]">
            Galerias
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/app/nova-galeria" className="text-[16px]">
            Nova Galeria
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <NewGalleryForm />
      <Footer />
    </>
  );
};

export default GalleryForm;
