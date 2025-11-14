import { motion } from 'motion/react';
import { 
  Award, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  FileText,
  Users,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Page, User } from '../../App';

interface DashboardProps {
  user: User;
  onNavigate: (page: Page) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const stats = [
    {
      title: 'Compliance Rate',
      value: '85%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+5%'
    },
    {
      title: 'Expiring Soon',
      value: '3',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-2'
    },
    {
      title: 'Active Certifications',
      value: '247',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12'
    },
    {
      title: 'Team Members',
      value: '45',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+3'
    }
  ];

  const certificationStatus = [
    { name: 'Active', value: 247, color: '#10b981' },
    { name: 'Expiring Soon', value: 18, color: '#f59e0b' },
    { name: 'Expired', value: 12, color: '#ef4444' },
    { name: 'Pending', value: 8, color: '#8b5cf6' }
  ];

  const upcomingRenewals = [
    {
      title: 'AWS Certified Solutions Architect',
      holder: 'Sarah Mitchell',
      dueDate: '2025-11-20',
      urgency: 'urgent',
      daysLeft: 7
    },
    {
      title: 'Certified Kubernetes Administrator',
      holder: 'Mike Chen',
      dueDate: '2025-11-25',
      urgency: 'warning',
      daysLeft: 12
    },
    {
      title: 'Microsoft Azure Administrator',
      holder: 'Emma Davis',
      dueDate: '2025-12-01',
      urgency: 'normal',
      daysLeft: 18
    },
    {
      title: 'CISSP - Information Security',
      holder: 'James Wilson',
      dueDate: '2025-12-10',
      urgency: 'normal',
      daysLeft: 27
    }
  ];

  const recentActivity = [
    {
      action: 'Certification renewed',
      user: 'John Doe',
      cert: 'Google Cloud Professional',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      action: 'New certification added',
      user: 'Lisa Anderson',
      cert: 'PMP Certification',
      time: '5 hours ago',
      icon: Award,
      color: 'text-blue-600'
    },
    {
      action: 'Reminder sent',
      user: 'Team',
      cert: '3 expiring certifications',
      time: '1 day ago',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      action: 'Report generated',
      user: 'Alex Johnson',
      cert: 'Q4 Compliance Report',
      time: '2 days ago',
      icon: FileText,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-2xl p-8 mb-8 text-white"
        >
          <h1 className="text-3xl mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-blue-100">Here's your certification overview for today</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Certification Health */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Certification Health</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={certificationStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {certificationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {certificationStatus.map((status, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                      <span>{status.name}</span>
                    </div>
                    <span>{status.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Renewals */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Renewals</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate('certifications')}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRenewals.map((renewal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm">{renewal.title}</h4>
                        {renewal.urgency === 'urgent' && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                        {renewal.urgency === 'warning' && (
                          <Badge className="text-xs bg-orange-500">Warning</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{renewal.holder}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Due: {renewal.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm mb-1">{renewal.daysLeft} days</p>
                      <Progress 
                        value={100 - (renewal.daysLeft / 30) * 100} 
                        className="w-24 h-2"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="text-gray-900">{activity.action}</span>
                      {' '}by{' '}
                      <span>{activity.user}</span>
                    </p>
                    <p className="text-sm text-gray-600">{activity.cert}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
