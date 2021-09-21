import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { getFullTeamName, didTeamWin } from '../utils';
import "../styles/LineGraph.css";

const LineGraph = ({ 
  data,
  setIsLoading,
  setShowTeam
}) => {
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    setIsLoading(true);
    // Basically prunes all and just finds the year
    const activeYears = [...new Set(data.chartData.map(item => item.date.split('-')[0]))].sort();

    // Calculate the total amount of wins based on the year
    const getWinsByYear = (year, isPlayoff) => {
      const wins = data.chartData
        .filter(game => game.date.split('-')[0] === year)
        .filter(game => isPlayoff ? game.playoff !== "" : game.playoff === "")
        .reduce((sum, game) => {
          return sum + didTeamWin(game, data.teamCode);
        }, 0);

      return wins;
    }

    let lineGraphData = [
      {
        id: "regularSeason",
        data: activeYears.map(year => {
          return {
            x: year,
            y: getWinsByYear(year, false)
          }
        })
      },
    ];

    setGraphData(lineGraphData);
    setIsLoading(false);
  }, [data, setIsLoading])

  return (
    <div className="lineGraphContainer">
      <h2 className="section-heading">
        {data.name} regular season wins per year
      </h2>
      
      <Stack spacing={2}>
        <Typography variant="body1" gutterBottom>
          Note: This includes the ongoing season's data, which is accurate up until 17th of September 2021.
        </Typography>
        <Button variant="contained" className="lineGraphButton" onClick={() => setShowTeam(false)}>
          Return to Main Screen
        </Button>
      </Stack>
      <ResponsiveLine
        data={graphData}
        margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
        xScale={{ type: 'linear', min: '1950', max: '2021' }}
        yScale={{ type: 'linear', min: '0', max: '16' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Year',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Wins',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        enablePoints={false}
        enableSlices="x"
        useMesh={true}
        theme={{
          fontSize: "11",
        }}
        sliceTooltip={({ slice }) => {
          return (
              <div
                  style={{
                      background: 'white',
                      padding: '9px 12px',
                      border: '1px solid #ccc',
                  }}
              >
                  {slice.points.map(point => (
                      <div
                        key={point.id}
                        style={{
                            color: point.serieColor,
                            padding: '3px 0',
                        }}
                      >
                        The {getFullTeamName(data.teamCode)} won {point.data.yFormatted} regular season games in {point.data.xFormatted}
                      </div>
                  ))}
              </div>
          )
      }}
      />
    </div>
  )
}

export default LineGraph;