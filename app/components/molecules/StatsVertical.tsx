import Stat from "../atoms/Stat";

interface StatsVerticalProps {
  stats: {
    title: string;
    value: string;
    desc?: string;
  }[];
}

const StatsVertical = ({ stats }: StatsVerticalProps) => {
  return (
    <div className="stats shadow">
      {stats.map((stat, index) => (
        <Stat
          key={index}
          title={stat.title}
          value={stat.value}
          desc={stat.desc}
        />
      ))}
    </div>
  );
};

export default StatsVertical;
