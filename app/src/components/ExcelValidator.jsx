import React,{useState,useRef } from 'react'
import Swal from 'sweetalert2';
import {
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  CellsDirective,
  CellDirective,
  SpreadsheetComponent,
  ColumnsDirective,
  ColumnDirective,
  RowsDirective,
  RowDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import "../../App.css";
const ExcelValidator = () => {
  console.log("inside excel validator")
  const [excelData, setExcelData] = useState(null);
  const [masterExcelFile, setMasterExcelFile] = useState(null);
  const [isViewFile, setIsViewFile] = useState(false);
  const fileInputRef = useRef(null);
  const masterFileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(parsedData);
      console.log(parsedData)
      if (parsedData) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "File Uploaded.",
        });
      }
    };
  };

  const handleFileUploadMaster = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setMasterExcelFile(parsedData);
      console.log(parsedData)
      if (parsedData) {
        console.log("uploaded master")
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "File Uploaded.",
        });
      }
    };
  };
  const checkFieldInMaster = async (fieldValue) => {
    if (!masterExcelFile) {
      console.log("Master file data is not available.");
      return;
    }

    const isFieldFound = masterExcelFile.some(masterRow => Object.values(masterRow).includes(fieldValue));
    console.log(isFieldFound, "isFieldFound")
    if (!isFieldFound) {
      await Swal.fire({
        title: "Field Not Found",
        icon: "warning",
        text: `Field value "${fieldValue}" does not exist in the master file.`,
        confirmButtonText: "OK",
      });
    }
  };

  const handleValidate = async () => {
    if (excelData && masterExcelFile) {
      const columnCountMasterExcelFile = Object.keys(masterExcelFile[0]).length;
      const columnCountExcelFile = Object.keys(excelData[0]).length;
    console.log(columnCountExcelFile,columnCountMasterExcelFile)
      if (columnCountExcelFile !== columnCountMasterExcelFile) {
        Swal.fire({
          title: "Columns Not Found",
          icon: "error",
          text: "Number of columns in the file you uploaded are not equal to the number of columns in the master file.",
        });
      }
      setTimeout(async () => {
        for (const normalRow of excelData) {
          for (const field in normalRow) {
            const fieldValue = normalRow[field];
            await checkFieldInMaster(fieldValue);
          }
        }
      }, 2000);

    }
  };

  const handelView = () => {
    if (excelData) {
      setIsViewFile(true);
    } else {
      Swal.fire({
        title: "Error",
        icon: "warning",
        showCloseButton: true,
        focusConfirm: false,
        text: "No Excel File Selected",
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleButtonClickMaster = () => {
    masterFileInputRef.current.click();
  };
  return (
    <div style={{ height: "100vh", marginTop: "2rem" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <button onClick={handleButtonClick} className="Secondary-btn">
          File Upload
        </button>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button onClick={handleValidate} className="primary-btn">
          Validate
        </button>
        <button
          onClick={handelView}
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
          className="primary-btn"
        >
          view File
        </button>
        <button onClick={handleButtonClickMaster} className="Secondary-btn">
          Master File Upload
        </button>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUploadMaster}
          style={{ display: "none" }}
          ref={masterFileInputRef}
        />
      </div>
      {isViewFile && (
        <div className="App">
          <SpreadsheetComponent
            allowOpen={true}
            openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
            allowSave={true}
            saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
          >
            <SheetsDirective>
              <SheetDirective>
                <RangesDirective>
                  <RangeDirective dataSource={excelData}></RangeDirective>
                </RangesDirective>
                <RowsDirective>
                  <RowDirective>
                    <CellsDirective>
                      {Object.keys(excelData[0])?.map((key) => (
                        <CellDirective
                          value={key}
                          style={boldCenter}
                        ></CellDirective>
                      ))}
                    </CellsDirective>
                  </RowDirective>
                  {excelData.map((row, index) => (
                    <RowDirective key={index}>
                      <CellsDirective>
                        {Object.values(row).map((value, index) => (
                          <CellDirective
                            value={value}
                            key={index}
                          ></CellDirective>
                        ))}
                      </CellsDirective>
                    </RowDirective>
                  ))}
                </RowsDirective>
                <ColumnsDirective>
                  {Object.keys(excelData[0])?.map((key) => (
                    <ColumnDirective
                      width={key.length > 4 ? key.length * 10 : key.length * 50}
                      key={key}
                    ></ColumnDirective>
                  ))}
                </ColumnsDirective>
              </SheetDirective>
            </SheetsDirective>
          </SpreadsheetComponent>
        </div>
      )}
    </div>
  )
}

export default ExcelValidator;