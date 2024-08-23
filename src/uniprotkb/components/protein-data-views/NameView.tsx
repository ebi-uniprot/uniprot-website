type NameViewProps = {
  name?: string | null;
  shortName?: string | null;
  alternativeNames?: string[];
};

const NameView = (props: NameViewProps) => {
  const { name, shortName, alternativeNames } = props;
  let altNames;
  if (alternativeNames && alternativeNames.length > 0) {
    altNames = alternativeNames.join(', ');
  }
  return (
    <span>
      <strong>{name}</strong> {shortName}
      {altNames && <div>{altNames}</div>}
    </span>
  );
};

NameView.defaultProps = {
  name: undefined,
  shortName: undefined,
  alternativeNames: undefined,
};

export default NameView;
