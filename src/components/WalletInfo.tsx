import { Button, Profile, mq } from '@ensdomains/thorin'
import { ConnectButton as ConnectButtonBase } from '@rainbow-me/rainbowkit'
import { useDisconnect } from 'wagmi'
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import styled, { css } from 'styled-components'

export function WalletInfo() {
  const { disconnect } = useDisconnect()
  const router = useRouter()

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
            router.push("/");
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
              // if (!connected) {
              //   return (
              //     <Button onClick={openConnectModal}>
              //       Connect
              //     </Button>
              //   )
              // }

              return (
                <>
                  <p>address: {account?.address}</p>
                  <p>ensName: {account?.ensName || undefined}</p>
                </>
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
