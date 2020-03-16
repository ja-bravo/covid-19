import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { IData } from "./byCountry";
import palette from "../utils/palette";

am4core.useTheme(am4themes_animated);

const Wrapper = styled(Card)`
  width: 100%;
  height: 400px;
  margin-bottom: 32px;
`;

const Map: React.FC<{ data: IData[] }> = ({ data }) => {
  const chartRef = useRef<am4maps.MapChart>();
  const imageSeriesRef = useRef<am4maps.MapImageSeries>();
  const circle = useRef<am4core.Circle>();

  useEffect(() => {
    chartRef.current = am4core.create("mapdiv", am4maps.MapChart);
    chartRef.current.geodata = am4geodata_worldLow;
    chartRef.current.projection = new am4maps.projections.Miller();
    const polygonSeries = chartRef.current.series.push(
      new am4maps.MapPolygonSeries()
    );
    polygonSeries.useGeodata = true;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.polygon.fillOpacity = 0.6;

    const hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chartRef.current.colors.getIndex(0);
    imageSeriesRef.current = chartRef.current.series.push(
      new am4maps.MapImageSeries()
    );
    imageSeriesRef.current.mapImages.template.propertyFields.longitude =
      "longitude";
    imageSeriesRef.current.mapImages.template.propertyFields.latitude =
      "latitude";
    imageSeriesRef.current.mapImages.template.tooltipText = `
    {title}

    Confirmed: {confirmed}
    Deaths: {deaths}
    Recovered: {recovered}
    `;
    imageSeriesRef.current.mapImages.template.propertyFields.url = "url";

    circle.current = imageSeriesRef.current.mapImages.template.createChild(
      am4core.Circle
    );
    circle.current.radius = 2;
    circle.current.propertyFields.fill = "color";
  }, []);

  useEffect(() => {
    const averageConfirmed =
      data.reduce((prev, data) => data.confirmed + prev, 0) / data.length;

    imageSeriesRef.current.data = data.map(d => ({
      title: d.provinceState
        ? `${d.provinceState} (${d.countryRegion})`
        : d.countryRegion,
      confirmed: d.confirmed,
      deaths: d.deaths,
      recovered: d.recovered,
      longitude: d.long,
      latitude: d.lat,
      color:
        d.confirmed > averageConfirmed
          ? am4core.color(palette.red)
          : am4core.color(palette.green)
    }));
  }, [data]);
  return (
    <Wrapper elevation={2}>
      <div
        id="mapdiv"
        key="mapdiv"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </Wrapper>
  );
};

export default Map;
