import Link from "next/link";
import { Box, Text } from "@/components/commons";

export default function Home() {
  return (
    <Box fd="column">
      <Link href="/leaderboard">
        <Text>go to leaderboard</Text>
      </Link>
    </Box>
  );
}
