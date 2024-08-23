type NameViewProps = {
  name?: string | null;
  shortName?: string | null;
  alternativeNames?: string[];
};

const NameView = ({ name, shortName, alternativeNames }: NameViewProps) => {
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

export default NameView;
