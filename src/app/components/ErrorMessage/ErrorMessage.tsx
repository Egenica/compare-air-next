export const ErrorMessage = ({ errorTxt }: { errorTxt: string }) => {
  return (
    <div
      className="bg-white text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline font-semibold">{errorTxt}</span>
    </div>
  );
};
