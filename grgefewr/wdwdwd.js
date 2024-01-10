import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { MdArrowBack } from "react-icons/md"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from "../../layouts/HomeLayout"
import { createLecture } from "../../redux/slices/lectureSlice"

function AddLectures() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const courseDetails = useLocation().state

    const [inputUser,setInputUser] = useState({
        id:courseDetails?._id,
        title:"",
        description:"",
        lecture:"",
        videoPreview:"",
    })

    function inputHandler(e)
    {
        const {name,value} = e.target
        setInputUser({...inputUser,[name]:value})
    }

    function videoHandler(e) {
        const video = e.target.files[0]
        setInputUser({...inputUser,lecture:video,videoPreview:URL.createObjectURL(video)})
    }

    async function submitHandler(e) {
        e.preventDefault()
        if(!inputUser.title || !inputUser.description || !inputUser.lecture) {
            toast.error("All fields are requireds")
            return
        }

        const res = await dispatch(createLecture(inputUser))
        if(res?.payload?.data?.success) {
            console.log("success");
        }
    }

    useEffect(() => {
        if(!courseDetails) navigate("/courses");
    }, [])

    return (
        <HomeLayout>
            <main className="h-[90vh] flex justify-center items-center mt-24 mb-8">
                <div className="gap-x-20 shadow-[0_0_10px_black] w-[90vw] md:w-[33vw] h-[500px]">
                    <header className="flex justify-center items-center relative">
                    <MdArrowBack 
                        onClick={()=>navigate(-1)}
                        className="absolute top-4 left-0 mx-2 text-4xl cursor-pointer"/>
                            <h1 className="text-2xl font-semibold py-4">
                                Add Lecture
                            </h1>
                    </header>
                    <form onSubmit={submitHandler} noValidate className="flex flex-col justify-center items-center space-y-4 mx-2">
                        <input type="text"
                            className="w-full bg-transparent py-2 border" 
                            name="title"
                            onChange={inputHandler}
                            value={inputUser.title}
                            id="title"
                            placeholder=" Enter Title Lecture" 
                        />
                        <textarea
                            className="w-full h-32 bg-transparent py-2 border resize-none overflow-y-scroll" 
                            name="description"
                            onChange={inputHandler}
                            value={inputUser.description}
                            id="description" 
                            placeholder=" Enter Lecture Description"
                        />
                        {inputUser.videoPreview ? (
                            <video src={inputUser.videoPreview}
                                className="w-full h-40 border flex items-center justify-center"
                                controls 
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                            />
    
                        ) : (
                            <div className="w-full h-40 border flex items-center justify-center cursor-pointer mb-10">
                                <label htmlFor="lecture"
                                    className="font-semibold text-lg cursor-pointer">
                                    Choose Video Lecture
                                </label>
                                <input type="file"
                                    className="hidden" 
                                    name="lecture"
                                    onChange={videoHandler}
                                    accept="video/mp4 video/x-mp4 video/*"
                                    id="lecture" 
                                /> 
                            </div>
                        )}
                        <button type="submit" className="w-full h-10 text-xl font-semibold bg-blue-500 text-white py-1 px-1 rounded-sm mt-2 hover:bg-blue-600 transition-all ease-in-out">
                            Add new lecture
                        </button>
                    </form>
                </div>
            </main>
        </HomeLayout>
    )
}

export default AddLectures