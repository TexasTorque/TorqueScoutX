const Image = ({ name, link }) => {
  return (
    <div className="image">
      <img width="300px" src={link} alt="" />
    </div>
  );
};

export const ImageWidget = {
  schemaFields: ["name", "link"],
  schemaFieldsTypes: ["s", "s"],
  widget: function (props) {
    return <Image {...props} />;
  },
};

export default Image;
