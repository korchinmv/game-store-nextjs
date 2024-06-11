interface ButtonProps {
  text: string;
  label: string;
  handleClick: () => void;
}

const Button = ({ text, label, handleClick }: ButtonProps) => {
  return (
    <button onClick={handleClick} aria-label={label}>
      {text}
    </button>
  );
};

export default Button;
