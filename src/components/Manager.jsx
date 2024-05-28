import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const passref = useRef();
    const eyeref = useRef();

    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function getpasswords() {
        let req = await fetch('http://localhost:3000');
        let passwords = await req.json();
        if (passwords) {
            setPasswordArray(passwords);
        }

    }

    useEffect(() => {
        getpasswords();
    }, []);

    const showPassword = () => {
        if (passref.current.type === 'password') {
            eyeref.current.src = 'hidden.png';
            passref.current.type = 'text';
        } else {
            eyeref.current.src = 'eye.png';
            passref.current.type = 'password';
        }
    };

    const savePassword = async () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            setPasswordArray(newPasswordArray);
            let req = await fetch('http://localhost:3000', { method: 'POST', body: JSON.stringify({ ...form, id: uuidv4() }), headers: { 'Content-Type': 'application/json' } });
            // localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
            setForm({ site: '', username: '', password: '' });
            getpasswords();
            toast("Password Saved!");
        }
        else
            toast("Error: One or more fields are empty");

    };

    const copyText = (text) => () => {
        navigator.clipboard.writeText(text);
        toast("Copied to Clipboard!");
    };

    const deleteText = (id) => async () => {
        let confirmDelete = confirm("Are you sure you want to delete this password?");
        if (confirmDelete) {
            const updatedArray = passwordArray.filter((item) => item.id !== id);
            setPasswordArray(updatedArray);
            // localStorage.setItem("passwords", JSON.stringify(updatedArray));
            await fetch(`http://localhost:3000/${id}`, { method: 'DELETE' });
            toast("Password deleted!");
        }
    };

    const editText = (id) => async () => {
        const itemToEdit = passwordArray.find((item) => item.id === id);
        setForm(itemToEdit);
        await fetch(`http://localhost:3000/${id}`, { method: 'DELETE' });
    };

    const toggleRow = (index) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <>
            <ToastContainer />
            <div className="md:p-0 md:mycontainer md:mt-20 md:mb-20 pb-10">
                <h1 className='flex justify-center p-5 flex-wrap'>
                    <div>
                        <span className='logo  text-center font-bold text-green-500 text-4xl'>&lt;</span>
                        <span className='logo  text-center font-bold text-black text-4xl'>Pass</span>
                        <span className='logo  text-center font-bold text-green-500 text-4xl'>OP/&gt;</span>
                    </div>
                    <span className='logo text-center w-full text-black text-md mt-5 md:text-2xl '>Your personal password manager</span>
                </h1>
                <div className="flex flex-col p-4 my-0 max-w-3xl mx-auto pb-0">
                    <input onChange={handleChange} name='site' value={form.site} placeholder='Website URL' className="rounded-full m-2 px-3 h-10 text-lg border border-green-600" type="text" />
                    <div className='flex w-full justify-between'>
                        <input onChange={handleChange} name='username' value={form.username} placeholder='Username' className="rounded-full w-full m-2 px-3 h-10 text-lg border border-green-600" type="text" />
                        <div className='relative w-[60%]'>
                            <input onChange={handleChange} name='password' value={form.password} ref={passref} placeholder='Password' className="rounded-full w-full m-2 px-3 h-10 text-lg border border-green-600 z-[-1]" type="password" />
                            <span onClick={showPassword} className='absolute top-[14px] right-0 p-1 hover:cursor-pointer'>
                                <img ref={eyeref} width={20} src="eye.png" alt="Toggle Password Visibility" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='shadow-2xl flex justify-center gap-2 items-center mx-auto text-lg bg-green-500 text-white rounded-full px-4 py-1 my-2 text-md w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords md:px-60 mx-5 ">
                    <h1 className='font-bold text-2xl py-3 mx-3 shadow-2xl'>Your Passwords</h1>
                    {passwordArray.length === 0 && <h2 className='text-center text-2xl text-green-700 font-bold'>No Passwords Saved</h2>}
                    {passwordArray.length !== 0 && (
                        <table className="shadow-2xl table-auto w-full text-white overflow-hidden rounded-xl">
                            <thead className='bg-green-800'>
                                <tr>
                                    <th className='py-2 md:w-40'>Site</th>
                                    <th className='py-2 md:w-10 hidden md:table-cell'>Username</th>
                                    <th className='py-2 md:w-10 hidden md:table-cell'>Password</th>
                                    <th className='py-2 md:w-10'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-600'>
                                {passwordArray.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="md:table-row">
                                            <td className='py-3 text-center'>
                                                <div className='flex items-center justify-center md:gap-3 gap-1'>
                                                    <a href={item.site} target="_blank">{item.site}</a>
                                                    <div className='cursor-pointer size-5 shadow-2xl' onClick={copyText(item.site)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 text-center hidden md:table-cell'>
                                                <div className='flex items-center justify-center md:gap-3 gap-1'>
                                                    {item.username}
                                                    <div className='cursor-pointer size-5 shadow-2xl' onClick={copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 text-center hidden md:table-cell'>
                                                <div className='flex items-center justify-center md:gap-3 gap-1'>
                                                    •••••••
                                                    <div className='cursor-pointer size-5 shadow-2xl' onClick={copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 text-center'>
                                                <div className='flex items-center justify-center text-center gap-3'>
                                                    <div className='cursor-pointer size-5 shadow-2xl' onClick={editText(item.id)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff">
                                                        </lord-icon>
                                                    </div>
                                                    <div className='cursor-pointer size-5 shadow-2xl' onClick={deleteText(item.id)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                                <button
                                                    className='text-white bg-green-700 hover:bg-green-800 py-1 px-3 rounded mt-2 flex md:hidden justify-center mx-auto'
                                                    onClick={() => toggleRow(index)}
                                                >
                                                    {expandedRows[index] ? "Hide" : "Show"}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedRows[index] && (
                                            <tr className='bg-green-700 md:hidden'>
                                                <td colSpan="4" className='py-3'>
                                                    <div className='flex flex-col items-center'>
                                                        <div className='flex items-center justify-center text-center gap-3'>
                                                            <span>Username: {item.username}</span>
                                                            <div className='cursor-pointer size-5 shadow-2xl' onClick={copyText(item.username)}>
                                                                <lord-icon
                                                                    style={{ width: "25px", height: "25px" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    colors="primary:#ffffff">
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-center text-center gap-3 mt-2'>
                                                            <span>Password: {item.password}</span>
                                                            <div className='cursor-pointer size-5 shadow-2xl' onClick={copyText(item.password)}>
                                                                <lord-icon
                                                                    style={{ width: "25px", height: "25px" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    colors="primary:#ffffff">
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;