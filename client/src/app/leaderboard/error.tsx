"use client";

import { Box, Button, Text, Heading } from "@/components/commons";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Box fd="column">
      <Heading>{"Something went wrong!"}</Heading>
      <Button onClick={() => reset()}>
        <Text>try again</Text>
      </Button>
    </Box>
  );
}
