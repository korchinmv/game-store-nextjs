import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface LinkMoreProps {
  link: string;
  name: string;
}

function LinkMore({ name, link }: LinkMoreProps) {
  return (
    <Link
      className='flex items-center animation mb-[10px] md:mb-[20px] self-end text-[16px] md:text-[20px]'
      href={link}
    >
      {name}
      <MdOutlineKeyboardArrowRight size={30} />
    </Link>
  );
}

export default LinkMore;
