import type { NextPage } from "next";
import Map from "../components/map";

const Home: NextPage = () => {
  return <Map latitude={37.5642135} longitude={127.0016985} />;
};

export default Home;
