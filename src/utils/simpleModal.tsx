import type { ReactNode } from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const SimpleModal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className="bg-white p-6 rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-xl m-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-white/50 flex justify-center items-start z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </Modal>
  );
};

export default SimpleModal;
