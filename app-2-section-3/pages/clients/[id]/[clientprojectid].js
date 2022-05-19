import {useRouter} from "next/router";

function SpecificClientProject() {
    const router = useRouter()
    console.log(router.pathname)
    console.log(router.query)

    return (
        <div>
            <h1>Specific Project of a selected client</h1>
        </div>
    )
}

export default SpecificClientProject