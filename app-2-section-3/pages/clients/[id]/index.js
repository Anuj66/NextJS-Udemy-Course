import {useRouter} from "next/router";

function ClientProjects() {

    const router = useRouter()

    function projectHandler() {
        router.push('/clients/max/projecta')
    }

    return (
        <div>
            <h1>Projects as per a given Client</h1>
            <button onClick={projectHandler}>Load Project - a</button>
        </div>
    )
}

export default ClientProjects
