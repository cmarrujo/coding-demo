import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './GamesPlayed.scss';

const GamesPlayed = (props) => {
  const [losers, setLosers] = useState([]);
  const currentParticipant = props.current;
  const [selectedParticipant, setSelectedParticipant] = useState('');

  useEffect(() => {
    (async () => {
      const participants = await axios.get('http://localhost:3002/participants');
      const participantsData = [...Object.entries(participants.data)];
      

      participantsData.forEach((participant) => {
        if(parseInt(props.current) === parseInt(participant[1]['id'])) {
          setSelectedParticipant(`${participant[1]['First Name']}, ${participant[1]['Last Name']}`)
        }
      });

      const games = await axios.get(`http://localhost:3002/games`);
      const gamesData = [...Object.entries(games.data)];

      let gamesPlayedWon = [];
      let losersData = [];
      let gamesArray = [];

      if(props.current) {
        gamesData.forEach((game) => {
          const [id, data] = [...game];
          if(id === props.current) {
            gamesPlayedWon = data;
          }
        });
      }

      props.setSelectedParticipant(gamesPlayedWon);

      gamesPlayedWon.forEach((game, i) => {
        // eslint-disable-next-line
        const [id, plays] = [...participantsData[game.looser_id - 1]];
        losersData.push(plays);

        gamesArray.push([gamesPlayedWon[i].looser_id, gamesPlayedWon[i].looser_score, gamesPlayedWon[i].winner_score, `${losersData[i]['First Name']}, ${losersData[i]['Last Name']}`]);
      });
      
      setLosers(gamesArray);
    })();

  }, [currentParticipant, selectedParticipant]);

  return (
    <div className="games_played">
      <div className="games_played__column">
        {
          losers.map(([loserID, loserScore, winnerScore, participantName], index) => (
            <div className="games_played__column__group" key={index}>
              <div 
                className="games_played__row" 
                onClick={() => {
                  props.setModalActive(true);
                  props.setGamerInformation(
                    {
                      name: `${selectedParticipant}`, 
                      games: winnerScore, 
                      won: loserScore
                    });
                }
              }>
                <ul className="games_played__row">
                  <li className="games_played__row___field">{selectedParticipant}</li>
                  <li className="games_played__row___field">{winnerScore}</li>
                </ul>
              </div>
              <div 
                className="games_played__row" 
                onClick={() => {
                  props.setModalActive(true);
                  props.setGamerInformation(
                    {
                      name: `${participantName}`, 
                      games: winnerScore, 
                      won: loserScore
                    });
                  }
                }>
                <ul className="games_played__row">
                  <li className="games_played__row___field">{participantName}</li>
                  <li className="games_played__row___field">{loserScore}</li>
                </ul>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default GamesPlayed;