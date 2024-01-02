import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>The Product Detail Page</h1>
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetailPage;
