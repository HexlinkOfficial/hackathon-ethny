import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button } from '@ensdomains/thorin'
import { useEmailAnonymousLogin } from '@/hooks/useEmailAnonymousLogin'
import { useRouter } from "next/router"
import { useAlertMessage } from "@/hooks/useAlertMessage"
import { useCountDown } from "@/hooks/useCountDown"
import { authRegister, genAndSendOtpForDAuth, validateOtpForDAuth, authSign } from "@/services/auth"
import { useState, useEffect, useCallback, useMemo } from "react"
import { MuiOtpInput } from "mui-one-time-password-input"
import styled from "@emotion/styled"

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

interface WorkerRequest {
  name: string
  owner: string
  addresses?: Record<string, string | undefined> | undefined
  texts?: Record<string, string | undefined> | undefined
  contenthash?: string | undefined
  signature: {
    message: string
    hash: string
  }
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
  const ENSDomain = info.value.replace("@", "at").split(".")[0] + "2.offchaindemo.eth"

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const validateOtp = useCallback(async () => {
    setProcessing(true)
    try {
      const result = await validateOtpForDAuth(otp)
      setJWT(result.jwt)
      console.log("jwt: ", result.jwt)
      // register
      const r = await authRegister(
        info.value,
        ENSDomain,
        result.jwt)
      console.log(r)
      // assign ENS
      const r2 = await authSign(
        r.account,
        "Register " + ENSDomain,
        result.jwt
      )

      const requestBody: WorkerRequest = {
        name: ENSDomain,
        owner: r.account!,
        addresses: { '60': r.account },
        texts: undefined,
        signature: {
          hash: r2,
          message: "Register " + ENSDomain,
        },
      }
      /** For 201 */
      type UserCreated = { id: string; name: string };

      /** For 400 */
      type BadRequest = { code: "bad_request"; message: string };

      /** Response type intersection */
      type UserResponse =
        | (Omit<Response, "json"> & {
          status: 201;
          json: () => UserCreated | PromiseLike<UserCreated>;
        })
        | (Omit<Response, "json"> & {
          status: 400;
          json: () => BadRequest | PromiseLike<BadRequest>;
        });

      /** Marshalling stream to object with narrowing */
      const marshalResponse = (res: UserResponse) => {
        if (res.status === 201) return res.json();
        if (res.status === 400) return res.json();
        return Error("Unhandled response code");
      };

      /** Coerce Response to UserResponse */
      const responseHandler = (response: Response) => {
        const res = response as UserResponse;
        return marshalResponse(res);
      };

      const resultData = fetch(`https://ens-gateway.gregskril.workers.dev/set`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      }).then((res) => responseHandler(res));

      console.log(await resultData)

      emailAnonymousLogin(info.value, r.account)
      router.push("/")
      setOpenVerifyOtpModal(false)
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
      setOpenVerifyOtpModal(true)
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
            ENS registered:<br /><b>{ENSDomain}</b>
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