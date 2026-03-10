'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

enum TabColor {
    ACTIVE = 'bg-white transition-[background] duration-150',
    INACTIVE = 'bg-[#d1a3ff] text-white shadow-[inset_0px_-3px_10px_1px_#0000001f] transition-[background] duration-150'
}

enum TabName {
    ONE = '/partone',
    TWO = '/parttwo'
}

function Tabs() {

    const pathName = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const tabClasses = (tabName: TabName) => {
        const isActive = !mounted || pathName.startsWith(tabName);
        return `h-full grow flex items-center p-4 cursor-pointer rounded-t-[1rem] ${isActive ? TabColor.ACTIVE : TabColor.INACTIVE}`;
    } 

    return (
        <div className="flex h-15 gap-2">
            <Link href={TabName.ONE} className={tabClasses(TabName.ONE)}>
                <h2>
                    Part 1
                </h2>
            </Link>
            <Link href={TabName.TWO} className={tabClasses(TabName.TWO)}>
                <h2>
                    Part 2
                </h2>
            </Link>
        </div>
)
}

export default Tabs;