import { useState, useEffect } from "react";
import { Provider } from "../../../../../../contexts/forms/FormContext";
import Success from "../../../../modals/appointment/Success";
import ErrorModal from "../../../../modals/appointment/Error";
import Form from "../components/Form";
import UserNavbar from "../../../../components/UserNavbar";
import Footer from "../../../../../portfolio/components/Sections/Footer";
import ConfirmDelete from "../../../../modals/appointment/ConfirmDelete";
import deleteAppointment from "../../../../../../helpers/calendar/deleteAppointment";

export const DeleteAppointmentForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
    id: "",
  });

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    window.location.href = "/app/agenda";
  };

  const handleDelete = (id) => {
    setModal({ isOpen: true, type: "ConfirmDelete", message: "", id: id });
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setModal({
        isOpen: true,
        type: "success",
        message: "Compromisso excluído com sucesso!",
        id: "",
      });
    } catch (error) {
      setModal({
        isOpen: true,
        type: "Error",
        message: "Algo deu errado. Tente novamente mais tarde",
        id: "",
      });
    }
  };

  return (
    <>
      <UserNavbar />
      <Form onSubmitForm={handleDelete} />
      <Footer />
      {renderModal(
        modal,
        setModal,
        handleCloseModal,
        errorMessage,
        handleConfirmDelete
      )}
    </>
  );
};

function renderModal(
  modal,
  setModal,
  handleCloseModal,
  errorMessage,
  handleConfirmDelete
) {
  switch (modal.type) {
    case "success":
      return (
        <Success
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
        />
      );
    case "Error":
      return (
        <ErrorModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
          message={errorMessage}
        />
      );
    case "ConfirmDelete":
      return (
        <ConfirmDelete
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      );
    default:
      break;
  }
}
