const Footer = () => {
	return (
		<footer className='relative z-[1]'>
			<div className='flex flex-col items-center justify-between space-y-3 px-5 pb-5 md:flex-row'>
				<div className='flex flex-1 items-center space-x-2'>
					<img src='/images/desui_logo.png' className='h-6' loading='lazy' />
					<a
						href='https://github.com/DeSuiLabs/DeSuiCoinFlip-Smart-Contract'
						rel='noreferrer'
						target='_blank'
					>
						<img
							src='/images/source_code.png '
							className='h-4'
							loading='lazy'
						/>
					</a>
				</div>
				<div className='flex space-x-2 text-base'>
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
				<div className='flex flex-1 flex-row-reverse gap-3'>
					<a
						href='https://twitter.com/desuilabs?s=21&t=rXuwazhB428wFHsSeJBjgQ'
						target='_blank'
						rel='noreferrer'
					>
						<img
							src='/images/twitter.png'
							className='h-4 w-auto cursor-pointer'
							loading='lazy'
						/>
					</a>
					<a
						href='https://discord.com/invite/2Cfm9gpTCu'
						target='_blank'
						rel='noreferrer'
					>
						<img
							src='/images/discord.png'
							className='h-4 w-auto cursor-pointer'
							loading='lazy'
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
