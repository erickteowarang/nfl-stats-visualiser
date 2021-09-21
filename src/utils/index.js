import teams from '../data/nfl_teams.json';

// All utility/shared functions should go here

// Get the team name from the abbreviated code
// For teams that relocated, we will refer them by their latest location
// (i.e the San Diego Chargers will be referred to as the Los Angeles Chargers)
export const getFullTeamName = (teamCode) => {
  const teamDetails = teams.find(team => team.abr === teamCode);
  return teamDetails ? `${teamDetails.city} ${teamDetails.name}` : teamCode;
}

// The reverse of the above, find a team code based on the team name
export const getTeamCode = (teamName) => {
  const teamObject = teams.find(team => {
    const fullName = `${team.city} ${team.name}`;
    if (teamName === fullName) {
      return true;
    }

    return false;
  })

  return teamObject.abr;
}

// As the function name implies, checks if the team won that day
// If they're team1 in the data, then they are the home team
// team2 naturally means they are the away team
export const didTeamWin = (game, teamCode) => {
  if (
    (game.team1 === teamCode && parseInt(game.score1) > parseInt(game.score2)) ||
    (game.team2 === teamCode && parseInt(game.score2) > parseInt(game.score1))
  ) {
    return 1;
  }

  return 0;
}
