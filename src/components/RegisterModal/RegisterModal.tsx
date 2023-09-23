import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button } from '@ensdomains/thorin'
import { useEmailAnonymousLogin } from '@/hooks/useEmailAnonymousLogin'
import { useRouter } from "next/router"
import { useAlertMessage } from "@/hooks/useAlertMessage"

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

export function RegisterModal(props: RegisterModalProps) {
  const { visible, onClose, info } = props;

  const router = useRouter()
  const emailAnonymousLogin = useEmailAnonymousLogin()
  const { message, showMessage } = useAlertMessage()

  const registerUsername = () => {
    try {
      emailAnonymousLogin(info.value)
      router.push("/")
    } catch (e) {
      showMessage({
        messageBody: `Login failed, please check your email.`,
        messageSeverity: "error",
      });
      console.error(e);
    }
    onClose();
  }

  return (
    <HexlinkModal open={visible} onDismiss={onClose}>
      <div className='mt-2 w-full'>
        <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
          Register your username
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Email input:<br/><b>{info.value}</b>
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Username registered:<br/><b>{info.value}.hex.eth</b>
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Default Auth:<br /><b>email OTP</b>
        </Typography>
        <Button
          as="a"
          onClick={registerUsername}
          className='mt-8 mb-1'
        >
          Register
        </Button>
      </div>
    </HexlinkModal>
  );
}
