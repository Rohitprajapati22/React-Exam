import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [record, setRecord] = useState(JSON.parse(localStorage.getItem("users")) || []);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setName(location?.state?.name)
        setDescription(location?.state?.description)
    }, [location?.state])


    const handleSubmit = (e) => {
        e.preventDefault();


        let update = record.map((val) => {
            if (val.userid == location?.state?.userid) {
                val.name = name
                val.description = description
            }
            return val;
        })
        localStorage.setItem('users', JSON.stringify(update));
        alert("sucessfully record update...");
        navigate('/');

    }

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

export default Edit;
