import { type ReactNode, useState } from "react";

interface ModalProps {
  children: ReactNode;
  openModalButtonLabel?: string;
}
const Modal = ({ children, openModalButtonLabel = "Open" }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) {
    return (
      <button
        className="mt-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all"
        onClick={() => setIsOpen(true)}
      >
        {openModalButtonLabel}
      </button>
    );
  }
  return (
    <div className="absolute w-full h-screen flex items-center justify-center bg-gray-500/50">
      <div className="w-max relative">
        <button
          className={"absolute right-4 top-3 z-10 "}
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
