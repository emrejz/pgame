"use client";

import { Box, Heading, Input } from "../../components";
import { Table } from "./components";
import styles from "./index.module.scss";

const Home: React.FC = () => {
  return (
    <Box fd="column" gap="10px">
      <Heading className={styles.title}>Leaderboard</Heading>
      <Input placeholder="Search" />
      <Table loading={false} players={[]} />
    </Box>
  );
};

export default Home;
