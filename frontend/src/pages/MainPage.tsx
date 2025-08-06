import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileText, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';
import { EditingComponent } from '@/components/EditingComponent';
import { PreviewComponent } from '@/components/PreviewComponent';
import { InvoiceSettingPopup } from '@/components/InvoiceSettingPopup';

export const MainPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useInvoice();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b shadow-soft bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Invoicer</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shadow-soft">
                <span className="font-medium">{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 shadow-large">
              <DropdownMenuItem 
                onClick={() => setShowSettings(true)}
                className="gap-2 cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout}
                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editing Component - 2/3 width */}
        <div className="flex-[2] border-r">
          <EditingComponent />
        </div>
        
        {/* Preview Component - 1/3 width */}
        <div className="flex-1">
          <PreviewComponent />
        </div>
      </div>

      {/* Settings Popup */}
      <InvoiceSettingPopup 
        open={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};