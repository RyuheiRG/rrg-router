import { Link } from "../components/Link";

export default function HomePage() {
    return (
        <>
            <h1>Home</h1>
            <p>Pagina de ejemplo para crear un React Router desde cero</p>
            <Link to='/about'>Mas informacion</Link>
        </>
    )
}