/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { toggleColorScheme } from 'src/lib/color-scheme';
import Logo from '../../public/logo.svg';
import { Link } from './components/link';
import style from './header.module.scss';

export function Header() {
    return (
        <>
            <div className={style.headerSpacer} />
            <header className={style.header}>
                <div>
                    <Link
                        className={style.logo}
                        href="/"
                    >
                        <Logo />
                    </Link>

                    <Link
                        className={style.docLink}
                        href="/docs/faq"
                    >
                        How to upscale
                    </Link>

                    <span className={style.spacer}></span>

                    <Link
                        external
                        className={style.iconLink}
                        href="https://github.com/OpenModelDB/open-model-database"
                    >
                        <FaGithub />
                    </Link>
                    <Link
                        external
                        className={style.iconLink}
                        href="https://discord.gg/enhance-everything-547949405949657098"
                    >
                        <FaDiscord />
                    </Link>
                    <button
                        className={style.lightThemeButton}
                        onClick={toggleColorScheme}
                    >
                        <MdLightMode />
                    </button>
                    <button
                        className={style.darkThemeButton}
                        onClick={toggleColorScheme}
                    >
                        <MdDarkMode />
                    </button>
                </div>
            </header>
        </>
    );
}
