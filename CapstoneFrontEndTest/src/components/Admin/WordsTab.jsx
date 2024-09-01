import {useEffect, useState} from 'react';
import {adminfetchWords} from "./hooks/useFetchWords.js";
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function WordsTab() {
    const [words, setWords] = useState([]);
    const navigate = useNavigate();

    const handleWordClick = () => {
        navigate('/admin/dashboard/words');
    };

    useEffect(() => {
        const getMinWords = async () => {
            try {
                const response = await adminfetchWords();
                const minWords = response.slice(0, 5);
                setWords(minWords);
            } catch (error) {
                console.error('Failed to fetch words!', error);
            }
        };
        getMinWords();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Word</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {words.map(word => (
                            <TableRow key={word.id}>
                                <TableCell>{word.id}</TableCell>
                                <TableCell>{word.word}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleWordClick}>
                    See All Words
                </Button>
            </Box>
        </>
    );
}
