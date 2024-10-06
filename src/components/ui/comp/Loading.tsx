const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-7">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
