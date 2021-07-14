import { useEffect, useState } from "react";
import moment from "moment";

export const useStoreReports = (data, filter) => {
  const [filteredData, setFilteredData] = useState([]);

  const { dateStart, dateEnd } = filter;

  useEffect(() => {
    if (dateStart && dateEnd) {
      let transactionFiltered = data?.filter((trx) => {
        let fdConverted = new Date(moment(dateStart).add(7, "hour"));
        let sdConverted = new Date(
          moment(dateEnd).add(1, "day").add(7, "hour")
        );

        let trxDate = new Date(trx.created_on);
        return trxDate >= fdConverted && trxDate <= sdConverted;
      });

      transactionFiltered && setFilteredData(transactionFiltered);
    } else {
      setFilteredData(data);
    }
  }, [dateStart, dateEnd, data]);

  return {
    data: filteredData,
  };
};
