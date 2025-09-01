interface Inputs {
  isLoading: boolean;
  isOK?: boolean;
  isFail?: boolean;
  message: string;
}

const DDoneLoading = ({ isLoading, message }: Inputs) => {
  if (!isLoading ) return null;

  let icon;
  if (isLoading) {
    icon = <div className="spinner"></div>;
  }
  return (
    <div className="loading-popup">
      <div className="loading-popup-content">
        {icon}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default DDoneLoading;