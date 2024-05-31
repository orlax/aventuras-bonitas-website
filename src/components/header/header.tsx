'use client'

import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from 'react';
import { HeaderMenuButton } from '../button';
import { useRouter } from 'next/navigation';
import { NAVIGATION } from '@/lib';
import Link from 'next/link';
import { fireAppStorage, fireStorageRef } from '@/services/firebase';
import { getDownloadURL } from 'firebase/storage';

type HeaderProps = {
    lang: any,
    dictionary: any,
    socialNetworks: {
        id: string;
        name: string;
        url: string;
    }[],
}

export const Header = ({ lang = "es", dictionary, socialNetworks }: HeaderProps) => {
    const router = useRouter();
    const menuItems = [
        {
            text: "game", 
            onClick: () => {
                toggleMenu();
                router.replace(`/${lang}/#${NAVIGATION.FEATURED_GAME}`);
            }
        },
        {
            text: "services",
            onClick: () => {
                toggleMenu();
                router.replace(`/${lang}/#${NAVIGATION.SERVICES}`);
            }
        },
        {
            text: "about",
            onClick: () => {
                toggleMenu();
                router.replace(`/${lang}/#${NAVIGATION.ABOUT_US}`);
            }
        },
        {
            text: "contact",
            onClick: () => {
                toggleMenu();
                router.push(`/${lang}/subscribe`);
            }
        },
    ];
    const [menuVisible, setMenuVisible] = useState(false);
    const [promotionalImage, setPromotionalImage] = useState('');
    const componentLoaded = useRef(false);

    useEffect(() => {
        if(!componentLoaded.current) {
            componentLoaded.current = true;
            getPromotionalImage()
        }
    }, []);

    const getPromotionalImage = async () => {
        const firePromoImage = fireStorageRef(fireAppStorage, `/assets/featured_game/header_promo.${lang}.png`);
        const image = await getDownloadURL(firePromoImage);
        setPromotionalImage(image);
    }

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        !menuVisible && document.body.classList.add('overflow-hidden');
        menuVisible && document.body.classList.remove('overflow-hidden');
    }

    return (
        <header className='flex flex-col relative'>
            <div className='flex flex-1 relative w-full justify-between py-3 2xl:px-[30%] lg:px-40 md:px-20 xs:px-5 z-20'>
                <div className='h-14 w-28 relative'>
                    <Link href={`/${lang}`}>
                        <Image
                            src={`/logo/with_name_logo.${lang}.png`}
                            alt="Nice Adventures Logo"
                            style={{
                                objectFit: 'contain',
                            }}
                            fill
                            priority
                        />
                    </Link>
                </div>
                <button className='ml-4 flex gap-1 items-center text-white' onClick={toggleMenu}>
                    <label className='md:block sm:hidden xs:hidden text-sm'>
                        {menuVisible ? dictionary.close : dictionary.menu}
                    </label>
                    {menuVisible ?
                    <XMarkIcon className='h-6 w-6 text-white'/>
                    :
                    <Bars3Icon className='h-6 w-6 text-white'/>
                    }
                </button>
            </div>
            {menuVisible &&
            <div className='header-menu absolute pt-20 h-screen w-full z-10'>
                <div className='bg-white w-full h-full flex 2xl:px-[30%] md:p-16 xs:py-4 xs:px-1 gap-4'>
                    <div className='flex-1 md:flex xs:hidden md:justify-center lg:justify-end'>
                        <div className='md:w-72 md:h-72 lg:w-96 rounded-lg relative'>
                            {promotionalImage &&
                            <Image
                                className='h-auto w-full'
                                src={promotionalImage}
                                alt="Header Promo"
                                style={{
                                    objectFit: 'contain',
                                }}
                                fill
                            />}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 md:justify-start xs:justify-between w-full'>
                        <ul className='flex flex-col gap-2'>
                            {menuItems.map((item, index) => (
                                <li className='flex flex-1' key={`header_menu_item_${index}`}>
                                    <HeaderMenuButton text={dictionary[item.text]} onClick={item.onClick}/>
                                </li>
                            ))}
                        </ul>
                        <ul className='flex items-center gap-5 px-3 md:justify-start xs:justify-between'>
                            {socialNetworks?.map((network) => (
                                <li key={`header_${network.id}`}>
                                    <a href={network.url} target='_blank' rel="noopener noreferrer">
                                        <span className='text-sm text-ab-gray hover:font-bold hover:text-ab-black'>
                                            {network.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>}
        </header>
    )
}