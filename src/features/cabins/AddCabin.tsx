import { createContext, useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button size="medium" variation="primary">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button size="medium" variation="primary">
          Show table
        </Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         size="medium"
//         variation="primary"
//         onClick={() => setIsOpenModal((show) => !show)}
//       >
//         Add new Cabin
//       </Button>
//       <>
//         {isOpenModal && (
//           <Modal onClose={() => setIsOpenModal(false)}>
//             <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//           </Modal>
//         )}
//       </>
//     </div>
//   );
// }
