import {useRouter} from 'next/router'
function ProductDetail(){
    const router = useRouter()
    const pid = router.query.id
    return <h1>Detail about product {pid}</h1>
}
export default ProductDetail;
