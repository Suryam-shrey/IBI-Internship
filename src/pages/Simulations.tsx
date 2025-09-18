import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Users, TrendingUp, Brain, Shield, Cloud, Code, Database, Blocks } from 'lucide-react';
import { motion } from 'framer-motion';
import { Simulation } from '@/types';

const Simulations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // Mock data - will be replaced with Supabase data
  const simulations: Simulation[] = [
    {
      id: '1',
      title: 'Neural Network Fundamentals',
      category: 'ai',
      level: 'beginner',
      duration: '2 hours',
      description: 'Build your first neural network from scratch and understand deep learning basics',
      enrolledCount: 1234,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'SQL Injection Defense',
      category: 'cybersecurity',
      level: 'intermediate',
      duration: '3 hours',
      description: 'Learn to identify and prevent SQL injection attacks in web applications',
      enrolledCount: 892,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Kubernetes Deployment',
      category: 'cloud',
      level: 'advanced',
      duration: '4 hours',
      description: 'Master container orchestration with Kubernetes in production environments',
      enrolledCount: 567,
      createdAt: new Date(),
    },
    {
      id: '4',
      title: 'Blockchain Smart Contracts',
      category: 'web3',
      level: 'intermediate',
      duration: '3.5 hours',
      description: 'Create and deploy smart contracts on Ethereum blockchain',
      enrolledCount: 445,
      createdAt: new Date(),
    },
    {
      id: '5',
      title: 'Data Pipeline Architecture',
      category: 'data-science',
      level: 'advanced',
      duration: '5 hours',
      description: 'Design and implement scalable data processing pipelines',
      enrolledCount: 723,
      createdAt: new Date(),
    },
    {
      id: '6',
      title: 'API Security Best Practices',
      category: 'cybersecurity',
      level: 'beginner',
      duration: '2.5 hours',
      description: 'Secure your APIs with authentication, rate limiting, and encryption',
      enrolledCount: 1567,
      createdAt: new Date(),
    },
  ];

  const categoryIcons = {
    ai: Brain,
    cybersecurity: Shield,
    cloud: Cloud,
    web3: Blocks,
    'data-science': Database,
  };

  const levelColors = {
    beginner: 'bg-success/20 text-success border-success/50',
    intermediate: 'bg-warning/20 text-warning border-warning/50',
    advanced: 'bg-destructive/20 text-destructive border-destructive/50',
  };

  const filteredSimulations = simulations.filter((sim) => {
    const matchesSearch = sim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sim.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || sim.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || sim.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Simulations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our cutting-edge technology simulations and start learning by doing
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search simulations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ai">AI & Machine Learning</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="cloud">Cloud Computing</SelectItem>
                <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Simulations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSimulations.map((simulation, index) => {
            const Icon = categoryIcons[simulation.category] || Code;
            return (
              <motion.div
                key={simulation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className="w-8 h-8 text-primary" />
                      <Badge className={levelColors[simulation.level]}>
                        {simulation.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{simulation.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {simulation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{simulation.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{simulation.enrolledCount} enrolled</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-primary hover:opacity-90" asChild>
                      <Link to="/login">
                        Enroll Now
                        <TrendingUp className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredSimulations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No simulations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulations;