'use client'

import Image from "next/image"
import Link from "next/link"

export const Footer = ({
    currentYear,
    lang,
    dictionary,
    footerUrls = [],
    socialNetworks = [],
}:
{ 
    currentYear: number, 
    footerUrls: { url: string, text: string }[], 
    socialNetworks: { id:string, url: string }[], 
    lang: any, 
    dictionary: any
}) => {

    return (
        <footer className="flex px-8 py-5 gap-6
        md:flex-row xs:flex-col
        md:justify-around xs:justify-between bg-ab-black items-center">
            <div className='h-14 w-28 relative'>
                <Image 
                    src={`/logo/with_name_logo.${lang}.png`}
                    alt="Nice Adventures Logo"
                    style={{
                        objectFit: 'contain',
                    }}
                    fill
                    priority
                />
            </div>
            <ul className="flex gap-3 items-center md:flex-row xs:flex-col">
                {footerUrls.map((element, index) => (
                    <li key={`link_${index}`}>
                        <Link href={element.url}>
                            <span className="text-sm text-white font-semibold">
                                {element.text}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex md:gap-3 xs:gap-5 items-center">
                {socialNetworks.map((network) => (
                    <li key={`footer_${network.id}`} className='flex'> 
                        <a className="h-4" href={network.url} target='_blank' rel="noopener noreferrer">
                            <img 
                                className="h-full w-auto"
                                src={`/social_networks/${network.id}.png`} 
                                alt={network.id} 
                            />
                        </a>
                    </li>
                ))}
            </ul>
            <span className="text-xs">{`${dictionary?.company} ${currentYear}`}</span>
        </footer>
    )
}