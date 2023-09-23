import { useEnsAddress } from 'wagmi'
import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button, Spinner } from '@ensdomains/thorin'
import { ConnectButton } from '@/components/ConnectButton'
import { useState, useEffect } from "react"

interface ConfirmENSProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

export function ConfirmENS(props: ConfirmENSProps) {
  const { visible, onClose, info } = props
  const [openAlertModal, setOpenAlertModal] = useState(false)

  const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: info.value,
    chainId: 1,
  })

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
              ENS Owner:<br /><b>{ensAddressIsLoading ? <Spinner /> : ensAddress}</b>
            </Typography>
            <Typography weight="light" className='mt-4 text-center'>
              Auth:<br /><b>wallet</b>
            </Typography>
          </div>
          <ConnectButton ens={info.value} ensOwner={ensAddress!} updateParent={ifWrongWallet} />
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
    </>
  )
}