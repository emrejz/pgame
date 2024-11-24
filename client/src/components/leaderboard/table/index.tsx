import { Player } from "@/types/player";
import { Box, Button, Text } from "@/components/commons";
import { SortingSvg } from "@/components/svgs";
import styles from "./index.module.scss";
import Image from "next/image";
import { countryNames } from "@/constants/country";

interface TableProps {
  players: Player[];
  loading: boolean;
}

const Table: React.FC<TableProps> = ({ players = [], loading = false }) => {
  return (
    <Box fd="column" gap="10px" className={styles.table}>
      <Box className={styles.tableHeader}>
        <Button disabled={loading}>
          <Box>
            <Text color="gray">Ranking</Text>
            <SortingSvg />
          </Box>
        </Button>
        <Button disabled={loading}>
          <Box>
            <Text color="gray">Player Name</Text>
            <SortingSvg />
          </Box>
        </Button>
        <Button disabled={loading}>
          <Box>
            <Text color="gray">Country</Text>
            <SortingSvg />
          </Box>
        </Button>
        <Button disabled={loading}>
          <Box>
            <Text color="gray">Money</Text>
            <SortingSvg />
          </Box>
        </Button>
      </Box>
      {players?.map(({ id, rank, username, countrycode, money }) => {
        return (
          <Box gap="10px" key={id.toString()} className={styles.tableRow}>
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
      })}
    </Box>
  );
};

export default Table;
