import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Cloud, Shield, Zap, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-bg.jpg';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Mini Projects',
      description: 'Build and deploy AI models with hands-on simulations',
      color: 'text-primary',
    },
    {
      icon: Shield,
      title: 'Cybersecurity Puzzles',
      description: 'Master security concepts through interactive challenges',
      color: 'text-accent',
    },
    {
      icon: Cloud,
      title: 'Cloud Deployment',
      description: 'Learn cloud architecture with real-world scenarios',
      color: 'text-success',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Simulations' },
    { value: '10K+', label: 'Students Enrolled' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'Lab Access' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Simulate.
              </span>{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Solve.
              </span>{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Succeed.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welcome to Blixora Labs - Your gateway to futuristic digital R&D simulations for tech students and developers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 group"
                asChild
              >
                <Link to="/simulations">
                  Explore Simulations
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10"
                asChild
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Interactive Learning Simulations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master cutting-edge technologies through hands-on challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 hover:shadow-glow transition-all hover:-translate-y-1"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Level Up Your Skills?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students and developers mastering technology through interactive simulations
            </p>
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6"
              asChild
            >
              <Link to="/register">
                Start Your Journey
                <Zap className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold">Blixora Labs</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Mon-Fri: 11:00 AM - 8:00 PM</span>
              <span>•</span>
              <span>support@blixoralabs.dev</span>
            </div>
            <div className="flex gap-4">
              <Users className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;