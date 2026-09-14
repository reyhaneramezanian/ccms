import { useRouter } from 'next/router';
import { FC } from 'react';
import { ICustomLinkProps } from './types.customLink';
import Link from 'next/link';

const CustomLink: FC<ICustomLinkProps> = ({ children, href, ...props }) => {
    const router = useRouter();

    if (router.pathname === href || href === '') return <>{children}</>;
    return (
        <Link href={href} passHref>
            <a {...props}>{children}</a>
        </Link>
    );
};

export default CustomLink;
