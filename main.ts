import axios from "axios";
import "dotenv/config";

type StockType = { warehouseName: string };

const SELLER_API = process.env.SELLER_API || "";
const BASE_WILDBERRIES_URL = process.env.WILDBERRIES_URL;

const fetch = async (url: string, api: string) => {
  try {
    return (await axios.get(url, { headers: { Authorization: api } })).data;
  } catch (e) {
    console.log(e);
  }
};

const filterWarehouseStocks =
  <T extends StockType>(warehouseName: string) =>
  (stock: T): boolean => {
    return warehouseName === stock.warehouseName;
  };

const WAREHOUSES_STOCKS_URL = BASE_WILDBERRIES_URL + "api/v1/supplier/stocks";
const KAZAN_WB = "Казань WB";

(async () => {
  const res: StockType[] = await fetch(WAREHOUSES_STOCKS_URL, SELLER_API);
  const stocks = res.filter(filterWarehouseStocks(KAZAN_WB));
  console.log(stocks);
})();
