import Card from "./card";
import { Grid, Typography, Divider, TextField } from "@material-ui/core";
import palette from "../utils/palette";
import numeral from "numeral";
import countries from "../utils/countries";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import { useState, useMemo } from "react";
import React from "react";

const Item = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 16px;
`;

const Items = styled.div`
  height: 300px;
  width: 100%;
  overflow-y: auto;
  margin-top: 16px;
`;

const FlagArea = styled.div`
  margin-right: 8px;
  display: inline;
`;

export interface IData {
  provinceState: "string";
  countryRegion: string;
  lastUpdate: number;
  lat: number;
  long: number;
  confirmed: number;
  recovered: number;
  deaths: number;
  active: number;
  iso2: string;
}

const MemoizedItems: React.FC<{
  data: IData[];
  search: string;
  type: "confirmed" | "deaths" | "recovered";
}> = React.memo(({ data, search, type }) => (
  <Items>
    {data
      .filter(
        c =>
          `${c.countryRegion.toLowerCase()}${
            c.provinceState ? c.provinceState.toLowerCase() : ""
          }`.indexOf(search.toLowerCase()) > -1
      )
      .map(c => (
        <Item key={`${c.provinceState}${c.countryRegion}${c.confirmed}`}>
          <FlagArea>
            <ReactCountryFlag
              style={{
                fontSize: "2em"
              }}
              countryCode={countries[c.countryRegion] || "W"}
            />
          </FlagArea>
          <Typography variant="body1" style={{ display: "inline" }}>
            {c.countryRegion}{" "}
            {c.provinceState &&
              c.provinceState !== c.countryRegion &&
              `(${c.provinceState})`}
          </Typography>

          <Typography
            variant="body1"
            style={{
              display: "inline",
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: 32
            }}
          >
            {numeral(c[type]).format("0,")}
          </Typography>
        </Item>
      ))}
  </Items>
));
const ByCountry: React.FC<{
  recovered: IData[];
  confirmed: IData[];
  deaths: IData[];
}> = ({ recovered, confirmed, deaths }) => {
  const [confirmedSearch, setConfirmedSearch] = useState("");
  const [deathSearch, setDeathSearch] = useState("");
  const [recoveredSearch, setRecoveredSearch] = useState("");

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      style={{ marginBottom: 32, marginTop: 32 }}
    >
      <Card xs={4} align="start">
        <Typography
          variant="h6"
          align="left"
          style={{ fontWeight: 500, color: palette.orange }}
        >
          Confirmed cases
        </Typography>

        <Divider style={{ width: "100%", marginBottom: 16 }} />

        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          size="small"
          fullWidth
          value={confirmedSearch}
          onChange={e => setConfirmedSearch(e.target.value)}
        />

        <MemoizedItems
          type="confirmed"
          data={confirmed}
          search={confirmedSearch}
        />
      </Card>

      <Card xs={4} align="start">
        <Typography
          variant="h6"
          align="left"
          style={{ fontWeight: 500, color: palette.red }}
        >
          Deaths
        </Typography>

        <Divider style={{ width: "100%", marginBottom: 16 }} />

        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          size="small"
          fullWidth
          value={deathSearch}
          onChange={e => setDeathSearch(e.target.value)}
        />

        <MemoizedItems type="deaths" data={deaths} search={deathSearch} />
      </Card>

      <Card xs={4} align="start">
        <Typography
          variant="h6"
          align="left"
          style={{ fontWeight: 500, color: palette.green }}
        >
          Recovered
        </Typography>

        <Divider style={{ width: "100%", marginBottom: 16 }} />

        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          size="small"
          fullWidth
          value={recoveredSearch}
          onChange={e => setRecoveredSearch(e.target.value)}
        />

        <MemoizedItems
          type="recovered"
          data={recovered}
          search={recoveredSearch}
        />
      </Card>
    </Grid>
  );
};

export default ByCountry;
