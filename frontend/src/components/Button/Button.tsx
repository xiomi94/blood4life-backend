interface Props {
  children: any,
  backgroundColor?: string,
  onButtonClick?: () => void,
  textColor?: 'black' | 'white',
  type?: "button" | "submit" | "reset"
}

function Button({
                  children,
                  backgroundColor = 'blue-600',
                  onButtonClick,
                  textColor = 'white',
                  type = "button"
                }: Props) {

  const textColorClass = {
    black: 'text-black',
    white: 'text-white'
  };

  return (
    <button
      type={type}
      onClick={() => onButtonClick?.()}
      className={`
        inline-flex items-center 
        px-4 py-2 
        rounded-md 
        shadow-sm 
        bg-${backgroundColor} 
        ${textColorClass[textColor]}
        hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
    >
      {children}
    </button>
  );
}

export default Button;
