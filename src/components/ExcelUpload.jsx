import React, { useState, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { useNavigate } from "react-router-dom";

function ExcelUpload() {
  const [excelData, setExcelData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [myData, setMyData] = useState(false);

  useEffect(() => {
    const myInfo = localStorage.getItem("myInfo");
    const myDataParsed = JSON.parse(myInfo);
    setMyData(myDataParsed);
  }, []);

  const handleFileUpload = (event) => {
    const fileObj = event.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setExcelData(resp.rows);
      }
    });
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleEditField = (rowIndex, cellIndex, event) => {
    const updatedData = [...excelData];
    updatedData[rowIndex][cellIndex] = event.target.value;
    setExcelData(updatedData);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {myData && (
        <nav>
          {" "}
          <button className="btns" onClick={handleLogout}>
            LogOut
          </button>
        </nav>
      )}
      <div className="cont">
        {myData && (
          <>
            <h2>Upload Excel Sheet</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            <br />
            <br />
          </>
        )}
        {myData && (
          <>
            <br />
            <br />
            {excelData && (
              <button className="btns" onClick={handleEditClick}>
                {editing ? "Save" : "Edit"}
              </button>
            )}
            <br />
            <br />
          </>
        )}
        {excelData && myData && (
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {excelData[0].map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ border: "1px solid black" }}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: "1px solid black" }}>
                      {(cellIndex === 0 || cellIndex === 1) && editing ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(event) =>
                            handleEditField(rowIndex, cellIndex, event)
                          }
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ExcelUpload;
