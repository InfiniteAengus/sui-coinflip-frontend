import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';

import type { ModalProps } from 'src/@types/global';
import API from 'src/api';
import { checkEmail } from 'src/utils/helper';

import ModalWrapper from '../Wrapper/ModalWrapper';

const PopUp: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
	const [email, setEmail] = useState<string>('');

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
	};

	const submit = async () => {
		if (!checkEmail(email) || email === '') {
			toast.error('Please enter a valid email address');
			return;
		}

		await API.postAddEmail(email)
			.then(resp => {
				if (resp.status === 201) {
					toast.success('Email successfully added!');
					closeModal();
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<Modal
			ariaHideApp={false}
			closeTimeoutMS={200}
			isOpen={isOpen}
			onRequestClose={closeModal}
		>
			<ModalWrapper>
				<div className='h-full w-full overflow-hidden rounded-[10px] border-2 border-pink bg-black/70'>
					<button
						className='absolute right-5 top-5 z-10 flex'
						onClick={() => closeModal()}
					>
						<img
							src='/images/close-window.png'
							alt='close'
							className='anim h-5 w-5 cursor-pointer hover:opacity-70 md:h-8 md:w-8'
						/>
					</button>
					<div className='relative flex flex-col items-center justify-center'>
						<img
							src='images/advertisement.jpg'
							alt='advertisement'
							className='h-[400px] w-[calc(100vw-50px)] max-w-none object-cover sm:w-[600px] lg:h-auto lg:w-[900px] xl:w-[1100px]'
						/>
						<div className='absolute top-4 flex w-full flex-col items-center font-["Poppins"] font-semibold md:top-8 md:tracking-wide'>
							<p className='text-xl md:text-2xl lg:text-3xl'>the</p>
							<p className='text-3xl md:text-4xl lg:text-5xl'>
								Home for winners
							</p>
							<button className='anim flex h-9 w-fit items-center justify-center rounded-[10px] bg-pink px-5 py-2 font-["Poppins"] text-base lg:text-xl'>
								coming soon
							</button>
						</div>
						<div className='flex flex-col items-center gap-4 px-2 py-4 lg:flex-row'>
							<div className='flex flex-col font-["Poppins"] lowercase'>
								<p className='text-2xl font-semibold first-letter:uppercase'>
									Be the first to win big!
								</p>
								<p className='first-letter:uppercase'>
									Sign-up for free tickets and exclusive discounts
								</p>
							</div>
							<div className='flex w-full flex-col items-center gap-4 md:w-auto md:flex-row lg:flex-row xl:gap-8'>
								<input
									type='text'
									value={email}
									onChange={handleEmailChange}
									className='h-fit w-full rounded-[10px] border-2 border-pink bg-black px-2 py-2 font-["Poppins"] text-base font-normal md:w-[130%]'
								/>
								<button
									className='anim flex h-8 w-full items-center justify-center rounded-[10px] bg-pink font-["Poppins"] text-base font-semibold hover:bg-pink/60 md:w-[190px]'
									onClick={submit}
								>
									submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</ModalWrapper>
		</Modal>
	);
};

export default PopUp;
