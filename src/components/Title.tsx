interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className='text-center mb-5 text-[24px] lg:text-[34px]'>{name}</h1>
  );
};
export default Title;
