import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { useEffect, useRef } from "react";
import { IData } from "./byCountry";
import styled from "styled-components";
import Card from "./card";
import palette from "../utils/palette";

const Wrapper = styled(Card)`
  width: 100%;
  height: 400px;
  margin-bottom: 32px;
`;
am4core.useTheme(am4themes_animated);

interface IDaily {
  reportDate: number;
  mainlandChina: number;
  otherLocations: number;
  totalConfirmed: number;
  totalRecovered?: number;
  reportDateString: string;
  deltaConfirmed: number;
  deltaRecovered?: number;
}

const LineChart: React.FC<{ data: IDaily[] }> = ({ data }) => {
  const chartRef = useRef<am4charts.XYChart>();

  useEffect(() => {
    chartRef.current = am4core.create("chartdiv", am4charts.XYChart);
    chartRef.current.responsive = new am4core.Responsive();
    chartRef.current.responsive.enabled = true;
    // Create axes
    const dateAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    const valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());

    // Create series

    chartRef.current.cursor = new am4charts.XYCursor();
    // chartRef.current.cursor.snapToSeries = series;
    chartRef.current.cursor.xAxis = dateAxis;
    chartRef.current.scrollbarX = new am4core.Scrollbar();

    chartRef.current.legend = new am4charts.Legend();
    chartRef.current.legend.position = "bottom";

    chartRef.current.calculateRelativeSize();
  }, []);

  useEffect(() => {
    const confirmedSerie = chartRef.current.series.push(
      new am4charts.LineSeries()
    );
    confirmedSerie.dataFields.valueY = "value";
    confirmedSerie.dataFields.dateX = "date";
    confirmedSerie.tooltipText = "{value}";
    confirmedSerie.name = "Confirmed";
    confirmedSerie.stroke = am4core.color(palette.orange);
    confirmedSerie.strokeWidth = 3;
    confirmedSerie.tooltip.pointerOrientation = "vertical";

    confirmedSerie.data = data.map(d => ({
      date: d.reportDateString,
      value: d.totalConfirmed
    }));

    const recoveredSerie = chartRef.current.series.push(
      new am4charts.LineSeries()
    );
    recoveredSerie.name = "Recovered";
    recoveredSerie.stroke = am4core.color(palette.green);
    recoveredSerie.strokeWidth = 3;
    recoveredSerie.dataFields.valueY = "value";
    recoveredSerie.dataFields.dateX = "date";
    recoveredSerie.tooltipText = "{value}";
    recoveredSerie.tooltip.pointerOrientation = "vertical";

    recoveredSerie.data = data.map(d => ({
      date: d.reportDateString,
      value: d.totalRecovered || 0
    }));
  }, [data]);
  return (
    <Wrapper>
      <div
        id="chartdiv"
        key="chartdiv"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </Wrapper>
  );
};

export default LineChart;
