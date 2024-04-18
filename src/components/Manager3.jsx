
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4 }from 'uuid';


    const ref = useRef()
    const passwardRef = useRef()

    const [form, setform] = useState({ site: " ", username: " ", passward: " " })
    const [passwardArray, setPasswardArray] = useState([]);

    useEffect(() => {
        let passwards = localStorage.getItem("passwards");
        let  passwardArray;
        if (passwards) {
        
            setPasswardArray(JSON.parse(passwards));
        }

    }, [])


    const copyText = (text) => {
        alert("copied to clipboard")

        navigator.clipboard.writeText(text)
    }


    const savePassward = () => {

        setPasswardArray([...passwardArray, {...form , id:uuidv4()  }])
        localStorage.setItem("passwords", JSON.stringify([...passwardArray, {...form , id:uuidv4()  }]))
        console.log([...passwardArray, form])
    }
    const deletePassward =(id) =>{
        console.log("deleting passwords with id ",id);
        setPasswardArray(passwardArray.filter(item =>item.id !==id ));
        localStorage.setItem("passwards" , JSON.stringify(passwardArray.filter(item =>item.id !== id )))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


const Manager3 = () => {
    return (
        <>


            <div className="container w-full min-h-[clac(100%-29px)] bg-green-800 ">
                <div className="box w-full h-lvh ">

                    <div className="md:container  md:px-0   ">
                        <div className="w-full h-1vh  flex justify-center items-center flex-col bg-green-200 ">

                            <div className='flex justify-center items-center flex-col '>

                                <h1 className='text-xl font-bold text-green-500'>&lt;<span className='text-black'>Pass</span>
                                    OP/&gt;</h1>
                                <p className='text-green-600'>Your own Passward manager </p>
                            </div>

                            <div className="text-white flex flex-col p-4  gap-4">

                                <input ref={passwardRef} value={form.site} onChange={handleChange} placeholder='Enter URL' className='rounded-full  border border-green-700 text-black px-5' type="text" name="site" id="" />
                                <div className="flex flex-col  gap-4 ">

                                    <input value={form.username} onChange={handleChange} placeholder='User Name ' className='rounded-full border border-green-700 text-black  px-4' type="text" name="username" />
                                    <input value={form.passward} onChange={handleChange} placeholder='Passward' className='rounded-full  border border-green-700  text-black px-4 ' type="Password" name="passward" />
                                </div>
                            </div>
                            <div>
                                <button onClick={savePassward} className='bg-green-600 rounded-full px-4 gap-3 flex justify-center items-center hover:bg-green-700'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                                        trigger="hover">
                                    </lord-icon>
                                    Add Password</button>
                            </div>
                            <div className="password w-full">
                                <h2 className='text-2xl font-bold py-3'>Your Passwords </h2>

                                {passwardArray.length === 0 && <div>No passwords to show </div>}
                                {passwardArray.length != 0 && <table className='table-auto w-full'>
                                    <table class="table-auto w-full ">
                                        <thead className=' bg-green-700 text-white '>
                                            <tr>
                                                <th>Site</th>
                                                <th>Username </th>
                                                <th>Passwords </th>
                                                <th>Actions </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-green-100 '>{
                                            passwardArray.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className=' text-center '>
                                                        <div className="flex items-center justify-center ">

                                                            <span>
                                                                <a href={item.site} target='_blank'>{item.site} </a>
                                                            </span>
                                                            <div className='size-6 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                                <lord-icon
                                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover">
                                                                </lord-icon>

                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className=' text-center '>
                                                        <div className='flex items-center justify-center'>
                                                            <span>
                                                                {item.username}
                                                            </span>
                                                            <div className='size-6 cursor-pointer' onClick={() => { copyText(item.username) }}>

                                                                <lord-icon
                                                                    style={{ "width": "25px", "height": "25px", "paddinTop": "5px", "paddingLeft": "3px", "cursor": "pointer" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover">
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </td>


                                                    <td className=' text-center '>
                                                        <div className='flex justify-center items-center '>
                                                            <span>
                                                                {item.passward}
                                                            </span>
                                                            <div className='size-6 cursor-pointer' onClick={() => { copyText(item.passward) }}>

                                                                <lord-icon
                                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px", "cursor": "pointer" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover">
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className=' text-center border-white justify-center '>
                                                        <span className='' onClick={() => { deletePassward(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover"
                                                                style={{ "width": "25px", "height": "25px", "cursor": "pointer" }}>
                                                            </lord-icon>
                                                        </span>


                                                    </td>
                                                </tr>



                                            })}
                                        </tbody>
                                    </table>
                                </table>}
                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Manager3
