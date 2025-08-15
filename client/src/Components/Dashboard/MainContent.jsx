import Card from '@mui/material/Card';
import StatusChart from './StatusChart';
import logo from './../../assets/logo.jpeg'
import PgTableListDashBoard from './PgTableListDashBoard';



const MainContent=({dashboardData,setSelectPg,setOpen })=>{

    


    return <>
        <Card sx={{minHeight:"500px",padding:"40px",backgroundColor:"#1B263B"}} elevation={10}>
         <div className='container'>
            <div className="row">
                <div className="col flex flex-col items-center justify-center gap-4" >
                    <Card sx={{backgroundColor:"#E0E1DD",height:"200px",width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"20px" }} elevation={20} >
                        {/* <button type="button" className="btn btn-warning w-[50%]">Warning</button>  
                        <button type="button" className="btn btn-danger w-[50%]">Danger</button> */}
                        <img src={logo} alt="" width={200} style={{mixBlendMode: 'multiply'}}/>
                    </Card>
                </div>
                {/* total Property */}
                <div className="col">
                    <Card elevation={30} sx={{backgroundColor:"#E0E1DD",height:"200px",padding:"20px",display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <p  style={{fontSize:"1.5rem",fontWeight:700}}>Total Properties</p>
                        <p style={{fontSize:"3rem",fontWeight:700,color:"red"}}>{dashboardData [0].properties.length}</p>
                    </Card>
                </div>
                {/* pie chart for girls nd boys*/}
                <div className="col">
                    <Card sx={{backgroundColor:"#E0E1DD",height:"200px",padding:"10px"}} elevation={20} >
                        <StatusChart dashboardData={dashboardData}/>
                    </Card>
                </div>
                {/* button - add/ updtae */}
                
            </div>

            

            <div className="row" style={{marginTop:"20px"}}>
                <div className="col">
                    
                    <PgTableListDashBoard dashboardData = {dashboardData} setSelectPg={setSelectPg} setOpen={setOpen}/>
                    
                </div>
            </div>
            
         </div>

        </Card>
    </>
}
export default MainContent