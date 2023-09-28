import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchDish } from 'src/utils/api-calls';

export default function useRecipe() {
  /** Get the id from the url */
  const params = useParams();
  const { id } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ['dish', id],
    queryFn: () => fetchDish(id),
  });

  return { data, isLoading, error };
}
