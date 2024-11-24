"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Input } from "@/components/commons";
import { Table } from "@/components/leaderboard";
import { Player } from "@/types/player";
import styles from "./index.module.scss";

const LeaderboardContainer: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch("/api/players", {
          method: "GET",
          signal: controller.signal,
        });
        const { data } = await response.json();
        setData(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <Box fd="column" gap="10px">
      <Heading className={styles.title}>Leaderboard</Heading>
      <Input onChange={handleChange} placeholder="Search" />
      <Table loading={loading} players={data} />
    </Box>
  );
};

export default LeaderboardContainer;
