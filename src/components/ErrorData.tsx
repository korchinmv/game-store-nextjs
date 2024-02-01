interface ErrorDataProps {
  errorText: string;
}

const ErrorData = ({ errorText }: ErrorDataProps) => {
  return <h2 className='text-center text-[24px]'>{errorText}</h2>;
};

export default ErrorData;
