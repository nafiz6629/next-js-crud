import {useRouter} from 'next/router'

function Doc(){
    const router = useRouter()
    const {params = []} = router.query
    console.log(params); 
    
    return <h3>Docs Page {params[0]}  -- {params[1]} works on docs/11/14 like this, but only /docs gives 404 error... to avoid this we can change page name to [[...params]]</h3>
}
export default Doc;