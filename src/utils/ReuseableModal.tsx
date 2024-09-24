import React from "react";
import { Modal } from "antd";

interface ReusableModalProps {
  isOpen: boolean;
  title: string;

  content: React.ReactNode;
  handleCancel: () => void;
}

const ReuseableModal = ({
  isOpen,
  title,
  content,
  handleCancel,
}: ReusableModalProps) => {
  return (
    <Modal
      title={<div className="text-center text-xl font-semibold">{title}</div>}
      open={isOpen}
      onCancel={handleCancel}
      centered
      footer={null} // This removes the default OK and Cancel buttons
      className="custom-modal"
    >
      {content}
    </Modal>
  );
};

export default ReuseableModal;
