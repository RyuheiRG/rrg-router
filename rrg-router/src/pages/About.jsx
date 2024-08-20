import { Link } from "../components/Link";

const i18n = {
    es: {
        title: 'Mas informacion',
        button: 'Ir a la Home',
        description: 'Estoy creando un clon de React Router'
    },
    en: {
        title: 'More information',
        button: 'Go to Home page',
        description: `I'm creating a React Router clone`
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
    const i18n = useI18n(routeParams.lang ?? 'es')
    return (
        <>
            <h1>{i18n.title}</h1>
            <img src="https://images5.alphacoders.com/515/515634.jpg" alt="bloodborne" />
            <p>{i18n.description}</p>
            <Link to='/'>{i18n.button}</Link>
        </>
    )
}