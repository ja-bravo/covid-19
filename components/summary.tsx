import Card from "./card";
import { Grid, Typography } from "@material-ui/core";
import palette from "../utils/palette";
import numeral from "numeral";

const Summary: React.FC<{
  deaths: number;
  recovered: number;
  cases: number;
}> = ({ deaths, cases, recovered }) => (
  <Grid container spacing={2} direction="row" style={{ marginBottom: 32 }}>
    <Card xs={4}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", color: palette.orange }}
      >
        {numeral(cases).format("0,")}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{ color: palette.orange, fontWeight: 100 }}
      >
        Confirmed cases
      </Typography>
    </Card>

    <Card xs={4}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", color: palette.red }}
      >
        {numeral(deaths).format("0,")}{" "}
        <span style={{ fontWeight: 100, fontSize: 18 }}>{`(${numeral(
          (deaths / cases) * 100
        ).format("0.0")}%)`}</span>
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{ color: palette.red, fontWeight: 100 }}
      >
        Deaths
      </Typography>
    </Card>

    <Card xs={4}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", color: palette.green }}
      >
        {numeral(recovered).format("0,")}{" "}
        <span style={{ fontWeight: 100, fontSize: 18 }}>{`(${numeral(
          (recovered / cases) * 100
        ).format("0.0")}%)`}</span>
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{ color: palette.green, fontWeight: 100 }}
      >
        Recovered
      </Typography>
    </Card>
  </Grid>
);

export default Summary;
