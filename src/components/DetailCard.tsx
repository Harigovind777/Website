interface DetailItem {
  label: string;
  value: string | number;
}

interface DetailCardProps {
  title: string;
  items: DetailItem[];
  columns?: 1 | 2;
}

export default function DetailCard({ title, items, columns = 1 }: DetailCardProps) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">{title}</h4>
      <div className={`space-y-3 ${columns === 2 ? 'grid grid-cols-2 gap-4' : ''}`}>
        {items.map((item, idx) => (
          <div key={idx} className={columns === 1 ? 'pb-3 border-b border-gray-200' : ''}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{item.label}</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
