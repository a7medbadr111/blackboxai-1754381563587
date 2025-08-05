import { Shield, Zap, Award, Headphones, RefreshCw, CreditCard } from 'lucide-react';

export const TrustSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'SSL Secured',
      description: 'Your data is protected with industry-standard encryption',
      color: 'text-success'
    },
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Get your digital products delivered within seconds',
      color: 'text-warning'
    },
    {
      icon: Award,
      title: 'Verified Products',
      description: 'All products are tested and verified before listing',
      color: 'text-gold'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs',
      color: 'text-primary'
    },
    {
      icon: RefreshCw,
      title: 'Easy Refunds',
      description: 'Hassle-free refund policy for your peace of mind',
      color: 'text-accent'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security',
      color: 'text-success'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '50,000+', label: 'Products Delivered' },
    { value: '4.9/5', label: 'Customer Rating' },
    { value: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">BadRex Store</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best digital marketplace experience with unmatched quality and service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Customer Reviews Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              What Our <span className="text-gradient">Customers Say</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex M.",
                rating: 5,
                comment: "Instant delivery and great quality products. Highly recommended!",
                product: "Steam Account Bundle"
              },
              {
                name: "Sarah K.",
                rating: 5,
                comment: "Amazing customer support and legitimate products. Will buy again!",
                product: "Adobe Creative Suite"
              },
              {
                name: "David R.",
                rating: 5,
                comment: "Best digital marketplace I've used. Fast, secure, and reliable.",
                product: "Netflix Premium"
              }
            ].map((review, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl border border-border animate-fade-in"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="flex items-center mb-3">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-warning rounded-full" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.comment}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-muted-foreground">{review.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};