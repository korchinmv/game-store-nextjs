import Link from "next/link";

interface GenreCardProps {
  name: string;
  bgImage: string;
}

const GenreCard = ({ name, bgImage }: GenreCardProps) => {
  return (
    <li className='bg-[--bg-dark-green] rounded-xl hover:text-[--accent-color]'>
      <Link className='outline-none ' href={"/"}>
        <article className='p-[20px] border-solid border-[2px] rounded-xl ease-out duration-300 hover:border-[--accent-color]'>
          <h4 className='text-center'>{name}</h4>
        </article>
      </Link>
    </li>
  );
};
export default GenreCard;
