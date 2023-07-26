import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import './Components.css';

export const PdfInput = () => {
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [pdfs, setPdfs] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        const docPdf = { name, des };
        console.log(docPdf);

        // Use Axios to make the POST request
        axios.post('http://localhost:8080/docPdf/add', docPdf, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            console.log('New Pdf Added');
        })
        .catch((error) => {
            console.error('Error adding the PDF:', error);
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


            <div>
                {pdfs.map(docPdf=>(
                    <ul key={docPdf.id}>
                        <li>
                            Id:{docPdf.id}
                            Name:{docPdf.name}
                            Description:{docPdf.description}
                        </li>
                    </ul>
                )

                )}
            </div>
        </div>
    );
};
