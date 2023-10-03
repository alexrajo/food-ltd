import FilterDisplay from "./FilterDisplay";

export default function SelectedFilters() {
    const mockFilters = ['Sukker', 'ost', 'Under 20 minutes'];
  
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {mockFilters.map((f) => (
          <FilterDisplay key={f} name={f} />
        ))}
        <div className="font-thin text-sm underline">Clear</div>
      </div>
    );
  }