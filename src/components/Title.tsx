interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className='text-center mb-[10px] text-[24px] md:text-[34px] lg:text-[44px] underline underline-offset-[4px]'>
      {name}
    </h1>
  );
};
export default Title;
