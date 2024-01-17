import { Children } from "@/types";

const Container = ({ children }: Children) => {
  return <div className='container mx-auto px-4'>{children}</div>;
};

export default Container;
