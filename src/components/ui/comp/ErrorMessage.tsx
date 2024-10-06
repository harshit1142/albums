interface ErrorMessageProps {
    message: string;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <p>Error: {message}</p>
  );
  
  export default ErrorMessage;
  