const SummaryCard = ({
  icon,
  value,
  label,
  bg,
  text,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
  text: string;
}) => (
  <div
    className={`flex items-center ${bg} ${text} px-6 py-4 rounded-lg shadow-md`}
  >
    {icon}
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  </div>
);

export default SummaryCard;
