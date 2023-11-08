export const SORTING_OPTIONS = {
  alphabetical: {
    title: 'asc',
  },
  popular: {
    reviewCount: 'desc',
  },
  rating: {
    averageRating: { sort: 'desc', nulls: 'last' },
  },
};
