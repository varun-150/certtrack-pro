import { motion } from 'motion/react';
import { Award, Calendar, TrendingUp, Download, User, Mail, Phone, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import type { Page, User as UserType } from '../../App';

interface ProfilePageProps {
  user: UserType;
  onNavigate: (page: Page) => void;
}

const certificationHistory = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    status: 'active',
    ceus: 40,
    icon: '☁️'
  },
  {
    id: 2,
    title: 'Google Cloud Professional',
    issueDate: '2023-06-10',
    expiryDate: '2025-06-10',
    status: 'active',
    ceus: 35,
    icon: '🔷'
  },
  {
    id: 3,
    title: 'Microsoft Azure Administrator',
    issueDate: '2024-03-20',
    expiryDate: '2025-11-25',
    status: 'expiring',
    ceus: 30,
    icon: '🔵'
  },
  {
    id: 4,
    title: 'Certified Kubernetes Administrator',
    issueDate: '2022-09-15',
    expiryDate: '2024-09-15',
    status: 'renewed',
    ceus: 25,
    icon: '⚙️'
  },
  {
    id: 5,
    title: 'CISSP - Information Security',
    issueDate: '2023-02-01',
    expiryDate: '2026-02-01',
    status: 'active',
    ceus: 120,
    icon: '🔒'
  }
];

const trainingLogs = [
  { date: '2024-11-01', title: 'Advanced Cloud Architecture', hours: 8, type: 'Workshop' },
  { date: '2024-10-15', title: 'Kubernetes Deep Dive', hours: 16, type: 'Course' },
  { date: '2024-09-20', title: 'Security Best Practices', hours: 4, type: 'Webinar' },
  { date: '2024-08-10', title: 'DevOps Fundamentals', hours: 12, type: 'Course' }
];

export function ProfilePage({ user, onNavigate }: ProfilePageProps) {
  const totalCEUs = certificationHistory.reduce((sum, cert) => sum + cert.ceus, 0);
  const activeCerts = certificationHistory.filter(c => c.status === 'active').length;
  const totalTrainingHours = trainingLogs.reduce((sum, log) => sum + log.hours, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#D9E1FF] flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-[#007BFF]" />
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl text-gray-900 mb-2">{user?.name}</h1>
                <p className="text-gray-600 mb-4">{user?.role}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>IT Department</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" onClick={() => onNavigate('settings')}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl">{activeCerts}</p>
                  <p className="text-sm text-gray-600">Active Certs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl">{totalCEUs}</p>
                  <p className="text-sm text-gray-600">Total CEUs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl">{totalTrainingHours}h</p>
                  <p className="text-sm text-gray-600">Training Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl">95%</p>
                  <p className="text-sm text-gray-600">Compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certification Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Certification Timeline</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {certificationHistory.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-[#D9E1FF] rounded-full flex items-center justify-center text-2xl">
                          {cert.icon}
                        </div>
                        {index < certificationHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="mb-1">{cert.title}</h4>
                            <p className="text-sm text-gray-600">
                              Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                            </p>
                          </div>
                          <Badge
                            variant={
                              cert.status === 'active' ? 'default' :
                              cert.status === 'expiring' ? 'secondary' :
                              cert.status === 'renewed' ? 'outline' :
                              'destructive'
                            }
                          >
                            {cert.status}
                          </Badge>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">CEUs Earned</span>
                            <span>{cert.ceus}</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Logs */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Training Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm">{log.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {log.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{log.date}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{log.hours} hours</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Training
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Top Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Cloud Computing', level: 90 },
                    { name: 'DevOps', level: 85 },
                    { name: 'Security', level: 80 },
                    { name: 'Kubernetes', level: 75 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>{skill.name}</span>
                        <span className="text-gray-600">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
