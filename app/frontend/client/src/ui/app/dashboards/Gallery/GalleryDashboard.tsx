import { Button, HelperText } from "flowbite-react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../../portfolio/components/Sections/Footer";
import Searchbar from "./components/Searchbar/Searchbar";
import GaleryComponent from "./components/GalleryComponent/GaleryComponent";
import { PaginationComponent } from "./components/PaginationComponent/PaginationComponent";
import { FaPlus } from "react-icons/fa";

export default function GalleryDashboard() {

  return (
    <>
      <UserNavbar />
      <h1 className="text-center text-4xl font-bold mt-10 text-secondary italic">
        Gerenciamento de Galerias
      </h1>
      <HelperText className="text-center text-md mt-4">
        Bem-vindo(a) ao Gerenciamento de galerias! Esta seção foi projetada para
        ajudá-lo(a) a gerenciar suas galerias com facilidade.
      </HelperText>
      <Button href="/app/nova-galeria" className="mt-4 lg:w-1/6 py-4 mx-auto text-lg bg-secondary">
        <FaPlus className="text-xl mr-2" />
        Nova Galeria
      </Button>
      <Searchbar />
      <GaleryComponent />
      <PaginationComponent />
      <Footer />
    </>
  );
}
