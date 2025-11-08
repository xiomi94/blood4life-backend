interface Props {
  children: any,
}

function LabelForm(props: Props) {
  return (
    <label>{props.children}</label>
  );
}

export default LabelForm;