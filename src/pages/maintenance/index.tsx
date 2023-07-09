const Maintenance = () => {
	return (
		<div className='flex min-h-screen w-full items-center justify-center'>
			<img
				src='/images/maintenance_background.png'
				alt='background'
				className='absolute left-0 top-0 h-full w-full object-cover'
			/>
			<img
				src='/images/maintenance.png'
				alt='maintenance'
				className='relative z-[2] max-w-[400px]'
			/>
			<img
				src='/images/desui_logo.png'
				className='absolute bottom-5 left-5 h-6'
			/>
		</div>
	);
};

export default Maintenance;
