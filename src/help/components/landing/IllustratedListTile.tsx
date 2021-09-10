const IllustratedListTile = ({ title, image, list, moreLink }) => (
  <div>
    <h3>{title}</h3>
    <a href={moreLink}>More</a>
  </div>
);

export default IllustratedListTile;
