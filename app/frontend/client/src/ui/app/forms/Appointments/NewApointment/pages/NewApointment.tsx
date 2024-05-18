import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Provider } from "../../../../../../contexts/forms/FormContext";
import {
  fetchData,
  sendData,
} from "../../../../../../services/AppointmentDataService";
import { initialData } from "../../../../../../lib/calendar/initialData";
import Success from "../../../../modals/appointment/Success";
import ErrorModal from "../../../../modals/appointment/Error";
import Form from "../components/Form";


export const NewAppointmentForm = ({dateSelected}) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [method, setMethod] = useState("POST");
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    window.location.href = "/app/agenda";
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("pt-BR");
    return formattedDate;
  }

  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString("pt-BR");
    return formattedTime;
  }

 useEffect(() => {
  setData({
    ...data,
    dateInitial: formatDate(dateSelected.start),
    hourInitial: formatTime(dateSelected.start),
    dateFinal: formatDate(dateSelected.end),
    hourFinal: formatTime(dateSelected.end),
  });
   
}, [dateSelected]);


  
  useEffect(() => {
    if (loading) return;
      sendData(id, data)
        .then(() => {
          setModal({
            isOpen: true,
            type: "success",
            message: "Compromisso salvo com sucesso",
          });
        })
        .catch((error) => {
          setModal({
            isOpen: true,
            type: "Error",
            message: error.message,
          });
        });
  }, [data, id, loading]);

  return (
    <>
      <Provider value={{ data, setData }}>
        <Form data={data} setData={setData} prevData={data} />
      </Provider>
      {renderModal(modal, setModal, handleCloseModal, errorMessage)}
    </>
  );
};

function renderModal(modal, setModal, handleCloseModal, errorMessage) {
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
    default:
      break;
  }
}
