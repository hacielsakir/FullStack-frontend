import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import './Components.css';
import { Button } from '@mui/material';

export const PdfInput = () => {
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [pdfs, setPdfs] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        const docPdf = { name, description: des};
        console.log(docPdf);

        // Use Axios to make the POST request
        axios.post('http://localhost:8080/docPdf/add', docPdf, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            console.log('New Pdf Added');
            
            axios.get("http://localhost:8080/docPdf/getAll")
                    .then(response => {
                        setPdfs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching PDFs:', error);
                    });
        })
        .catch((error) => {
            console.error('Error adding the PDF:', error);
        });
    };

    const handleDelete = (id) => {
        // Use Axios to make the DELETE request
        axios.delete(`http://localhost:8080/docPdf/delete/${id}`)
            .then(() => {
                console.log('Pdf Deleted');

                axios.get("http://localhost:8080/docPdf/getAll")
                    .then(response => {
                        setPdfs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching PDFs:', error);
                    });
            })
            .catch((error) => {
                console.error('Error deleting the PDF:', error);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8080/docPdf/getAll")
            .then(response => {
                setPdfs(response.data);
            })
            .catch(error => {
                console.error('Error fetching PDFs:', error);
            });
    }, []);
    

    return (
        <div name="divForInput">
            <h1>Submit</h1>
            <form>
                <label className="label1" htmlFor="inputName" required>Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="inputName"
                    className="input1"
                    type="text"
                />
                <label className="label1" htmlFor="inputDescription" required>
                    Description
                </label>
                <textarea
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                    id="inputDescription"
                    className="input1"
                    rows="3"
                />
                {/* <input className='PdfSelect' type="file" accept="application/pdf"></input> */}
                <input type="submit" value="Submit" onClick={handleClick} />
            </form>


            <div className='outputPdf'>
                {pdfs.map(docPdf=>(
                    <ul key={docPdf.id}>
                        <li>
                            Id:{docPdf.id} <br/>
                            Name:{docPdf.name} <br/>
                            Description:{docPdf.description} <br/>
                            <Button variant="contained" onClick={() => handleDelete(docPdf.id)}>Delete</Button>
                        </li>
                    </ul>
                )

                )}
            </div>
        </div>
    );
};
