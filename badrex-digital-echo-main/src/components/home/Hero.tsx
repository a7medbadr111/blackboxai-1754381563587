import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-success text-sm font-medium">Trusted by 10,000+ customers worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-gradient">Premium Digital</span>
            <br />
            <span className="text-foreground">Products Store</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Instant access to verified games, software, accounts & subscriptions. 
            <span className="text-primary font-semibold"> Delivered in seconds.</span>
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-warning" />
              <span className="text-foreground font-medium">Instant Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-gold" />
              <span className="text-foreground font-medium">Verified Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">5-Star Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link to="/products">
              <Button size="lg" className="btn-primary group">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/featured">
              <Button size="lg" variant="outline" className="btn-secondary">
                View Featured Deals
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-muted-foreground text-sm mb-4">Trusted by customers worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">10K+</div>
              <div className="w-px h-8 bg-border" />
              <div className="text-2xl font-bold">4.9★</div>
              <div className="w-px h-8 bg-border" />
              <div className="text-2xl font-bold">24/7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};