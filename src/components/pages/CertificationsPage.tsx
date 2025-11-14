import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List, 
  Plus, 
  Download,
  Calendar,
  Upload,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { GlowingButton } from '../GlowingButton';
import type { Page } from '../../App';

interface CertificationsPageProps {
  onNavigate: (page: Page) => void;
}

const certifications = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    vendor: 'AWS',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    status: 'active',
    holder: 'Sarah Mitchell',
    icon: '☁️'
  },
  {
    id: 2,
    title: 'Google Cloud Professional',
    vendor: 'Google',
    issueDate: '2023-06-10',
    expiryDate: '2025-06-10',
    status: 'active',
    holder: 'Mike Chen',
    icon: '🔷'
  },
  {
    id: 3,
    title: 'Microsoft Azure Administrator',
    vendor: 'Microsoft',
    issueDate: '2024-03-20',
    expiryDate: '2025-11-25',
    status: 'expiring',
    holder: 'Emma Davis',
    icon: '🔵'
  },
  {
    id: 4,
    title: 'Citrix Certified Professional',
    vendor: 'Citrix',
    issueDate: '2022-08-15',
    expiryDate: '2024-08-15',
    status: 'expired',
    holder: 'James Wilson',
    icon: '🔶'
  },
  {
    id: 5,
    title: 'AMA Physician Certification',
    vendor: 'AMA',
    issueDate: '2024-05-01',
    expiryDate: '2027-05-01',
    status: 'active',
    holder: 'Dr. Lisa Brown',
    icon: '🏥'
  },
  {
    id: 6,
    title: 'Certified Kubernetes Administrator',
    vendor: 'CNCF',
    issueDate: '2024-02-10',
    expiryDate: '2025-11-30',
    status: 'expiring',
    holder: 'Alex Johnson',
    icon: '⚙️'
  }
];

export function CertificationsPage({ onNavigate }: CertificationsPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVendor, setFilterVendor] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressValue = (issueDate: string, expiryDate: string) => {
    const issue = new Date(issueDate);
    const expiry = new Date(expiryDate);
    const today = new Date();
    const total = expiry.getTime() - issue.getTime();
    const elapsed = today.getTime() - issue.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.holder.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVendor = filterVendor === 'all' || cert.vendor === filterVendor;
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesVendor && matchesStatus;
  });

  const activeCerts = filteredCerts.filter(c => c.status === 'active');
  const expiringCerts = filteredCerts.filter(c => c.status === 'expiring');
  const expiredCerts = filteredCerts.filter(c => c.status === 'expired');

  const CertCard = ({ cert }: { cert: any }) => {
    const daysLeft = getDaysUntilExpiry(cert.expiryDate);
    const progress = getProgressValue(cert.issueDate, cert.expiryDate);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <Card className="hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{cert.icon}</div>
              <Badge
                variant={
                  cert.status === 'active' ? 'default' :
                  cert.status === 'expiring' ? 'secondary' :
                  'destructive'
                }
              >
                {cert.status}
              </Badge>
            </div>
            
            <h3 className="text-lg mb-2">{cert.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{cert.holder}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Issued: {cert.issueDate}</span>
                <span>Expires: {cert.expiryDate}</span>
              </div>
              <Progress value={progress} className="h-2" />
              {cert.status === 'expiring' && (
                <p className="text-sm text-orange-600">
                  {daysLeft} days until renewal
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1"
                onClick={() => setSelectedCert(cert)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Certifications</h1>
            <p className="text-gray-600">Manage and track all professional certifications</p>
          </div>
          <GlowingButton onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </GlowingButton>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterVendor} onValueChange={setFilterVendor}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Vendors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="AWS">AWS</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Microsoft">Microsoft</SelectItem>
                  <SelectItem value="Citrix">Citrix</SelectItem>
                  <SelectItem value="AMA">AMA</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All Certs ({filteredCerts.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeCerts.length})
            </TabsTrigger>
            <TabsTrigger value="expiring">
              Expiring ({expiringCerts.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({expiredCerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredCerts.map(cert => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {activeCerts.map(cert => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expiring">
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {expiringCerts.map(cert => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expired">
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {expiredCerts.map(cert => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Modal */}
        <Dialog open={showAddModal || selectedCert !== null} onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false);
            setSelectedCert(null);
          }
        }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedCert ? 'Edit Certification' : 'Add New Certification'}
              </DialogTitle>
              <DialogDescription>
                Enter the certification details below
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="cert-name">Certification Name *</Label>
                <Input id="cert-name" placeholder="e.g., AWS Certified Solutions Architect" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendor">Vendor *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="microsoft">Microsoft</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="holder">Certificate Holder *</Label>
                  <Input id="holder" placeholder="Name" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issue-date">Issue Date *</Label>
                  <Input id="issue-date" type="date" />
                </div>

                <div>
                  <Label htmlFor="expiry-date">Expiry Date *</Label>
                  <Input id="expiry-date" type="date" />
                </div>
              </div>

              <div>
                <Label htmlFor="file">Upload Certificate</Label>
                <Input id="file" type="file" accept=".pdf,.jpg,.png" />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." rows={3} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowAddModal(false);
                setSelectedCert(null);
              }}>
                Cancel
              </Button>
              <GlowingButton onClick={() => {
                setShowAddModal(false);
                setSelectedCert(null);
              }}>
                {selectedCert ? 'Update' : 'Add'} Certification
              </GlowingButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
