import React, {useState} from 'react';
import Participants from './components/Participants/Participants';
import GamesPlayed from './components/GamesPlayed/GamesPlayed';
import Modal from './components/Modal/Modal';

import './my-games.scss';

const MyGamesApp = () => {
  const [current, setCurrent] = useState();
  const [modalActive, setModalActive] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [gamerInformation, setGamerInformation] = useState({});

  return (
    <div className="my_games">
      <Modal 
        modalActive={modalActive}
        setModalActive={setModalActive}
        gamerInformation={gamerInformation} />
        
      <Participants 
        modalActive={modalActive} 
        setModalActive={setModalActive} 
        current={current} 
        setCurrent={setCurrent} 
        setGamerInformation={setGamerInformation}
        selectedParticipant={selectedParticipant} />
      
      <GamesPlayed 
        modalActive={modalActive} 
        setModalActive={setModalActive} 
        current={current} 
        setGamerInformation={setGamerInformation}
        setSelectedParticipant={setSelectedParticipant} />
    </div>
  );
}

export default MyGamesApp;
