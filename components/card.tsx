import { Card as MCard, Grid, Typography } from "@material-ui/core";

const Card: React.FC<{
  xs?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  align?: string;
  justify?: string;
}> = ({ xs, md, lg, children, align, justify }) => (
  <Grid item xs={xs} md={md} lg={lg}>
    <MCard
      style={{
        alignItems: align ?? "center",
        minHeight: 130,
        justifyContent: justify ?? "center",
        padding: 8,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {children}
    </MCard>
  </Grid>
);

export default Card;
