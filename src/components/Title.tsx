import { TitleProps } from "./SubTitle";

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className="text-center text-[26px] md:text-[34px] lg:text-[44px] w-[250px] leading-[1.2] mb-[30px] sm:mb-0">
      {name}
    </h1>
  );
};
export default Title;
