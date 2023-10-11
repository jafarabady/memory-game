const Item = ({ index, image, isShow, onClick,reset }) => {
  return (
    <div className="memory-game__item" onClick={onClick}>
      {isShow ? <img src={image} /> : index}
    </div>


  );
};

export default Item;
