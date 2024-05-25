import { Button, Modal } from "flowbite-react";
import AssociateClientForm from "../../../../forms/Galleries/components/AssociateClientForm/AssociateClientForm";

export default function AssociateClientModal({ modal, setModal, handleCloseModal }) {
  return (
    <Modal show={modal.isOpen}>
      <Modal.Header>
        <h4 className="text-3xl font-bold text-center mb-9 text-success">
          {" "}
          Anexar contratos e termos de uso
        </h4>
      </Modal.Header>
      <Modal.Body>
        <AssociateClientForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal} className="bg-success">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
