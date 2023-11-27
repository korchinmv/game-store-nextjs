import { IoCartOutline } from "react-icons/io5";
import { FC } from "react";

const Cart: FC = () => {
  return (
    <button className='animation' aria-label='Go to the cart page'>
      <IoCartOutline size='30' />
    </button>
  );
};

export default Cart;
