import mockData from 'src/assets/mockdata.json';
import FoodDisplay from './FoodDisplay';

export default function FoodGallery() {
    return (
      <div className="flex gap-10 flex-wrap">
        {mockData.map((f) => (
          <FoodDisplay key={f.id} recipe={f} />
        ))}
      </div>
    );
  }