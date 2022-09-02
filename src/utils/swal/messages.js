import Swal from "sweetalert2";

export function SuccessMessage(message) {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    confirmButtonText: "Cool",
  });
}

export function ErrorMessage(message) {
  Swal.fire({
    title: "Ooops!",
    text: message,
    icon: "error",
    confirmButtonText: "Ok :(",
  });
}
