import { useMemo } from "react";
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import { Container, Layout } from '@/components/templates'
import { Card, Typography, Button } from '@ensdomains/thorin'
import * as S from "./styled.HomePage"
import { useCopyToClipboard } from "react-use"
import { useAlertMessage } from "@/hooks/useAlertMessage"
import { getCroppedAddress } from "@/utils/getCroppedAddress"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useClearUserInfo } from "@/hooks/useClearUserInfo"
import { useRouter } from "next/router"
import { ConnectButton } from '@/components/ConnectButton'
import { WalletInfo } from '@/components/WalletInfo'

export function HomePage() {
  const userInfo = useGetUserInfo()
  const copyToClipboard = useCopyToClipboard()[1]
  const { showMessage, message } = useAlertMessage()
  const clearUserInfo = useClearUserInfo()
  const router = useRouter()

  const croppedAddress = useMemo(() => {
    return userInfo && userInfo.address.length > 28
      ? getCroppedAddress(userInfo.address)
      : userInfo?.address;
  }, [userInfo]);

  return (
    <>
      <Layout>
        <Container as="main">
          {userInfo?.idType == "mailto" ? (
            <Card title="User Account">
              <S.UserAddress
                className="flex items-center justify-between ml-2"
                onClick={() => {
                  if (!userInfo?.address) {
                    return;
                  }
                  copyToClipboard(userInfo.address);
                  showMessage({
                    messageBody: "Copied",
                  });
                }}
              >
                <Typography>{croppedAddress}</Typography>
                <ContentCopyIcon className="ml-2" />
              </S.UserAddress>
            </Card>
          ) : (
            <WalletInfo />
          )}
          <Button
            colorStyle="redPrimary"
            onClick={() => {
              clearUserInfo();
              router.push("/signin");
            }}
          >
            Logout
          </Button>
        </Container>
      </Layout>
    </>
  )
}