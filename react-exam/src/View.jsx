import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const View = () => {
    const [record, setRecord] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedRecords = JSON.parse(localStorage.getItem("users")) || [];
        setRecord(storedRecords);
    }, []);

    const del = (userid) => {
        const updatedRecords = record.filter(user => user.userid !== userid);
        setRecord(updatedRecords);
        localStorage.setItem("users", JSON.stringify(updatedRecords));
    };


    return (
        <div>
            <div className="container">
                <div className="row">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                record.map((val) => (
                                    <tr key={val.userid}>
                                        <td>{val.userid}</td>
                                        <td>{val.name}</td>
                                        <td>{val.description}</td>
                                        <td>
                                            <button onClick={() => del(val.userid)}>Delete</button>&nbsp;&nbsp;
                                            <button className='edit' onClick={() => navigate(`/edit`, { state: val })}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Link to="/">Add</Link>
                </div>
            </div>
        </div>
    );
};

export default View;
