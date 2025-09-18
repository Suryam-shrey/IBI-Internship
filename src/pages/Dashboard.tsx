import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import { BookOpen, Clock, Trophy, TrendingUp, PlayCircle, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('enrolled');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock enrollment data
  const enrollments = [
    {
      id: '1',
      title: 'Neural Network Fundamentals',
      category: 'AI',
      status: 'in-progress',
      progress: 65,
      lastAccessed: '2 hours ago',
      duration: '2 hours',
      level: 'beginner',
    },
    {
      id: '2',
      title: 'SQL Injection Defense',
      category: 'Cybersecurity',
      status: 'completed',
      progress: 100,
      lastAccessed: '1 day ago',
      duration: '3 hours',
      level: 'intermediate',
    },
    {
      id: '3',
      title: 'Kubernetes Deployment',
      category: 'Cloud',
      status: 'enrolled',
      progress: 0,
      lastAccessed: 'Not started',
      duration: '4 hours',
      level: 'advanced',
    },
  ];

  const stats = {
    totalEnrolled: enrollments.length,
    completed: enrollments.filter(e => e.status === 'completed').length,
    inProgress: enrollments.filter(e => e.status === 'in-progress').length,
    totalHours: 12,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-primary" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-success/20 text-success border-success/50';
      case 'intermediate':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'advanced':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Track your learning progress and continue your simulations
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEnrolled}</div>
              <p className="text-xs text-muted-foreground">Active simulations</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Finished simulations</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Currently learning</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHours}</div>
              <p className="text-xs text-muted-foreground">Learning time</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Simulations Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="enrolled">All</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="enrolled" className="space-y-4">
              {enrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(enrollment.status)}
                            <CardTitle className="text-xl">{enrollment.title}</CardTitle>
                          </div>
                          <CardDescription className="flex items-center gap-4">
                            <span>{enrollment.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {enrollment.duration}
                            </span>
                            <span>•</span>
                            <span>{enrollment.lastAccessed}</span>
                          </CardDescription>
                        </div>
                        <Badge className={getLevelColor(enrollment.level)}>
                          {enrollment.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      <Button 
                        className="w-full mt-4 bg-gradient-primary hover:opacity-90"
                        disabled={enrollment.status === 'completed'}
                      >
                        {enrollment.status === 'completed' ? 'Completed' : 
                         enrollment.status === 'in-progress' ? 'Continue Learning' : 'Start Learning'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="in-progress" className="space-y-4">
              {enrollments
                .filter(e => e.status === 'in-progress')
                .map((enrollment, index) => (
                  <motion.div
                    key={enrollment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(enrollment.status)}
                              <CardTitle className="text-xl">{enrollment.title}</CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-4">
                              <span>{enrollment.category}</span>
                              <span>•</span>
                              <span>{enrollment.lastAccessed}</span>
                            </CardDescription>
                          </div>
                          <Badge className={getLevelColor(enrollment.level)}>
                            {enrollment.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} className="h-2" />
                        </div>
                        <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                          Continue Learning
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {enrollments
                .filter(e => e.status === 'completed')
                .map((enrollment, index) => (
                  <motion.div
                    key={enrollment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(enrollment.status)}
                              <CardTitle className="text-xl">{enrollment.title}</CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-4">
                              <span>{enrollment.category}</span>
                              <span>•</span>
                              <span>Completed {enrollment.lastAccessed}</span>
                            </CardDescription>
                          </div>
                          <Badge className="bg-success/20 text-success border-success/50">
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;