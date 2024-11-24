import { Player, PlayerKey } from "@/types/player";
import { Box, Button, Text } from "@/components/commons";
import { SortingSvg } from "@/components/svgs";
import styles from "./index.module.scss";
import Image from "next/image";
import { countryNames } from "@/constants/country";

interface TableProps {
  players: Player[] | { [key: string]: Player[] };
  loading: boolean;
  handleSortKey: (value: PlayerKey) => void;
}

const Table: React.FC<TableProps> = ({
  handleSortKey,
  players = [],
  loading = false,
}) => {
  return (
    <Box fd="column" gap="10px" className={styles.table}>
      <Box className={styles.tableHeader}>
        <Button disabled={loading} onClick={() => handleSortKey("rank")}>
          <Box>
            <Text color="gray">Ranking</Text>
            <SortingSvg />
          </Box>
        </Button>
        <Button disabled={loading} onClick={() => handleSortKey("username")}>
          <Box>
            <Text color="gray">Player Name</Text>
            <SortingSvg />
          </Box>
        </Button>
        <Button disabled={loading} onClick={() => handleSortKey("countrycode")}>
          <Box>
            <Text color="gray">Country</Text>
            <SortingSvg />
          </Box>
        </Button>
        <Button disabled={loading} onClick={() => handleSortKey("money")}>
          <Box>
            <Text color="gray">Money</Text>
            <SortingSvg />
          </Box>
        </Button>
      </Box>
      {Array.isArray(players)
        ? players?.map(({ id, rank, username, countrycode, money }) => {
            return (
              <Box gap="10px" key={id} className={styles.tableRow}>
                <Text>{rank}</Text>
                <Text>{username}</Text>
                <Box>
                  <Image
                    width={24}
                    height={24}
                    className={styles.countryImage}
                    src={`${process.env.NEXT_PUBLIC_FLAG_URL}${countrycode}.svg`}
                    alt="country flag"
                  />
                  <Text>{countryNames?.[countrycode]}</Text>
                </Box>
                <Text color="blue">{money}</Text>
              </Box>
            );
          })
        : Object.entries(players).map(([countrycode, players]) => (
            <Box
              fd="column"
              gap="10px"
              key={countrycode}
              className={styles.tableRowGroupContainer}
            >
              <Box
                fd="column"
                className={`${styles.tableRow} ${styles.tableRowCountry}`}
              >
                <Box>
                  <Image
                    width={24}
                    height={24}
                    className={styles.countryImage}
                    src={`${process.env.NEXT_PUBLIC_FLAG_URL}${countrycode}.svg`}
                    alt="country flag"
                  />
                  <Text>{countryNames?.[countrycode]}</Text>
                </Box>
              </Box>
              {players?.map(({ id, rank, username, money }) => (
                <Box gap="10px" key={id} className={styles.tableRow}>
                  <Text>{rank}</Text>
                  <Text>{username}</Text>
                  <div></div>
                  <Text color="blue">{money}</Text>
                </Box>
              ))}
            </Box>
          ))}
      {}
    </Box>
  );
};

export default Table;
