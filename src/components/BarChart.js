import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { ResponsiveBar } from '@nivo/bar';
import { getFullTeamName, getTeamCode, didTeamWin } from '../utils';
import "../styles/BarChart.css";

const BarChart = ({ 
  data,
  setIsLoading,
  setTeamData,
  setShowTeam
}) => {
  const [chartData, setChartData] = useState();

  // Used to send the team specific data over
  const generateTeamData = (teamCode) => {
    return data
      .filter(game => game.team1 === teamCode || game.team2 === teamCode)
  }

  useEffect(() => {
    setIsLoading(true);
    // Get all possible team codes and make a 
    // set out of it to make it unique
    let teamNames = data.map(game => game.team1);
    teamNames = Array.from(new Set(teamNames));

    // Calculate the total amount of wins based on the team code
    // Playoff wins are counted separately with the flag
    const getWinsByTeam = (teamCode, isPlayoff) => {
      const wins = data
        .filter(game => game.team1 === teamCode || game.team2 === teamCode)
        .filter(game => isPlayoff ? game.playoff !== "" : game.playoff === "")
        .reduce((sum, game) => {
          return sum + didTeamWin(game, teamCode);
        }, 0);

      return wins;
    }

    // Get data according to each team and then sort
    // in order of descending wins
    let barChartData = teamNames.map(team => {
      return {
        team: getFullTeamName(team),
        regularSeasonWins: getWinsByTeam(team, false),
        playoffWins: getWinsByTeam(team, true)
      }
    })

    barChartData = barChartData.sort((teamA, teamB) => {
      const totalWinsA = teamA.regularSeasonWins + teamA.playoffWins;
      const totalWinsB = teamB.regularSeasonWins + teamB.playoffWins;

      if (totalWinsA < totalWinsB) {
        return -1;
      }

      if (totalWinsA > totalWinsB) {
        return 1;
      }

      return 0;
    });

    setChartData(barChartData);
    setIsLoading(false);
  }, [data, setIsLoading])

  return (
    <div className="barChartContainer">
      <h2 className="section-heading">
        The winningest franchises of the NFL
      </h2>
      <Typography variant="body2" align="left" gutterBottom>
        Note 1: The New York Yanks and Dallas Texans both were defunct after the 1953 season.
        <br />
        Note 2: The Baltimore Colts technically became the Indianapolis Colts after the 1953 season (replacing the Dallas Texans), however the 
        Baltimore Colts listed on the bottom of this bar chart is a separate entity altogether. This might sound confusing but it 
        was a reflection of the post-WW2 era of the NFL. Refer to their <a href="https://en.wikipedia.org/wiki/History_of_the_Baltimore_Colts#NFL_Dallas_Texans" rel="noreferrer" target="_blank">Wikipedia</a> page for more info. 
        <br />
        Note 3: This includes the current season's data, which is valid up to and including 17th of September 2021. 
      </Typography>
      <ResponsiveBar
        data={chartData}
        keys={["regularSeasonWins", "playoffWins"]}
        indexBy="team"
        layout="horizontal"
        colors={{ scheme: 'nivo' }}
        margin={{ top: 0, right: 80, bottom: 60, left: 180 }}
        padding={0.4}
        maxValue={650}
        valueScale={{ type: "linear" }}
        animate={true}
        enableLabel={false}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total Wins (since the 1950 season)',
          legendPosition: 'middle',
          legendOffset: 44
        }}
        axisTop={null}
        axisRight={null}
        theme={{
          fontSize: "12",
        }}
        tooltip={({ id, value, color, indexValue }) => (
          <div
            style={{
              padding: 12,
              color,
              background: "#222222"
            }}
          >
            <strong>
              {indexValue}
            </strong>
            <br />
            {value} {id === "regularSeasonWins" ? "regular season wins" : "playoff wins"}
          </div>
        )}
        onClick={({ indexValue }) => {
          const teamCode = getTeamCode(indexValue);
          setTeamData({
            name: indexValue,
            teamCode,
            chartData: generateTeamData(teamCode)
          });
          setShowTeam(true);
        }}
      />
    </div>
  )
}

export default BarChart;