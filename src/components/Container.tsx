import { Children } from "@/types/Children";

const Container = ({ children }: Children) => {
  return <div className='container mx-auto px-4'>{children}</div>;
};

export default Container;
