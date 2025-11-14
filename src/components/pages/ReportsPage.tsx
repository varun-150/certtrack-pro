import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, TrendingUp, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { GlowingButton } from '../GlowingButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { Page } from '../../App';

interface ReportsPageProps {
  onNavigate: (page: Page) => void;
}

const expirationTrends = [
  { month: 'Jan', expiring: 12, renewed: 10, expired: 2 },
  { month: 'Feb', expiring: 15, renewed: 13, expired: 2 },
  { month: 'Mar', expiring: 8, renewed: 7, expired: 1 },
  { month: 'Apr', expiring: 18, renewed: 15, expired: 3 },
  { month: 'May', expiring: 10, renewed: 9, expired: 1 },
  { month: 'Jun', expiring: 14, renewed: 12, expired: 2 }
];

const departmentData = [
  { department: 'IT', certifications: 85, compliance: 92 },
  { department: 'Healthcare', certifications: 67, compliance: 88 },
  { department: 'Manufacturing', certifications: 52, compliance: 85 },
  { department: 'HR', certifications: 28, compliance: 95 },
  { department: 'Sales', certifications: 34, compliance: 78 }
];

const skillGapData = [
  { skill: 'Cloud Computing', current: 45, required: 60 },
  { skill: 'Cybersecurity', current: 38, required: 50 },
  { skill: 'Data Analytics', current: 52, required: 55 },
  { skill: 'Project Management', current: 42, required: 48 },
  { skill: 'DevOps', current: 30, required: 45 }
];

export function ReportsPage({ onNavigate }: ReportsPageProps) {
  const [dateRange, setDateRange] = useState('6months');
  const [department, setDepartment] = useState('all');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const metrics = [
    {
      title: '360° Visibility',
      value: '100%',
      description: 'Complete organizational coverage',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Time Savings',
      value: '85%',
      description: 'Reduction in audit preparation',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Compliance Rate',
      value: '92%',
      description: 'Overall certification compliance',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Risk Reduction',
      value: '78%',
      description: 'Fewer compliance violations',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into certification management</p>
          </div>
          <GlowingButton onClick={() => setShowPreviewModal(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </GlowingButton>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600 mb-2 block">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm text-gray-600 mb-2 block">Department</label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center mb-4`}>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl mb-1">{metric.value}</h3>
                  <p className="text-sm">{metric.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Expiration Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Certification Expiration Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expirationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="expiring" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Expiring"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="renewed" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Renewed"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expired" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Expired"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="certifications" fill="#007BFF" name="Certifications" />
                  <Bar dataKey="compliance" fill="#10b981" name="Compliance %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skill Gap Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={skillGapData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="skill" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#007BFF" name="Current Level">
                  {skillGapData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.current >= entry.required ? '#10b981' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
                <Bar dataKey="required" fill="#D9E1FF" name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="text-sm mb-1 text-green-900">Strong Performance</h4>
                <p className="text-sm text-green-700">
                  IT department maintains 92% compliance rate, exceeding organizational target by 7%.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="text-sm mb-1 text-orange-900">Attention Required</h4>
                <p className="text-sm text-orange-700">
                  Sales department shows 78% compliance. Recommend immediate renewal program for 8 expiring certifications.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm mb-1 text-blue-900">Trending Up</h4>
                <p className="text-sm text-blue-700">
                  Cloud Computing certifications increased 25% this quarter. Consider expanding training budget.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Preview Modal */}
        <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report Preview</DialogTitle>
              <DialogDescription>
                Q4 2025 Compliance Report - Generated on November 13, 2025
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="mb-2">Executive Summary</h3>
                <p className="text-sm text-gray-600">
                  Overall organizational compliance stands at 92% with 247 active certifications across 45 team members.
                  85% reduction in audit preparation time achieved through automated tracking.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="mb-2">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Certifications</p>
                    <p className="text-xl">247</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Compliance Rate</p>
                    <p className="text-xl">92%</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowPreviewModal(false)}>
                  Close
                </Button>
                <GlowingButton>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </GlowingButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
