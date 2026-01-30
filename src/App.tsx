import Modal from "./components/Modal.tsx";
import OkrForm from "./components/OkrForm";
import OKRList from "./components/OKRList.tsx";
import { useEffect, useState } from "react";
import type { OKR } from "./types/okr-types.ts";

const App = () => {
  const [okrData, setOkrData] = useState<OKR[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/okrs")
      .then((res) => res.json())
      .then((okrData) => {
        setOkrData(okrData);
      });
  }, []);
  return (
    <div className="relative">
      <Modal openModalButtonLabel="Add OKR's">
        <OkrForm />
      </Modal>
      <OKRList okrList={okrData} />
    </div>
  );
};
export default App;
