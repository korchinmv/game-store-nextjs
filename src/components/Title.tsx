import { TitleProps } from "./SubTitle";

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className='text-left uppercase leading-none text-[32px] md:text-[38px] lg:text-[48px] w-[250px] leading-[1.2] mb-[20px] sm:mb-[30px] w-full'>
      {name}
    </h1>
  );
};
export default Title;
