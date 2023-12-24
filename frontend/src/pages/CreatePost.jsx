
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import "./create.css"


const CreatePost = () => {
   
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const handleCreate=async (e)=>{
        e.preventDefault()
        const post={
          title,
          desc,
          username:user.username,
          userId:user._id,
          categories:cats
        }

        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
          }
          catch(err){
            console.log(err)
          }
        }
        try{
          const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)

        }
        catch(err){
          console.log(err)
        }
    }



  return (
    <div>
        <Navbar/>
        <div class="containerBig">
        <div class='container'>
        <div class="text">
         Создать публикацию
      </div>        
      <form >
      <div class="form-row">
      <div class="input-data">

          <input onChange={(e)=>setTitle(e.target.value)} type="text"/>
           <label for="">Введите заголовок</label>
           <div class="underline"></div>



            </div>
            <div class="input-data">

            <input onChange={(e)=>setFile(e.target.files[0])} type="file"  />
            <div class="underline"></div>


            </div>
      </div>
      
      <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Введите категорию' type="text"/>
                
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
            </div>

            <div className='flex px-4 mt-3'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            
            
            </div>
          </div>

          <div class="form-row">
         <div class="input-data textarea">
          <textarea onChange={(e)=>setDesc(e.target.value)} rows={8} cols={80} />
          <br />
            <label for="">Введите описание</label>
            
            <br />
          </div>
          </div>
          <div class="form-row submit-btn">
               <div class="input-data">
                  <div class="inner"></div>
                  <input onClick={handleCreate} type="submit" value="Создать" />

          </div>
          </div>
        </form>

        </div>

        </div>

        <Footer/>
    </div>
  )
}

export default CreatePost