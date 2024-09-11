import Swal from "sweetalert2";

type TtostProps = {
  message: string;
  status: "success" | "error";
};

export const Toast = ({ message, status }: TtostProps) => {
  Swal.fire({
    text: message,
    icon: status,
    showConfirmButton: false,
    timer: 1500,
    position: "center",
  });

  return null;
};

export default Toast;
