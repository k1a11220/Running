import type { NextPage } from "next";
import Maps from "../components/maps";

const Home: NextPage = () => {
  return <Maps latitude={37.5642135} longitude={127.0016985} />;
};

export default Home;
