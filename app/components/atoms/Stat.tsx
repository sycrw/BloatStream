interface StatProps {
  title: string;
  value: string;
  desc?: string;
}

const Stat = ({ title, value, desc }: StatProps) => {
  return (
    <div className="stat place-items-center">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
};

export default Stat;
