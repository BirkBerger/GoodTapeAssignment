import Image from 'next/image';

function Header() {

    return (
        <div className="flex place-content-between">
            <div className="flex items-center w-40">
                <img className="w-full" src="/goodtapelogo_small.png" alt="Good Tape logo"></img>
            </div>
            <h2>
                Thea Birk Berger
            </h2>
        </div>
    )

}

export default Header;