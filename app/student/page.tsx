"use client";

// react components
import React, { useEffect, useState } from "react";

// components

// assets
import { StudentData } from "./studentData";
import { Box } from "@mui/material";
import { GridCellParams, GridColDef, DataGrid, GridRowId } from "@mui/x-data-grid";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailModal from "@/components/global/EmailModal";

type EditableFieldProps = {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const EditableField: React.FC<EditableFieldProps> = ({
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) => {
  return (
    <div>
      {isEditing ? (
        <span className="flex gap-2">
          <SaveIcon style={{ color: "#1e6834" }} onClick={onSave} />
          <CancelIcon style={{ color: "#000" }} onClick={onCancel} />
        </span>
      ) : (
        <span className="flex gap-2">
          <EditIcon style={{ color: "#5f7076" }} onClick={onEdit} />
          <DeleteIcon style={{ color: "#842a37" }} onClick={onDelete} />
        </span>
      )}
    </div>
  );
};

type studentsFormatted = {
  [id: number]: student
}

const Page = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<student[]>([])
  const [formattedStudentData, setFormattedStudentData] = useState<studentsFormatted>()

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save the data here
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Add logic to cancel editing here
  };

  const handleDeleteClick = () => {
    // Add logic to delete the data here
  };

  const handleRowSelection = (data: any) => {
    const recipients = data.map((studentId: any) => formattedStudentData && formattedStudentData[studentId]);
    setSelectedRows(recipients);
  }

  useEffect(() => {
    const data: studentsFormatted = {};

    StudentData.forEach(student => {
      data[student.id] = student
    })

    setFormattedStudentData(data);
    console.log(data);

  }, [])


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Bears Id",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 150,
    },
    {
      field: "firstName",
      headerName: "First Name",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 270,
      editable: true,
    },
    {
      field: "classification",
      headerName: "Classification",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 250,
      editable: true,
    },
    {
      field: "gpa",
      headerName: "GPA",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => (
        <EditableField
          isEditing={isEditing}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      ),
    },
  ];

  const closeModal = () => {
    setModalShown((state) => !state);
  };



  return (
    <div className={`w-full h-screen flex items-center justify-center`}>
      <Box>
        <Box>
          <div className="text-5xl tracking-wide font-sans font-semibold ">
            Students
          </div>
          <button
            onClick={() => setModalShown((state) => !state)}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-shaw-garnet text-white p-2"
          >
            <span>Send email</span>
            <EmailOutlinedIcon />
          </button>
            {
              modalShown &&
              <EmailModal recipients={selectedRows} modalShown={modalShown} closeModal={closeModal} />
            }
          <Box
            m="20px 0"
            height="74vh"
            width={"75vw"}
            sx={{
              "& .MuiDataGrid-columnHeaderDraggableContainer": {
                backgroundColor: "#8c2333",
                color: "#fff",
              },
              "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root":
                {
                  color: "#a5884a",
                },
              "& .css-wop1k0-MuiDataGrid-footerContainer": {
                backgroundColor: "#8c2333",
                color: "#fff",
              },
              "& .css-rtrcn9-MuiTablePagination-root": {
                color: "#fff",
              },
              "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled":
                {
                  color: "#fff",
                },
              "& .MuiDataGrid-main ": {
                backgroundColor: "#f8f8f8",
              },
              // "& .MuiDataGrid-virtualScroller": {
              //   width: "4px",
              // },
            }}
          >
            <DataGrid
            onRowSelectionModelChange={handleRowSelection}
            className="gridBorder"
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "#fff",
                "& .super-app-theme--header": {
                  backgroundColor: "#8c2333",
                  color: "#fff",
                },
                "& .super-app-theme--cell": {
                  backgroundColor: "#f8f8f8",
                  color: "#000",
                },
              }}
              rows={StudentData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
              pageSizeOptions={[15]}
              checkboxSelection
              disableRowSelectionOnClick
              
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
