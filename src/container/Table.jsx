import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { columns } from "../utils/config";

const TableContainer = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Data");
        setData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rowComponent = (data, col) => {
    if (col.type === "img")
      return (
        <img
          src={data}
          alt="img"
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
      );
    if (Array.isArray(data)) return data.join(", ");
    return data;
  };

  //   const CustomValue = (data) => {
  //     if (Array.isArray(data)) return data.join(", ");
  //   }

  return <Table data={data} columns={columns} rowComponent={rowComponent} />;
};

export default TableContainer;
