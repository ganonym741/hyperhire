import { useRef } from 'react';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import TreeView from '@/components/organisms/TreeView';
import MenuForm from '@/components/organisms/MenuForm';
import { LayoutGrid } from 'lucide-react';
import { TreeNode } from '@/store/menuSlice';
import { useRouter } from 'next/navigation';

const MenusPage = () => {
  // const { selectedMenu } = useAppSelector((state: any) => state.menu);
  const selectedMenu = null;
  const formRef = useRef<HTMLDivElement>(null);

  const handleAdd = (node: TreeNode) => {
    console.log('Adding child to:', node);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Breadcrumb items={['Menus']} />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
          <LayoutGrid className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Menus</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Menu</label>
          <div className="w-full max-w-md bg-card border border-border rounded px-3 py-2 text-sm">
            System Management
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TreeView onAdd={handleAdd} />
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <MenuForm formRef={formRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenusPage;
