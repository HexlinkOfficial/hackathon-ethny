import { Modal } from '@ensdomains/thorin'
import { S } from "./styled.HexlinkModal"
import { PropsWithChildren } from 'react'
import CloseIcon from "@mui/icons-material/Close";

interface HexlinkModalProps {
  open: boolean;
  onDismiss: () => void;
}

export function HexlinkModal(props: PropsWithChildren<HexlinkModalProps>) {
  const { open, onDismiss } = props;
  return (
    <Modal open={open} onDismiss={onDismiss}>
      <S.ModalMain>
        <div className="Modal-header">
          <CloseIcon
            className="Modal-close-icon"
            onClick={() => props.onDismiss()}
          />
        </div>
        <div className="flex items-center justify-center">
          {props.children}
        </div>
      </S.ModalMain>
    </Modal>
  )
}