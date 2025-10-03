'use client';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { useEffect, useState } from 'react';

interface MenuFormProps {
  formRef?: React.RefObject<HTMLDivElement | null>;
}

const MenuForm = ({ formRef }: MenuFormProps) => {
  const [formData, setFormData] = useState({
    menuId: '',
    depth: '',
    parentData: '',
    name: '',
  });

  // For now, use empty form data since Redux is not available
  useEffect(() => {
    // Reset form when component mounts
    setFormData({
      menuId: '',
      depth: '',
      parentData: '',
      name: '',
    });
  }, []);

  const handleSave = () => {
    console.log('Saving form data:', formData);
  };

  return (
    <div ref={formRef} className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="menuId" className="text-sm font-medium">
          Menu ID
        </Label>
        <Input
          id="menuId"
          value={formData.menuId}
          onChange={(e) => setFormData({ ...formData, menuId: e.target.value })}
          className="bg-muted border-border"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="depth" className="text-sm font-medium">
          Depth
        </Label>
        <Input
          id="depth"
          value={formData.depth}
          onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
          className="bg-muted border-border"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="parentData" className="text-sm font-medium">
          Parent Data
        </Label>
        <Input
          id="parentData"
          value={formData.parentData}
          onChange={(e) => setFormData({ ...formData, parentData: e.target.value })}
          className="bg-muted border-border"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-background border-border"
        />
      </div>

      <Button
        onClick={handleSave}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full text-base font-medium"
      >
        Save
      </Button>
    </div>
  );
};

export default MenuForm;
