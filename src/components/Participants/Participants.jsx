import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Participants.scss';

const Participants = (props) => {
  const [participants, setParticipants] = useState([]);
  const [gamesPlayedWon, setGamesPlayedWon] = useState([]);
  const currentParticipant = props.current;

  useEffect(() => {
    (async () => {
      const participants = await axios.get('http://localhost:3002/participants');
      const participantsData = [...Object.entries(participants.data)];

      const games = await axios.get(`http://localhost:3002/games`);
      const gamesData = [...Object.entries(games.data)];

      const setGamesPlayedWonArray = [];

      gamesData.forEach(game => {
        // eslint-disable-next-line
        const [id, games] = [...game];
        setGamesPlayedWonArray.push(games.length);
      });

      setParticipants(participantsData);
      setGamesPlayedWon(setGamesPlayedWonArray);
    })();

  }, [currentParticipant]);

  return (
    <div className="game_participants">
      <ul className="game_participants__header">
        <li className="game_participants__header___label">Participant</li>
        <li className="game_participants__header___label">Played/Won</li>
      </ul>
      {
        participants.map((participant, index) => {
          return (
            <div 
              key={participant[0]} 
              className="game_participants__details"
              data-active={parseInt(props.current) === parseInt(index + 1)}>

              <button 
                key={participant[0]} 
                className="game_participants__details___field"
                data-action="true"
                onClick={() => {
                    props.setModalActive(true);
                    props.setGamerInformation(
                      {
                        name: `${participant[1]['First Name']}, ${participant[1]['Last Name']}`, 
                        games: gamesPlayedWon[index], 
                        won: '5'
                      });
                  }
                }>
                <span>{participant[1]['First Name']}</span>, <span>{participant[1]['Last Name']}</span>
              </button>
              <div className="game_participants__details___field">
                <span>{gamesPlayedWon[index]}</span>
              </div>
              <button className="game_participants__details___field" 
                onClick={() => {props.setCurrent(participant[0])}}>
                <span>select</span>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Participants;