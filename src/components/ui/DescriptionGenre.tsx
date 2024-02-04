interface DescriptionGenreProps {
  text: string;
}

const DescriptionGenre = ({ text }: DescriptionGenreProps) => {
  return <p className='mb-[15px] md:mb-[25px]'>{text}</p>;
};

export default DescriptionGenre;
