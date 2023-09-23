import { HomePage } from "@/components/HomePage";
import { NoSsr } from "@mui/material";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <NoSsr>
      <HomePage />
    </NoSsr>
  );
}