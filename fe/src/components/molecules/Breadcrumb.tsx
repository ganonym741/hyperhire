import { Folder } from 'lucide-react';

interface BreadcrumbProps {
  items: string[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Folder className="w-4 h-4" />
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
