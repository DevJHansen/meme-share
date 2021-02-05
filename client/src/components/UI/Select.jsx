import React from "react";
import colors from "../../config/colors";
import globalStyles from "../../config/globalStyles";

const Select = (props) => {
  const { items, select } = props;
  return (
    <select
      defaultValue={"DEFAULT"}
      style={{ ...styles.select, ...props.style }}
      onChange={select}
    >
      {items.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {item.option === "DEFAULT" ? (
              <option disabled value="DEFAULT">
                {item.value}
              </option>
            ) : (
              <option value={item.value}>{item.option}</option>
            )}
          </React.Fragment>
        );
      })}
    </select>
  );
};

const styles = {
  select: {
    borderRadius: 10,
    border: "none",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    outline: "none",
    fontSize: 16,
    color: colors.text,
    boxSizing: "border-box",
    boxShadow: globalStyles.boxShadow,
  },
};

export default Select;
