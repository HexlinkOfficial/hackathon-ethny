import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button } from '@ensdomains/thorin'

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

export function RegisterModal(props: RegisterModalProps) {
  const { visible, onClose, info } = props;

  return (
    <HexlinkModal open={visible} onDismiss={onClose}>
      <div className='mt-2 w-full'>
        <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
          Register your username
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Email input:<br/><b>{info.email}</b>
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Username registered:<br/><b>{info.email}.hex.eth</b>
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Default Auth:<br /><b>email OTP</b>
        </Typography>
        <Button
          as="a"
          onClick={onClose}
          className='mt-8 mb-1'
        >
          Register
        </Button>
      </div>
    </HexlinkModal>
  );
}
