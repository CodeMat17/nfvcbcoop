import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <div className='p-5 sticky top-0 z-50 bg-gray-100/20 backdrop-filter backdrop-blur-md dark:bg-gray-950/20'>
      <div className='w-full max-w-6xl mx-auto flex items-center justify-between'>
        <Image
          alt='logo'
          priority
          width={40}
          height={40}
          src='/coop-logo.webp'
          className='rounded'
        />

        <div className='flex items-center gap-3'>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
