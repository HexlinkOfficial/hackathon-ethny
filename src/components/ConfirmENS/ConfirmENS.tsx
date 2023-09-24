import { useEnsAddress } from 'wagmi'
import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button, Spinner } from '@ensdomains/thorin'
import { ConnectButton } from '@/components/ConnectButton'
import { useState, useEffect, useCallback, useMemo } from "react"
import { mockAuthRegistry } from "@/const/mockAuthRegistry"
import { useCountDown } from "@/hooks/useCountDown"
import { MuiOtpInput } from "mui-one-time-password-input"
import { authSendOtp, authVerifyOtp, authSign } from "@/services/auth"
import styled from "@emotion/styled"
import { useENSAnnoymousLogin } from '@/hooks/useENSAnnoymousLogin'
import { useRouter } from "next/router"

interface ConfirmENSProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

export function ConfirmENS(props: ConfirmENSProps) {
  const { visible, onClose, info } = props
  const ensAnonymousLogin = useENSAnnoymousLogin()
  const router = useRouter()
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [authType, setAuthType] = useState("0")
  const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [jwt, setJWT] = useState("")
  const [otp, setOtp] = useState("")
  const { startCountdown, restartCountdown, countdownValue } = useCountDown()

  const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: info.value,
    chainId: 1,
  })

  const hasRegistry = () => {
    const r = mockAuthRegistry[ensAddress as string]
    if (r) {
      setAuthType(r["authType"])
    }
  }

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const ENSlogin = () => {
    console.log("ENS address: ", ensAddress)
  }

  const ifWrongWallet = (status: boolean) => {
    if (!status) {
      setOpenAlertModal(true)
    }
  }

  const closeAlertModal = () => {
    setOpenAlertModal(false)
  }

  const validateOtp = useCallback(async () => {
    setProcessing(true)
    try {
      const result = await authVerifyOtp(ensAddress!, otp)
      setJWT(result.jwt)
      console.log("jwt: ", result.jwt)
      if (result) {
        ensAnonymousLogin(info.value)
      }
      router.push("/")
      setOpenVerifyOtpModal(false)
    } catch (error: any) {
      console.error(error)
    }
    setProcessing(false);
  }, [otp])

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
      result = await authSendOtp(ensAddress!)
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

  const btnText = useMemo(() => {
    if (processing) {
      return otp ? "Verifying" : "Sending OTP Code";
    }
    return countdownValue ? "Verify" : "Send OTP Code";
  }, [countdownValue, otp, processing]);

  return (
    <>
      <HexlinkModal open={visible} onDismiss={onClose}>
        <div className='mt-2 w-full'>
          <div className='mb-4'>
            <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
              Confirm your ENS
            </Typography>
            <Typography weight="light" className='mt-4 text-center'>
              ENS:<br /><b>{info.value}</b>
            </Typography>
            <Typography weight="light" className='mt-4 text-center'>
              ENS Owner:<br /><b>{ensAddress}</b>
            </Typography>
            <Typography weight="light" className='mt-4 text-center'>
              Auth:<br /><b>wallet</b>
            </Typography>
          </div>
          {
            ensAddress == "0xBE129dD6cf10E2F9F187c33e7962Ab453F3DCdA6" ? (
              <Button
                as="a"
                onClick={() => setOpenVerifyOtpModal(true)}
                className='mt-8 mb-1'
              >
                Verify
              </Button>
            ) : (
              <ConnectButton ens={info.value} ensOwner={ensAddress!} updateParent={ifWrongWallet} />
            )
          }
        </div>
      </HexlinkModal>
      <HexlinkModal open={openAlertModal} onDismiss={closeAlertModal}>
        <div className='mt-2 w-full'>
          <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
            Alert
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            The selected account is not associated with domain <b>{info.value}</b>.<br/>
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            The expected account for this domain is <b>{ensAddress}</b>.
          </Typography>
          <Typography weight="light" className='mt-4 text-center'>
            Please check your wallet settings to ensure you have connected the correct Ethereum account. If you are not sure, you should reconnect your wallet and try again.
          </Typography>
          <Button
            as="a"
            onClick={closeAlertModal}
            className='mt-8 mb-1'
          >
            OK
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
  )
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