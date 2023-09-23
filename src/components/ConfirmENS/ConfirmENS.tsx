import { useEnsAddress } from 'wagmi'
import { HexlinkModal } from '../HexlinkModal'
import { Typography, Button, Spinner } from '@ensdomains/thorin'
import { ConnectButton } from '@/components/ConnectButton'

interface ConfirmENSProps {
  visible: boolean;
  onClose: () => void;
  info: any;
}

export function ConfirmENS(props: ConfirmENSProps) {
  const { visible, onClose, info } = props;

  const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: info.value,
    chainId: 1,
  })

  const ENSlogin = () => {
    console.log("ENS address: ", ensAddress)
  }

  return (
    <HexlinkModal open={visible} onDismiss={onClose}>
      <div className='mt-2 w-full'>
        <Typography fontVariant="extraLarge" weight="normal" className='text-center'>
          Confirm your ENS
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          ENS:<br /><b>{info.value}</b>
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          ENS Owner:<br />{ensAddressIsLoading ? <Spinner /> : ensAddress}
        </Typography>
        <Typography weight="light" className='mt-4 text-center'>
          Auth:<br /><b>wallet</b>
        </Typography>
        <ConnectButton ens={info.value} ensOwner={ensAddress!}/>
      </div>
    </HexlinkModal>
  )
}