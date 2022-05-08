import { Lightbox } from 'react-modal-image';

type ModalProps = {
  handleClose: any;
  image: any;
  selectedPhoto: any;
};

const Modal: React.FC<ModalProps> = ({ image, selectedPhoto }) => (
  <div>
    {image.title === selectedPhoto && (
      <Lightbox large={image.imageUrl} alt={image.title} />
    )}
  </div>
);

export default Modal;
