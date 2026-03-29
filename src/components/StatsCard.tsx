interface StatsCardProps {
  title: string;
  count: number;
  color: 'blue' | 'green' | 'red';
}

export default function StatsCard({ title, count, color }: StatsCardProps) {
  const colors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${colors[color]}`}>{count}</p>
    </div>
  );
}
