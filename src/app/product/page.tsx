
import ProductCard from "@/components/ui/ProductCard";
import ProductCard2 from "@/components/card/card";
import ProductCard3 from "@/components/productcards";


async function getProducts() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (error) {
      console.error("Error in getProducts:", error);
      throw error;
    }
  }

  export default async function ProductPage({ products }) {  
    try {
        products = await getProducts();
    } catch (error) {
        
    }
    return (
      <div>
       
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard3 key={product.id} product={product  
            } />
            
          ))}
          
          
        </div>
        
      </div>
    );
  }