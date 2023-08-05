import React, { useState } from "react";
import Select from "react-select";

const Sectors = () => {
  const [sectors, setSectors] = useState([]);

  const handleChange = (value) => {
    setSectors(value);
  };

  return (
    <div className='max-w-7xl mx-auto mt-10'>
      <Select
        options={[
          { value: "1", label: "Manufacturing" },
          { value: "2", label: "Service" },
          { value: "3", label: "Other" },
        ]}
        onChange={handleChange}
      />
    </div>
  );
};

export default Sectors;
