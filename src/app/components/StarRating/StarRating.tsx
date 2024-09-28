// Star rating component
export const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index}>&#9733;</span> // Full star
      ))}
      {halfStar && <span>&#9734;</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index}>&#9734;</span> // Empty star
      ))}
    </div>
  );
};
