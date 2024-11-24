"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Input } from "@/components/commons";
import { Table } from "@/components/leaderboard";
import { Player, PlayerKey } from "@/types/player";
import styles from "./index.module.scss";
import { sortPlayers } from "@/components/leaderboard/utils";

const LeaderboardContainer: React.FC = () => {
  const [sortKey, setSortKey] = useState<PlayerKey>("rank");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [data, setData] = useState<Player[] | { [key: string]: Player[] }>([]);
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
        const a = await response.json();
        const { data } = a;
        if (data.error) {
          throw new Error(data.error);
        }
        setData(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        if (debouncedSearch.length < 3) return;

        setLoading(true);
        const response = await fetch(`/api/players?search=${debouncedSearch}`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setData(data);
        setError(null);
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
  }, [debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSorting = (newSortKey: PlayerKey) => {
    const sortedData = sortPlayers(data, sortKey, newSortKey);
    setData(sortedData);
    setSortKey(newSortKey);
  };

  return (
    <Box fd="column" gap="10px">
      {error && <Heading>{"something went wrong try again"}</Heading>}
      <Heading className={styles.title}>Leaderboard</Heading>
      <Input onChange={handleChange} placeholder="Search" />
      <Table loading={loading} players={data} handleSortKey={handleSorting} />
    </Box>
  );
};

export default LeaderboardContainer;
