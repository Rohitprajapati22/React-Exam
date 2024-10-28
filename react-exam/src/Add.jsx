import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './add.css'

const Add = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [record, setRecord] = useState(JSON.parse(localStorage.getItem("users")) || []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            userid: Math.floor(Math.random() * 10000),
            name: name,
            description: description,
        };

        const newField = [...record, obj];
        setRecord(newField);
        localStorage.setItem("users", JSON.stringify(newField));
        alert("Successfully added...");
        setName(''); 
        setDescription('');
    };

    return (
        <div className="container">
            <div className="row">
                <h1>My Todos</h1>

                <form onSubmit={handleSubmit}>
                    <div className='name'>
                        <label>Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>

                    <div className="description">
                        <label>Description</label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>

                    <button type="submit">Add Todo</button>
                </form>
                <Link to={'/view'}>View</Link>
            </div>
        </div>
    );
}

export default Add;
