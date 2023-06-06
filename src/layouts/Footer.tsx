const Footer = () => {
  return (
    <footer style={{ zoom: '0.7' }}>
      <div className='px-10 pb-10'>
        <div className='mt-auto flex gap-5'>
          <a href='https://discord.gg/vdgXN7XZmG' target='_blank' rel='noreferrer'>
            <img src='/images/discord.png' className='h-7 w-auto cursor-pointer brightness-0' />
          </a>
          <a
            href='https://twitter.com/desuilabs?s=21&t=rXuwazhB428wFHsSeJBjgQ'
            target='_blank'
            rel='noreferrer'
          >
            <img src='/images/twitter.png' className='h-7 w-auto cursor-pointer brightness-0' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
