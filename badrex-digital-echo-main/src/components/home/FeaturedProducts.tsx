import { Link } from 'react-router-dom';
import { Star, Zap, Download, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const featuredProducts = products.filter(product => product.featured);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured</span> Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked premium digital products with instant delivery and lifetime support
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="card-product group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}

                {/* Quick Features */}
                <div className="absolute bottom-3 left-3 flex space-x-2">
                  {product.instant && (
                    <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                      <Zap className="h-3 w-3 mr-1" />
                      Instant
                    </Badge>
                  )}
                  {product.downloadable && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="mb-3">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-warning fill-warning'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 btn-primary"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="btn-secondary">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};