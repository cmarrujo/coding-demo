import './Modal.scss';

const Modal = (props) => {
  const {name, games, won} = {...props.gamerInformation};

  return (
    <div className="game_modal" data-active={props.modalActive}>
      <div className="game_modal__content">
        <div className="game_modal__close"
          onClick={() => {props.setModalActive(false)}}>X</div>
        <h1>{name}</h1>
        <p>{`${games}/${won}`}</p>
        <p>picture</p>
      </div>
    </div>
  )
}

export default Modal;