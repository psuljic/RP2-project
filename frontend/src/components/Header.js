export default function Header() {

    return ( 
    <>
        <nav>
            <a className="nav-link" href="/">
                <div className="logo">Gifty</div>
            </a>
            <ul>
                <a className="nav-link" href="/">
                    <li>Home</li>
                </a>
                <a className="nav-link" href="/about">
                    <li>About</li>
                </a>
                <div className='nav-link' onClick={() => alert("LINK COPIED")}>
                    <li>
                        <i class="fa fa-2x fa-share"></i>Share
                    </li>    
                </div>
            </ul>
        </nav>
    </>
    )
}