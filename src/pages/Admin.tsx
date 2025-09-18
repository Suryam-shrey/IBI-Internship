import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Users, BookOpen, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Simulation } from '@/types';

const Admin = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSimulation, setEditingSimulation] = useState<Simulation | null>(null);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // Mock data
  const [simulations, setSimulations] = useState<Simulation[]>([
    {
      id: '1',
      title: 'Neural Network Fundamentals',
      category: 'ai',
      level: 'beginner',
      duration: '2 hours',
      description: 'Build your first neural network from scratch',
      enrolledCount: 1234,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'SQL Injection Defense',
      category: 'cybersecurity',
      level: 'intermediate',
      duration: '3 hours',
      description: 'Learn to prevent SQL injection attacks',
      enrolledCount: 892,
      createdAt: new Date(),
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    duration: '',
    description: '',
  });

  const handleAddSimulation = () => {
    const newSimulation: Simulation = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category as any,
      level: formData.level as any,
      duration: formData.duration,
      description: formData.description,
      enrolledCount: 0,
      createdAt: new Date(),
    };

    setSimulations([...simulations, newSimulation]);
    setIsAddDialogOpen(false);
    setFormData({
      title: '',
      category: '',
      level: '',
      duration: '',
      description: '',
    });
    
    toast({
      title: 'Success',
      description: 'Simulation added successfully',
    });
  };

  const handleEditSimulation = () => {
    if (!editingSimulation) return;
    
    setSimulations(simulations.map(sim => 
      sim.id === editingSimulation.id 
        ? { 
            ...sim, 
            title: formData.title,
            category: formData.category as Simulation['category'],
            level: formData.level as Simulation['level'],
            duration: formData.duration,
            description: formData.description,
          }
        : sim
    ));
    
    setEditingSimulation(null);
    setFormData({
      title: '',
      category: '',
      level: '',
      duration: '',
      description: '',
    });
    
    toast({
      title: 'Success',
      description: 'Simulation updated successfully',
    });
  };

  const handleDeleteSimulation = (id: string) => {
    setSimulations(simulations.filter(sim => sim.id !== id));
    toast({
      title: 'Success',
      description: 'Simulation deleted successfully',
    });
  };

  const stats = {
    totalSimulations: simulations.length,
    totalUsers: 10532,
    activeEnrollments: 8921,
    completionRate: 78,
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
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage simulations and monitor platform statistics
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
              <CardTitle className="text-sm font-medium">Total Simulations</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSimulations}</div>
              <p className="text-xs text-muted-foreground">Available courses</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeEnrollments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Currently learning</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Shield className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Management Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="simulations" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="simulations">Simulations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simulations" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Manage Simulations</CardTitle>
                      <CardDescription>Add, edit, or delete simulations</CardDescription>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-primary hover:opacity-90">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Simulation
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card/95 backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle>Add New Simulation</DialogTitle>
                          <DialogDescription>
                            Create a new learning simulation for students
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              placeholder="Enter simulation title"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ai">AI & Machine Learning</SelectItem>
                                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                                <SelectItem value="cloud">Cloud Computing</SelectItem>
                                <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                                <SelectItem value="data-science">Data Science</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="level">Level</Label>
                            <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                              id="duration"
                              value={formData.duration}
                              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                              placeholder="e.g., 2 hours"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              placeholder="Enter simulation description"
                              rows={4}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button className="bg-gradient-primary hover:opacity-90" onClick={handleAddSimulation}>
                            Add Simulation
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {simulations.map((simulation) => (
                        <TableRow key={simulation.id}>
                          <TableCell className="font-medium">{simulation.title}</TableCell>
                          <TableCell className="capitalize">{simulation.category.replace('-', ' ')}</TableCell>
                          <TableCell>
                            <Badge className={getLevelColor(simulation.level)}>
                              {simulation.level}
                            </Badge>
                          </TableCell>
                          <TableCell>{simulation.duration}</TableCell>
                          <TableCell>{simulation.enrolledCount}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingSimulation(simulation);
                                  setFormData({
                                    title: simulation.title,
                                    category: simulation.category,
                                    level: simulation.level,
                                    duration: simulation.duration,
                                    description: simulation.description,
                                  });
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSimulation(simulation.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;