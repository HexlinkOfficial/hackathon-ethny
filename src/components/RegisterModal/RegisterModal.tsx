import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button } from '@ensdomains/thorin'
import { useEmailAnonymousLogin } from '@/hooks/useEmailAnonymousLogin'
import { useRouter } from "next/router"
import { useAlertMessage } from "@/hooks/useAlertMessage"
import { useCountDown } from "@/hooks/useCountDown"
import { authRegister, genAndSendOtpForDAuth, validateOtpForDAuth } from "@/services/auth"
import { useState, useEffect, useCallback, useMemo } from "react"
import { S } from "./styled.RegisterModal"
import { MuiOtpInput } from "mui-one-time-password-input"
import styled from "@emotion/styled"

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

export function RegisterModal(props: RegisterModalProps) {
  const { visible, onClose, info } = props;

  const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [processing, setProcessing] = useState(false)
  const [jwt, setJWT] = useState("")
  const { startCountdown, restartCountdown, countdownValue } = useCountDown()
  const router = useRouter()
  const emailAnonymousLogin = useEmailAnonymousLogin()
  const { message, showMessage } = useAlertMessage()

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const validateOtp = useCallback(async () => {
    setProcessing(true)
    try {
      const result = await validateOtpForDAuth(otp)
      setJWT(result.jwt)
      console.log("jwt: ", result.jwt)
    } catch (error: any) {
      console.error(error)
    }
    setProcessing(false);
  },[otp])

  const sendOtp = useCallback(async () => {
    let result;
    if (countdownValue > 0) {
      // TODO: add some prompt message
      return;
    }
    setProcessing(true);
    try {
      let data: any = {};
      data.idType = "mailto"
      data.account = info.value
      result = await genAndSendOtpForDAuth(info.value)
      startCountdown(60 * 1000);
    } catch (err) {
      console.log(err)
    }
    setProcessing(false)
  }, [countdownValue, info.value])

  const sendOrValidateOtp = useCallback(async () => {
    if (otp) {
      await validateOtp();
      setOtp("");
      restartCountdown();
    } else {
      await sendOtp();
    }
  }, [otp, restartCountdown, sendOtp, validateOtp])

  const registerUsername = async () => {
    try {
      // verify email
      setOpenVerifyOtpModal(true);
      // register
      // const r = await authRegister(info.value, info.value.replace("@","at").split(".")[0] + ".offchaindemo.eth")
      // console.log(r);
      // emailAnonymousLogin(info.value)
      // router.push("/")
    } catch (e) {
      showMessage({
        messageBody: `Login failed, please check your email.`,
        messageSeverity: "error",
      });
      console.error(e);
    }
    onClose();
  }

  const btnText = useMemo(() => {
    if (processing) {
      return otp ? "Verifying" : "Sending OTP Code";
    }
    return countdownValue ? "Verify" : "Send OTP Code";
  }, [countdownValue, otp, processing]);

  const subTitle = useMemo(() => {
    if (countdownValue) {
      return (
        <Typography weight="light" className="my-2 leading-4 text-gray">
          Enter code that we have sent to email <b>{info.value}</b>. Please enter
          it below.
        </Typography>
      );
    } else {
      return (
        <Typography weight="light" className="my-2 leading-4 text-gray">
          Please send OTP code to verify your email <b>{info.value}</b>.
        </Typography>
      );
    }
  }, [countdownValue, info.value]);

  return (
    <>
      <HexlinkModal open={visible} onDismiss={onClose}>
        <div className='mt-2 w-full'>
          <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
            Register your username
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            Email input:<br /><b>{info.value}</b>
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            ENS registered:<br /><b>{info.value.replace("@", "at").split(".")[0]}.offchaindemo.eth</b>
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            Auth:<br /><b>email OTP</b>
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
      <HexlinkModal open={openVerifyOtpModal} onDismiss={() => setOpenVerifyOtpModal(false)}>
        <div className='mt-2 w-full'>
          <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
            Verify Email OTP
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            {subTitle}
          </Typography>
          <OtpInput
            value={otp}
            onChange={handleChange}
            length={6}
            className="mt-6"
          />
          <div className="mt-4">
            {!otp && countdownValue > 0 && (
              <Typography weight="light">
                {`Resend the verification code in ${Math.floor(
                  countdownValue / 1000,
                )}s`}
              </Typography>
            )}
            <Button
              onClick={sendOrValidateOtp}
              loading={processing}
              disabled={processing || (!otp && countdownValue > 0)}
            >
              {btnText}
            </Button>
          </div>
        </div>
      </HexlinkModal>
    </>
  );
}

const OtpInput = styled(MuiOtpInput)`
  display: flex;
  gap: 20px;
  max-width: 320px;
  margin-inline: auto;
  .MuiOtpInput-TextField {
  }
  .MuiOutlinedInput-input {
    padding: 7.5px 0;
  }
`;