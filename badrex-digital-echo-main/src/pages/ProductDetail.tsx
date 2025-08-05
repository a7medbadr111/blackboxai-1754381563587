import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Shield, Zap, Download, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/products" className="hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl border border-border"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Stock */}
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{product.category}</Badge>
              <div className="flex items-center space-x-2">
                {product.inStock ? (
                  <Badge className="bg-success/10 text-success border-success/20">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-warning fill-warning'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge className="bg-destructive text-destructive-foreground">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.instant && (
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-warning" />
                  <span className="text-sm">Instant Delivery</span>
                </div>
              )}
              {product.downloadable && (
                <div className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-success" />
                  <span className="text-sm">Digital Download</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Verified Product</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-gold" />
                <span className="text-sm">Lifetime Support</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="lg"
              className="w-full btn-primary"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - ${product.price}
            </Button>

            {/* Trust Indicators */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">10K+</div>
                  <div className="text-xs text-muted-foreground">Customers</div>
                </div>
                <div>
                  <Shield className="h-6 w-6 mx-auto mb-2 text-success" />
                  <div className="text-sm font-medium">SSL</div>
                  <div className="text-xs text-muted-foreground">Secured</div>
                </div>
                <div>
                  <Zap className="h-6 w-6 mx-auto mb-2 text-warning" />
                  <div className="text-sm font-medium">Instant</div>
                  <div className="text-xs text-muted-foreground">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <h3>Product Details</h3>
              <p>{product.description}</p>
              
              <h4>What's Included:</h4>
              <ul>
                <li>Full product access</li>
                <li>Instant delivery via email</li>
                <li>Lifetime customer support</li>
                <li>Money-back guarantee</li>
              </ul>

              <h4>System Requirements:</h4>
              <p>Compatible with all major platforms and devices. No special requirements needed.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-semibold">
                        U{i}
                      </div>
                      <span className="font-medium">User {i}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-warning fill-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Great product! Fast delivery and exactly as described. Highly recommend!
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <h3>Customer Support</h3>
              <p>We provide 24/7 customer support for all our products.</p>
              
              <h4>Contact Methods:</h4>
              <ul>
                <li>Email: support@badrexstore.com</li>
                <li>Live Chat: Available on website</li>
                <li>Response Time: Within 2 hours</li>
              </ul>

              <h4>Refund Policy:</h4>
              <p>30-day money-back guarantee for all digital products.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <div className="card-product group">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="text-lg font-bold text-primary">
                      ${relatedProduct.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}