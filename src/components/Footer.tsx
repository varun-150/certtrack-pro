export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-[#007BFF] transition-colors">About</a>
            <a href="#" className="hover:text-[#007BFF] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#007BFF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#007BFF] transition-colors">Terms of Service</a>
          </div>
          <div className="text-sm text-gray-500">
            © {currentYear} CertTrack Pro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
