const UserProfile = (props) => {
    return (
        <div>
            <h1>{props.username}</h1>
        </div>
    )
}

export default UserProfile

export async function getServerSideProps(context) {

    const { params, req, res } = context
    // console.log(params)
    console.log(req)
    console.log(res)

    return {
       props: {
           username: 'Anuj'
       }
   }
}