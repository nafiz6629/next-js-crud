import Link from "next/link";
function ProductList({ product=100 }) {
  return (
    <>
      <Link href="/">
        <button>Home</button>
      </Link>
      <br></br>

      <Link href="/product/1">
        <a>Product 1</a>
      </Link>
      <br></br>
      <Link href="/product/2">
        <a>Product 2</a>
      </Link>
      <br></br>

      <Link href="/product/3" replace> 
        <a>Product 3</a>
      </Link>
      <br></br>
      <Link href={`/product/${product}`}>
        <a>Product {product}</a>
      </Link>
    </>
  );
}

export default ProductList;
