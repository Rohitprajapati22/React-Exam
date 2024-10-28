import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const View = () => {
    const [record, setRecord] = useState([]);
    const [mdelete, setMdelete] = useState([]);
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

  
    const multipleDelete = (userid, checked) => {
        let all = [...mdelete];
        if (checked) {
            all.push(userid);
        } else {
            all = all.filter((id) => id !== userid);
        }
        setMdelete(all);
    };

   
    const allDelete = () => {
        const updatedRecords = record.filter(user => !mdelete.includes(user.userid));
        setRecord(updatedRecords);
        localStorage.setItem("users", JSON.stringify(updatedRecords));
        setMdelete([]); 
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
                                <th>
                                    <button onClick={allDelete} disabled={mdelete.length === 0}>
                                        Delete Selected
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {record.map((val) => (
                                <tr key={val.userid}>
                                    <td>{val.userid}</td>
                                    <td>{val.name}</td>
                                    <td>{val.description}</td>
                                    <td>
                                        <button onClick={() => del(val.userid)}>Delete</button>&nbsp;&nbsp;
                                        <button className="edit" onClick={() => navigate(`/edit`, { state: val })}>Edit</button>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => multipleDelete(val.userid, e.target.checked)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/">Add</Link>
                </div>
            </div>
        </div>
    );
};

export default View;
