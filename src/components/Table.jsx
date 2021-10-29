import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlineSortAscending } from "react-icons/ai";
import { filterableType } from "../utils/config";

const Table = ({ data, columns, rowComponent }) => {
  const [sortedColumns, setSortedColumns] = useState([]);
  const [filterConfig, setFilterConfig] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const parseValue = (_data, path) => {
    const _paths = path.split(".");
    let value = _data;
    if (_paths.length) {
      for (var i = 0; i < _paths.length; i++) {
        value = value[_paths[i]];
        if (!value) return "";
      }
    }
    return value;
  };

  const applySort = (title) => {
    const index = sortedColumns.findIndex(title) === -1;
    if (index) {
      setSortedColumns([...sortedColumns, title]);
    } else {
      setSortedColumns(sortedColumns.filter((_title) => title !== _title));
    }
  };

  //   const filterData = ()

  const applyFilter = (path, val) => {
    const index = filterConfig.findIndex(({ title }) => title === path);
    let _filterConfig = [...filterConfig];
    if (!val) {
      setFilterConfig(filterConfig.filter((item) => item.title !== path));
    } else if (val) {
      if (index !== -1) {
        _filterConfig[index] = { title: path, val: val };
      } else {
        _filterConfig.push({ title: path, val: val });
      }
      setFilterConfig(_filterConfig);
    }

    const _filtered = filteredData.filter((_data) =>
      parseValue(_data, path).includes(val)
    );
    setFilteredData(_filtered);
  };

  useEffect(() => {
    if (data.length) setFilteredData(data);
  }, [data]);

  useEffect(() => {
    console.log("-------");
    let _filteredData = [...data];
    filterConfig.forEach(({ title, val }) => {
      _filteredData.push(
        _filteredData.filter((_data) => parseValue(_data, title).includes(val))
      );
    });
    setFilteredData(_filteredData);
  }, [filterConfig.length]);

  console.log(filterConfig);

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ title, path, shouldSort, shouldFilter }, i) => (
            <th key={i}>
              <div>
                <div>
                  {title} {<AiOutlineSortAscending />}
                </div>
                <div>
                  {shouldFilter && (
                    <input
                      onChange={(e) => applyFilter(path, e.target.value)}
                    ></input>
                  )}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      {filteredData.map((_data, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>
              {rowComponent
                ? rowComponent(parseValue(_data, column.path), column, data)
                : _data[column]}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
};

Table.defaultProps = {
  data: [],
};

export default Table;
