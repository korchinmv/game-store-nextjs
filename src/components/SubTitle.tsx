export interface TitleProps {
  name: string;
}

const SubTitle = ({ name }: TitleProps) => {
  return (
    <h2 className='text-center mb-[20px] text-[26px] md:text-[34px] lg:text-[44px] underline underline-offset-[4px]'>
      {name}
    </h2>
  );
};
export default SubTitle;
