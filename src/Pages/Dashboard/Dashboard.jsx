
import { Button } from '@mui/material'
import Header from './../../Components/Header';
import { DownloadOutlined } from '@mui/icons-material';
import { Box, Stack } from "@mui/material";
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';


const Dashboard = () => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

        <Header title="DASHBOARD" subTitle="Welcome to your dashboard" />

        <Box sx={{ textAlign: "right", mb: 1.3 }}>
          <Button aria-label='button screenshot'  color="primary" sx={{ padding: "6px 8px", fontWeight: '800', textTransform: "capitalize" }} variant="contained"> <DownloadOutlined /> Download Reports</Button>
        </Box>

      </Stack>
      <Row1/>
      <Row2/>
      <Row3/>
      
    </>
      
   
  )
}

export default Dashboard
