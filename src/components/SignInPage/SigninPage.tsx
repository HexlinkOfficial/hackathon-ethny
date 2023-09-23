import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { isAddress } from 'viem/utils'
import { Button, Card, Input, Spinner, EnsSVG, Heading, Typography } from '@ensdomains/thorin'
import { NextSeo } from 'next-seo'
import styled, { css } from 'styled-components'
import { useEnsAddress } from 'wagmi'
import { Container, Layout } from '@/components/templates'
import { RegisterModal } from '@/components/RegisterModal'
import { ConfirmENS } from '@/components/ConfirmENS'
import { useRouter } from "next/router"
import { normalizeInput } from "@/utils/validateInput"

export function SignInPage() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [username, setUsername] = useState({type: '', value: ''})
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openENSLoginModal, setOpenENSLoginModal] = useState(false);
  const debouncedInput = useDebounce(input, 500)

  const checkInput = () => {
    console.log("input: ", input)
    if (input == "") {
      console.log("empty!")
    } else {
      const result = normalizeInput(input)
      setUsername(result)
      if (result.type == "ens") {
        console.log("ens")
        setOpenENSLoginModal(true)
      } else if (result.type == "email") {
        console.log("email")
        setOpenRegisterModal(true)
      }
    }
  }

  return (
    <>
      <NextSeo title="Home" />

      <Layout>
        {/* Placeholder for the header */}
        <header />

        {/* Main content */}
        {/* <Container as="main" $variant="flexVerticalCenter" $width="large">
          <SvgWrapper>
            <EnsSVG />
          </SvgWrapper>

          <Heading level="1">ENS Frontend Examples</Heading>

          <ExamplesGrid>
            <Card title="Name/Address Input">
              <Typography color="textSecondary">
                Every address input should also accept ENS names.
              </Typography>

              <Button as="a" href="/input">
                View
              </Button>
            </Card>
          </ExamplesGrid>
        </Container> */}
        <Container as="main">
          <Card title="Username Input">
            <Input
              label="Email or ENS name"
              placeholder="peter@hexlink.io or peter.eth"
              // description={ensAddress && address}
              // suffix={ensAddressIsLoading && <Spinner />}
              onChange={(e) => setInput(e.target.value)}
            />


            {/* <Button disabled={!address} colorStyle="greenPrimary">
              {!address ? 'No Address' : 'Nice!'}
            </Button> */}
            <Button
              as="a"
              onClick={checkInput}
            >
              Continue
            </Button>
            {/* <Button as="a" href="/input">
              View
            </Button> */}
          </Card>
        </Container>

        {/* Placeholder for the footer */}
        <footer />
      </Layout>
      <RegisterModal
        visible={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        info={username}
      />
      <ConfirmENS 
        visible={openENSLoginModal}
        onClose={() => setOpenENSLoginModal(false)}
        info={username}
      />
    </>
  )
}

const SvgWrapper = styled.div(
  ({ theme }) => css`
    --size: ${theme.space['16']};
    width: var(--size);
    height: var(--size);

    svg {
      width: 100%;
      height: 100%;
    }
  `
)

const ExamplesGrid = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    gap: ${theme.space['4']};
    grid-template-columns: repeat(auto-fit, minmax(${theme.space['64']}, 1fr));
  `
)
