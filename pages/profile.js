import {parseCookies} from 'nookies'
const Profile=()=>{
    return(
        <>
        <h1>Profile Page</h1>
        </>
    )
}
export default Profile

export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        const {res} = await ctx
        res.writeHead(302,{Location:"/login"})
        res.end()
    }
    return {
        props:{

        }
    }
  }