import { Button, Profile, mq } from '@ensdomains/thorin'
import { ConnectButton as ConnectButtonBase } from '@rainbow-me/rainbowkit'
import { useDisconnect } from 'wagmi'
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import styled, { css } from 'styled-components'
import { useENSAnnoymousLogin } from '@/hooks/useENSAnnoymousLogin'

// const StyledButton = styled(Button)`
//   ${({ theme }) => css`
//     width: fit-content;

//     ${mq.xs.min(css`
//       min-width: ${theme.space['45']};
//     `)}
//   `}
// `

interface connectButtonprops {
  ens: string
  ensOwner: string
  updateParent: (status: boolean) => void
}

export function ConnectButton(props: connectButtonprops) {
  const { ens, ensOwner, updateParent } = props;
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const ensAnonymousLogin = useENSAnnoymousLogin()

  return (
    <ConnectButtonBase.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        useEffect(() => {
          if (connected) {
            if (account.address == ensOwner) {
              ensAnonymousLogin(ens)
              router.push("/");
            } else {
              console.log("wrong address")
              updateParent(false)
              disconnect()
            }
          }
        }, [connected])

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal}>
                    Connect
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    shape="rounded"
                    colorStyle="redPrimary"
                    onClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                )
              }

              return (
                // <Profile
                //   address={account.address}
                //   ensName={account.ensName || undefined}
                //   avatar={account.ensAvatar || undefined}
                //   onClick={openAccountModal}
                //   dropdownItems={[
                //     {
                //       label: 'Copy Address',
                //       color: 'text',
                //       onClick: () => copyToClipBoard(account.address),
                //     },
                //     {
                //       label: 'Disconnect',
                //       color: 'red',
                //       onClick: () => disconnect(),
                //     },
                //   ]}
                // />
                <></>
              )
            })()}
          </div>
        )
      }}
    </ConnectButtonBase.Custom>
  )
}

const copyToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
