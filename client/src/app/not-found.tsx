import Link from "next/link";
import { Box, Heading, Text } from "@/components/commons";

export default function NotFound() {
  return (
    <Box fd="column">
      <Heading as="h1">Not Found</Heading>
      <Text>Could not find requested resource</Text>
      <Link href="/">
        <Text>Return Home</Text>
      </Link>
    </Box>
  );
}
