import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export function NavBar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Portfolio of Maximilian Mallory</Link>
            <ul>

                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/contact">Contact</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : "" }>
            <Link to={to} {...props}>
            {children}
            </Link>
        </li>
    )
}