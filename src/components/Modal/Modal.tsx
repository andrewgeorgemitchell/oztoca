import react, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Lightbox } from "react-modal-image";

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: "MuiExample_Component" }
);

type ModalProps = {
  handleClose: any;
  image: any;
  selectedPhoto: any;
};

const Modal: React.FC<ModalProps> = ({ image, selectedPhoto }) => {
    console.log(selectedPhoto, image)
  return (
    <div>
      {image.title === selectedPhoto && (
        <Lightbox large={image.src} alt={image.title} />
      )}
    </div>
  );
};

export default Modal;
