interface RangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (newValue: [number, number]) => void;
}

export const RangeFilter = ({
  min,
  max,
  value,
  onChange,
}: RangeFilterProps) => {
  return (
    <>
      <label className="mb-[0.8rem] block" htmlFor="range">
        <span className="text-gray-500">Spending</span>
      </label>

      <div className="flex flex-col">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          id="range"
        />
      </div>
      <div className="flex justify-between items-center">
        <span>${value[0].toLocaleString()}</span>
        <span>${value[1].toLocaleString()}</span>
      </div>
    </>
  );
};
