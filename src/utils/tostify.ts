import { toast } from "react-toastify";

export const NotificationSuccess = (text:string, position:"top-right"|"top-left"|"bottom-right"|"bottom-left") => {
  return toast.success(text, {
    position: `${position}`,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export const NotificationFailure = (text:string, position:"top-right"|"top-left"|"bottom-right"|"bottom-left") => {
  return toast.error(text, {
    position: `${position}`,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export const NotificationWarning = (text:string, position:"top-right"|"top-left"|"bottom-right"|"bottom-left") => {
  return toast.warning(text, {
    position: `${position}`,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const NotificationInfo = (text:string, position:"top-right"|"top-left"|"bottom-right"|"bottom-left") => {
  return toast.info(text, {
    position: `${position}`,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const NotificationPromise = (data:any,pending:string,success:string,error:string) => {
  return toast.promise(data, {
    pending,
    success,
    error
  });
};
