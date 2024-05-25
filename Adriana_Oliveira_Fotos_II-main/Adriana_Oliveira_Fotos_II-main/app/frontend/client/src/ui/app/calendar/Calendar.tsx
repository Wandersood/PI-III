import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import brLocale from "@fullcalendar/core/locales/pt-br";
import UserNavbar from "../components/UserNavbar";
import Footer from "../../portfolio/components/Sections/Footer";
import { Button, HelperText } from "flowbite-react";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import NewAppointmentModal from "../modals/appointment/NewAppointmentModal";

export default function Agenda() {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
    date: Date,
  });

  const [selectedDate, setSelectedDate] = useState({});

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleDateSelect = useCallback((dateSelected) => {
    setSelectedDate(dateSelected);
    setModal({ isOpen: true, type: "NewAppointmentModal", message: "", date: selectedDate });
  }, []);

  
  return (
    <>
    
    <div className="flex flex-col">
      <UserNavbar />
      <div className="my-8">
        <h1 className="text-4xl font-black text-center text-secondary italic">
          Agenda
          </h1>
          <HelperText className="text-center text-md mt-4">
        Bem-vindo(a) ao Gerenciamento de compromissos! Esta seção foi projetada para
        ajudá-lo(a) a gerenciar seus compromissos, relacionando-os aos clientes com facilidade.
      </HelperText>
        <div className="flex justify-center items-center mx-auto mt-20 lg:w-9/12">
          <Button
            className="w-max p-2 mx-auto mt-20 flex overflow-x-auto bg-secondary"
            href="/app/novo-compromisso"
          >
            <FaPlus className="mr-2 mt-0.5" />
            Novo compromisso
          </Button>
          <Button
            className="w-max p-2 mx-auto mt-20 flex overflow-x-auto bg-warning text-black"
            href="/app/editar-compromisso"
          >
            <FaEdit className="mr-2 mt-0.5" />
            Editar compromisso
          </Button>
          <Button
            className="w-max p-2 mx-auto mt-20 flex overflow-x-auto bg-error"
            href="/app/excluir-compromisso"
          >
            <FaMinus className="mr-2 mt-0.5" />
            Excluir compromisso
          </Button>
        </div>
      </div>

      <div className="w-9/12 mx-auto mb-28">
        <FullCalendar
          editable={true}
          selectable={true}
          selectMirror={true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={brLocale}
          weekends
          select={handleDateSelect}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventContent
        />
      </div>
      {renderModal(modal, setModal, handleCloseModal, selectedDate)}
      
    </div>
      <Footer />
    </>
  );
}

const renderModal = (modal, setModal, handleCloseModal, selectedDate) => {
  switch (modal.type) {
    case "NewAppointmentModal":
      return (
        <NewAppointmentModal
          modal={modal}
          setModal={setModal}
          selectedDate={selectedDate}
          handleCloseModal={handleCloseModal}

        />
      );
    default:
      return null;
  }
}
