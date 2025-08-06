import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Calculator, Download, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInvoice } from '@/contexts/InvoiceContext';
import heroImage from '@/assets/invoice-hero.jpg';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { setUser } = useInvoice();

  const handleLogin = () => {
    // Simulate login - in a real app this would involve authentication
    setUser({
      name: 'John Smith',
      email: 'john.smith@example.com'
    });
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b shadow-soft bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Invoicer</span>
            </div>
            <Button onClick={handleLogin} variant="hero" size="lg">
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Create Professional
                  <span className="gradient-hero bg-clip-text text-transparent block">
                    Invoices Instantly
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Streamline your billing process with our intuitive invoice creator. 
                  Add items, calculate totals, and export professional invoices in seconds.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleLogin} variant="hero" size="xl" className="gap-3">
                  <FileText className="h-5 w-5" />
                  Start Creating Invoices
                </Button>
                <Button variant="outline" size="xl" className="gap-3">
                  <Download className="h-5 w-5" />
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="gradient-card rounded-2xl p-8 shadow-large">
                <img 
                  src={heroImage} 
                  alt="Professional Invoice Preview" 
                  className="w-full h-auto rounded-lg shadow-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful tools to create and manage your invoices efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card shadow-medium border-0 transition-smooth hover:shadow-large">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Smart Calculations</h3>
                <p className="text-muted-foreground">
                  Automatic calculations with tax support. Add items and watch totals update in real-time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-medium border-0 transition-smooth hover:shadow-large">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Professional Design</h3>
                <p className="text-muted-foreground">
                  Clean, professional invoice templates that make your business look credible and trustworthy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-medium border-0 transition-smooth hover:shadow-large">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Easy Export</h3>
                <p className="text-muted-foreground">
                  Export your invoices as professional PDFs ready to send to your clients instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-primary">Why Choose Invoicer?</h2>
              <div className="space-y-6">
                {[
                  'Intuitive drag-and-drop interface',
                  'Real-time calculations and previews',
                  'Professional PDF export',
                  'Customizable company settings',
                  'Mobile-friendly design'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button onClick={handleLogin} variant="premium" size="xl" className="gap-3">
                <FileText className="h-5 w-5" />
                Get Started Now
              </Button>
            </div>
            <div className="relative">
              <div className="gradient-card rounded-2xl p-8 shadow-large">
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-4 bg-primary/20 rounded w-1/2"></div>
                  <div className="h-4 bg-primary/20 rounded w-2/3"></div>
                  <div className="border-t pt-4 mt-6">
                    <div className="h-6 bg-primary rounded w-1/3 ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary">Invoicer</span>
          </div>
          <p className="text-center text-muted-foreground mt-2">
            © 2024 Invoicer. Professional invoice creation made simple.
          </p>
        </div>
      </footer>
    </div>
  );
};