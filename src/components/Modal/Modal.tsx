import { Modal as MuiModal, ModalProps as MuiModalProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { S } from "./styled.Modal";

export function Modal(
  props: Omit<MuiModalProps, "onClose"> & {
    onClose: () => void;
  },
) {
  return (
    <MuiModal {...props}>
      <S.ModalMain>
        <div className="Modal-header">
          <CloseIcon
            className="Modal-close-icon"
            onClick={() => props.onClose()}
          />
        </div>
        <div className="Modal-content flex items-center justify-center">
          {props.children}
        </div>
      </S.ModalMain>
    </MuiModal>
  );
}
