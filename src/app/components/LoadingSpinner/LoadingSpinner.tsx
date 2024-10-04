import './spinner.css';

const LoadingSpinner = ({
  loadingText,
  textColorClass,
}: {
  loadingText?: string;
  textColorClass?: string;
}) => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      role="status"
      aria-live="polite"
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span
        className={`ml-2 ${textColorClass || 'text-white'}`}
        data-testid="loading-spinner"
      >
        {loadingText || 'Loading...'}
      </span>
    </div>
  );
};

export default LoadingSpinner;
