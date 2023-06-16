import { ReactComponent as MyStenLabsIcon } from 'src/assets/icons/mystenlabs.svg';
import { ReactComponent as MyStenLabsText } from 'src/assets/icons/mystenlabs-text.svg';

const Footer = () => {
  return (
    <footer style={{ zoom: '0.7' }} className='relative z-[1]'>
      <div className='flex justify-between px-10 pb-10'>
        <div className='flex items-center space-x-2'>
          <img src='/images/desui_logo.png' className='h-10' />
          <img src='/images/source_code.png ' className='h-6' />
        </div>
        <div className='flex space-x-4 text-2xl'>
          <a
            href='https://docs.desuiflip.io/faqs'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            faq
          </a>
          <span>|</span>
          <a
            href='https://docs.desuiflip.io/how-to-play'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            how to play
          </a>
          <span>|</span>
          <a
            href='https://docs.desuiflip.io/flip-responsibly'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            Flip responsibly
          </a>
        </div>
        <div className='flex gap-5'>
          <a
            href='https://twitter.com/desuilabs?s=21&t=rXuwazhB428wFHsSeJBjgQ'
            target='_blank'
            rel='noreferrer'
          >
            <img src='/images/twitter.png' className='h-7 w-auto cursor-pointer' />
          </a>
          <a href='https://discord.gg/vdgXN7XZmG' target='_blank' rel='noreferrer'>
            <img src='/images/discord.png' className='h-7 w-auto cursor-pointer' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
