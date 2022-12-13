import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import './listbanks.css';

const InforBankItem = () => {

    const [listBanks, setListBanks] = useState([]);
    const [selectOption, setSelectOption] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("https://api.vietqr.io/v2/banks");
            setListBanks(res && res.data && res.data.data ? res.data.data : []);
        };
        fetchData();
    },[]);

    const handleChange = (e) => {
        setSelectOption(e.target.value);
    };


    return (
        <Container maxWidth="md" sx={{paddingTop: 7}}>
            <FormControl sx={{ minWidth: 150, backgroundColor: "#ffffff"}}>
                <InputLabel id="demo-controlled-open-select-label">Bank</InputLabel>

                <Select labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Bank"
                        onChange={handleChange}
                        value={selectOption || ''}
                >
                    {listBanks && listBanks.length > 0 
                        && listBanks.map((bank, index) => (
                            <MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
                        ))}
                </Select>
            </FormControl>

            {!selectOption ? '' :
                <TableContainer component={Paper} elevation={12} sx={{marginTop: 7, marginBottom: 7}}>
                    <Table>
                        {listBanks
                            .filter((value) => {
                                return Number(value.id) === Number(selectOption);
                            })
                            .map((bank, index) => (
                            <TableBody key={bank.id}>
                                <TableRow>
                                    <TableCell variant="head" component="th">Full name</TableCell>
                                    <TableCell>{bank.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">Short name</TableCell>
                                    <TableCell>{bank.shortName}</TableCell>
                                </TableRow>
                                {/* <TableRow> */}
                                    {/* <TableCell variant="head" component="th">English name</TableCell> */}
                                    {/* <TableCell>English name</TableCell> */}
                                {/* </TableRow> */}
                                <TableRow>
                                    <TableCell variant="head" component="th">ID</TableCell>
                                    <TableCell>{bank.code}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">Swift code</TableCell>
                                    <TableCell>{bank.swift_code}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">ID Bin QuickLink</TableCell>
                                    <TableCell>{bank.bin}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">Logo</TableCell>
                                    <TableCell><img src= {bank.logo} alt="logo"/></TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                        
                    </Table>
                </TableContainer>
        }                 

        </Container>
    )

}
   
export default InforBankItem;