interface GameCardProps {
  name: string;
}

const GameCard = ({ name }: GameCardProps) => {
  return (
    <li>
      <article>
        <h3>{name}</h3>
      </article>
    </li>
  );
};
export default GameCard;
