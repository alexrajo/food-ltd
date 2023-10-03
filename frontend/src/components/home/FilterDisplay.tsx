import cross from 'src/assets/cross.svg';

export default function FilterDisplay({ name }: { name: string }) {
    return (
      <div className="flex items-center gap-2 p-2 border border-black rounded-lg">
        <div>{name}</div>
        <img alt="cross" className="w-4 h-4" src={cross} />
      </div>
    );
  }