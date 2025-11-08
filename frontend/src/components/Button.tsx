interface Props {
  children: any,
  backgroundColor?: string,
  onButtonClick?: () => void,
  textColor?: 'black' | 'white',
  type?: "button" | "submit" | "reset"
}

function Button({ children, backgroundColor='white', onButtonClick, textColor='black', type }: Props) {

  const textColorClass = {
    black: 'text-black',
    white: 'text-white'
  }

  return (<button type={type}
    onClick={() => {onButtonClick?.()}} className={`inline-flex items-center px-5 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-${backgroundColor} ${textColorClass[textColor]} disabled:opacity-50 cursor-pointer`}>{ children }</button>)
}

export default Button