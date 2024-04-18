import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4 }from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwardRef = useRef()

    const [form, setform] = useState({ site: " ", username: " ", passward: " " })
    const [passwardArray, setPasswardArray] = useState([]);

    const getPassword = async ()=>{
        let req = await fetch("http://localhost:3000/")
        let passwards = await req.json()
        setPasswardArray(passwards);
        // console.log(passwards)

        }

    useEffect(() => {
        getPassword();
    }, [])


    const copyText = (text) => {
        alert("copied to clipboard")

        navigator.clipboard.writeText(text)
    }


    const savePassward =async () => {

        if(  form.passward.length > 4 ){

        setPasswardArray([...passwardArray, {...form , id:uuidv4()  }])
        let res = await fetch("http://localhost:3000/",{method: "POST", header:{"Content-Type": "application/json"},
        body:JSON.stringify({...form, id: uuidv4() })})


        // localStorage.setItem("passwords", JSON.stringify([...passwardArray, {...form , id:uuidv4()  }]))
        // console.log([...passwardArray, form])
    }
    else{
        alert("Your password must be greater than 4 dig/letterrs/ symbols");
    }
    }
    const deletePassward =async(id) =>{
        console.log("deleting passwords with id ",id);
        setPasswardArray(passwardArray.filter(item =>item.id !==id ));
        // localStorage.setItem("passwards" , JSON.stringify(passwardArray.filter(item =>item.id !== id )))
        let res = await fetch("http://localhost:3000/",{method: "DELETE", header:{"Content-Type": "application/json"},
        body:JSON.stringify({...form, id })})
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
      {/* <div className="absolute inset-0 -z-10 h-1/2 w-full  bg-green-400 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div> */}
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
                            Save</button>
                    </div>
                    <div className="password w-full">
                        <h2 className='text-2xl font-bold py-3'>Your Passwords </h2>

                        {passwardArray.length === 0 && <div>No passwords to show </div>}
                        {passwardArray.length != 0 && <table className='table-auto w-full'>
                            <table className="table-auto w-full ">
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
                                                <span className=''  onClick={() =>{deletePassward(item.id)}}>
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
        </>
    )
}

export default Manager
