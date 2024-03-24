import "./App.css";
import { useState, useEffect } from "react";
import { Image } from "antd";
import axios from "axios";
import AntTable from "./component/AntTable";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response?.data?.products);
      makeColumns(response?.data?.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  function capitalizeWords(str) {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const makeColumns = (list) => {
    let ColTemp;
    const newArr = [];
    if (list?.length > 0) {
      ColTemp = Object.keys(list[0]);
    }
    if (ColTemp.length > 0) {
      ColTemp?.filter((item) => item !== "id")?.map((item) =>
        newArr.push({
          dataIndex: item,
          title: capitalizeWords(item),
          align: "center",
          render: item?.includes("image")
            ? (_text, record) =>
                record?.thumbnail ? (
                  <Image
                    preview="false"
                    style={{ borderRadius: "50%" }}
                    src={record.thumbnail}
                    width={50}
                    height={50}
                  />
                ) : (
                  "-"
                )
            : null,
        })
      );
    }
    return setColumns(newArr);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <AntTable
        bordered
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </div>
  );
};

export default App;
