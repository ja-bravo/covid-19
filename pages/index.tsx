import Map from "../components/map";
import Layout from "../components/layout";
import { Grid, Typography } from "@material-ui/core";
import Summary from "../components/summary";
import axios from "axios";
import ByCountry from "../components/byCountry";
import moment from "moment";
import LineChart from "../components/linechart";

const Home = ({ data, recovered, deaths, confirmed, daily }) => {
  return (
    <Layout>
      <Grid container>
        <Typography variant="h6" style={{ fontWeight: 100, marginBottom: 32 }}>
          Last updated on {moment(data.lastUpdate).format("HH:mm DD/MM/YYYY")}
        </Typography>
        <Summary
          cases={data.confirmed.value}
          deaths={data.deaths.value}
          recovered={data.recovered.value}
        />

        <Grid item xs={12}>
          <Map data={confirmed} />
        </Grid>

        <Grid item xs={12}>
          <LineChart data={daily} />
        </Grid>

        <ByCountry
          recovered={recovered}
          deaths={deaths}
          confirmed={confirmed}
        />
      </Grid>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const [summary, recovered, deaths, confirmed, daily] = await axios.all([
    axios.get("https://covid19.mathdro.id/api"),
    axios.get("https://covid19.mathdro.id/api/recovered"),
    axios.get("https://covid19.mathdro.id/api/deaths"),
    axios.get("https://covid19.mathdro.id/api/confirmed"),
    axios.get("https://covid19.mathdro.id/api/daily"),
  ]);

  return {
    data: summary.data,
    recovered: recovered.data,
    deaths: deaths.data,
    confirmed: confirmed.data,
    daily: daily.data,
  };
};

export default Home;
