import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Header from './../../Components/Header';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './../../firebase';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Loading from './../Loading/Loading';
import useCheckAdmin from "../../utils/checkAdmin";

export default function Contacts() {
  const [DataFireBase, setDataFireBase] = useState(null)
  const [loadingDlt, setloadingDlt] = useState(null)

  const handleDeleteClick = (id) => async () => {
  const selectedDoc = DataFireBase?.find((doc) => doc?.id === id);

  if (!selectedDoc) {
    console.error("Document not found for ID:", id);
    return;
  }

  try {
    setloadingDlt(true);
    await deleteDoc(doc(db, "Contacts", selectedDoc.id)); // use Firestore ID

    setDataFireBase((prev) => prev.filter((row) => row.id !== id));
  } catch (error) {
    console.error("Error deleting document:", error);
  } finally {
    setloadingDlt(false);
  }
};

  const isAdmin = useCheckAdmin();

  async function GetData() {
    const allDocs = [];
    const querySnapshot = await getDocs(collection(db, "Contacts"));
    querySnapshot.forEach((doc) => {
    allDocs.push({ ...doc.data(), id: doc.id });    });
    setDataFireBase(allDocs);
  }
  useEffect(() => {
    GetData()
  }, [])

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "Name",
      width: 120,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 44
    },
    {
      field: "contactNumber",
      headerName: "Phone Number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address1",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
     getActions: ({ id }) => {
    return [
      <GridActionsCellItem
        disabled={loadingDlt}
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick(id)}
        color="#ffff"
      />
    ];
  }
    }
  ];

  return (
    <>
      <Header title="CONTACTS" subTitle="List of Contacts for Future Reference" />
      {DataFireBase ?
        <Box>
           {
              isAdmin ? <DataGrid checkboxSelection slots={{ toolbar: GridToolbar, }} rows={DataFireBase} columns={columns} editMode="row" />
                : <Typography textAlign={'center'} variant="h3" mt={10}>You should be An admin</Typography>
            }
        </Box>
        :
        <Loading />
      }
    </>
  )
}
