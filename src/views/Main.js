import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import BarChart from '../components/BarChart';
import nflGameData from '../data/nfl_games_updated.json';
import '../styles/Main.css';
import LineGraph from '../components/LineGraph';

const Main = () => {
  const [data, setData] = useState([]);
  // Display loader or not
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState();
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    setData(nflGameData);
    setIsLoading(false);
  }, []); // [] means just do this once, after initial render

  return (
    <Container>
      <div className="introText">
        <Typography variant="body1" gutterBottom>
          101 years ago, almost to the day, the American Professional Football Assocation 
          was founded at a dealership in Canton, Ohio. It would be renamed in 1922 to what is
          currently known as the NFL. Of the 20 original franchises, only 2 have remained to this day -- The Chicago Bears and the Arizona Cardinals. 
        </Typography>
        <Typography variant="body1" gutterBottom>  
          Due to the lack of quality data available to me, 
          I have limited all the data in this webpage to be from the <strong>1950 season onwards</strong>.
        </Typography>
        <Typography variant="body1" gutterBottom>  
          Feel free to click on the various charts and graphs to learn more about each team.
        </Typography>
      </div>
      { isLoading ? (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <>
          {showTeam && teamData ? (
            <LineGraph
              data={teamData}
              setIsLoading={setIsLoading}
              setShowTeam={setShowTeam}
            />
          ) : (
            <BarChart 
              data={data}
              setIsLoading={setIsLoading}
              setTeamData={setTeamData}
              setShowTeam={setShowTeam}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Main;