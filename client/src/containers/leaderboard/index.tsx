"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Input } from "@/components/commons";
import { Table } from "@/components/leaderboard";
import { Player, PlayerKey } from "@/types/player";
import styles from "./index.module.scss";
import { sortPlayers } from "@/components/leaderboard/utils";
import { countryNames } from "@/constants/country";

const LeaderboardContainer: React.FC = () => {
  const [sortKey, setSortKey] = useState<PlayerKey>("rank");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [inputSearchOptions, setInputSearchOptions] = useState<
    { text: string; id: string }[]
  >([]);
  const [rawData, setRawData] = useState<Player[]>([]);
  const [data, setData] = useState<Player[] | { [key: string]: Player[] }>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch("/api/top-players", {
          method: "GET",
          signal: controller.signal,
        });
        const { data } = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setData(data);
        setRawData(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err);
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

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        if (debouncedSearch.length < 3) return;

        setLoading(true);
        const response = await fetch(
          `/api/search-players?username=${debouncedSearch}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        const { data } = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setInputSearchOptions(
          data.map((player) => ({
            text: player.username + "-" + countryNames?.[player.countrycode],
            id: player.id,
          }))
        );
        setError(null);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err);
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
    setInputSearchOptions([]);
  };

  const handleSorting = (newSortKey: PlayerKey) => {
    const sortedData = sortPlayers(data, sortKey, newSortKey);
    setData(sortedData);
    setSortKey(newSortKey);
  };

  const getSearchedPersonAndNeighbors = async (id: string) => {
    try {
      const controller = new AbortController();

      setLoading(true);
      const response = await fetch(`/api/get-player-and-neighbors?id=${id}`, {
        method: "GET",
        signal: controller.signal,
      });

      const { data } = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const combinedPlayers = [
        ...rawData,
        ...data.filter(
          (player) => !rawData.some((rawPlayer) => rawPlayer.id === player.id)
        ),
      ];
      setData(combinedPlayers);
      setTimeout(() => {
        document?.getElementById(id)?.scrollIntoView({ block: "center" });
      }, 200);

      setError(null);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box fd="column" gap="10px">
      {error && <Heading>{"something went wrong try again"}</Heading>}
      <Heading className={styles.title}>Leaderboard</Heading>
      <Input
        inputSearchOptions={inputSearchOptions}
        onChange={handleChange}
        getSearchedPersonAndNeighbors={getSearchedPersonAndNeighbors}
        placeholder="Search"
      />
      <Table loading={loading} players={data} handleSortKey={handleSorting} />
    </Box>
  );
};

export default LeaderboardContainer;
