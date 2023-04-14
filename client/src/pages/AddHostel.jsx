import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios';
// import FormData from 'react-form-data'


// import css files 
import '../styles/addEditProducts.css'
import {Alert} from 'react-bootstrap'
import { categoryArray } from '../information/categoryArrays';
import { areaArr } from '../information/areaArray';

import Loading from '../components/Loading'

const AddHostel = () => {
    // data from redux 
    // let {loading=true,status,isAdmin} = useSelector((state)=>state.userDetailsReducer);
    const navigate = useNavigate();
    // useEffect(() => {
    //     // if(!loading && (status != 200 || !isAdmin)){
    //     //     navigate('/login');
    //     // }
    // }, [loading])
    

    const [incompleteAlert, setIncompleteAlert] = useState('none');
    const [productExistAlert, setProductExistAlert] = useState('none');
    const [imgTypeAlert, setImgTypeAlert] = useState('none');
    const [errorAlert, setErrorAlert] = useState('none');
    const [loader, setLoader] = useState(false);

    // values of all input tags using usestate
    const [inputs, setInputs] = useState({
        img:"",name:"",brand:"",gender:"Mens",occasion:"Casual",description:"",price:"",actualPrice:"",pincodes:"",
        category:"T-Shirts",color:"",size:"L",stock:"",inTrending:false,specialOffer:false
    })

    let arr = ['shirts','pants'];

    // updating values of all inputs tags 
    let key,val,check;
    const handleChange = (e)=>{
        key = e.target.name;
        val = e.target.value;
        check = e.target.checked;
        if(key=='inTrending' || key=='specialOffer'){
            setInputs({...inputs,[key]:check});
        }else{
            setInputs({...inputs,[key]:val});
        }
    }

    // updating the image uploaded 
    const uploadImage = (e)=>{
        val = e.target.files[0];
        setInputs({...inputs,'img':val});
    }
    // sending data to backend 
    const sendData = async ()=>{
        try{
            if(!inputs.name || !inputs.brand ||  !inputs.color || !inputs.stock || !inputs.price || !inputs.actualPrice || 
                !inputs.description || !inputs.pincodes || !inputs.size || !inputs.gender || !inputs.occasion || !inputs.category){
                    setImgTypeAlert('none');
                    setProductExistAlert('none');
                    setIncompleteAlert('block');
                    setErrorAlert('none');
            }else{
                if(inputs.img.type == "image/jpeg" || inputs.img.type == "image/jpg" || inputs.img.type == "image/png" || inputs.img.type == "image/gif"){
                    setLoader(true);
                    const url = '/api/addProduct';
                    let formdata = new FormData();
                    formdata.append('img',inputs.img,inputs.img.name);
                    formdata.append('name',inputs.name);
                    formdata.append('brand',inputs.brand);
                    formdata.append('color',inputs.color);
                    formdata.append('occasion',inputs.occasion);
                    formdata.append('category',inputs.category);
                    formdata.append('gender',inputs.gender);
                    formdata.append('stock',inputs.stock);
                    formdata.append('price',inputs.price);
                    formdata.append('actualPrice',inputs.actualPrice);
                    formdata.append('description',inputs.description);
                    formdata.append('pincodes',inputs.pincodes);
                    formdata.append('size',inputs.size);
                    formdata.append('inTrending',inputs.inTrending);
                    formdata.append('specialOffer',inputs.specialOffer);
                    let res = await axios.post(url,formdata);
                    if(res.status==200){
                        setLoader(false);
                        navigate('/success?message=your product is added successfully');
                    }else if(res.status==205){
                        setLoader(false);
                        setImgTypeAlert('none');
                        setProductExistAlert('block');
                        setIncompleteAlert('none');
                        setErrorAlert('none');
                    }else{
                        setLoader(false);
                        setImgTypeAlert('block');
                        setProductExistAlert('none');
                        setIncompleteAlert('none');
                        setErrorAlert('none');
                    }
                }else{
                    setLoader(false);
                    setImgTypeAlert('block');
                    setProductExistAlert('none');
                    setIncompleteAlert('none');
                    setErrorAlert('none');
                }
            }
        }catch(err){
            setLoader(false);
            setImgTypeAlert('none');
            setProductExistAlert('none');
            setIncompleteAlert('none');
            setErrorAlert('block')
        }            
    }

  return (
    <div id='addEditProducts' className='form'>

        {/* {loader && <Loading />} */}

        {/* alerts  */}
        <Alert style={{display:productExistAlert}} onClose={() => setProductExistAlert('none')} dismissible>
            <Alert.Heading className='font1'>Product Exist!</Alert.Heading>
            <p>Product of same name , color and brand ans size already exist . Please try again with a different product</p>
        </Alert>
        <Alert style={{display:incompleteAlert}} onClose={() => setIncompleteAlert('none')} dismissible>
            <Alert.Heading className='font1'>Incomplete!</Alert.Heading>
            <p>It is necessray to fill all the details</p>
        </Alert>
        <Alert style={{display:imgTypeAlert}} onClose={() => setImgTypeAlert('none')} dismissible>
            <Alert.Heading className='font1'>Image error!</Alert.Heading>
            <p>image should be of type jpg or jpeg or png or gif</p>
        </Alert>
        <Alert style={{display:errorAlert}} onClose={() => setErrorAlert('none')} dismissible>
            <Alert.Heading className='font1'>Server Error!</Alert.Heading>
            <p>There is some problem to add product . Please try after some time.</p>
        </Alert>


        <div className="container">
            <div className="heading font1 textColor">Add New Hostel Here</div>
        </div>
        <div className="container d-flex flex-wrap justify-content-between mt-4">
            <div className="d-flex inputBox">
                <div className="font1">Hostel Name</div>
                <input type="text" placeholder='eg . allen hostel' name='name' onChange={handleChange} value={inputs.name} />
            </div>
            <div className="d-flex inputBox">
                <div className="font1">Category</div>
                <select name="category" value={inputs.category} onChange={(e)=>{setInputs({...inputs,'category':e.target.value})}}>
                   {categoryArray.map((item)=>(
                        <option value={item.category}>{item.category}</option>
                   ))}
                </select>
            </div>
            
            <div className="d-flex align-items-center justify-content-between" id='smallInputs'>
                <div className="d-flex inputBox">
                    <div className="font1">Area</div>
                    <select name="area" value={inputs.area} onChange={(e)=>{setInputs({...inputs,'area':e.target.value})}}>
                        {areaArr.map((item)=>(
                            <option value={item.area}>{item.area}</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex inputBox">
                    <div className="font1">MRP of product(₹)</div>
                    <input type="number" placeholder='100' name='actualPrice' onChange={handleChange} value={inputs.actualPrice} />
                </div>
                <div className="d-flex inputBox">
                    <div className="font1">Discounted Price(₹)</div>
                    <input type="number" placeholder='if not discount same as actual price' name='price' onChange={handleChange} value={inputs.price} />
                </div>
            </div>
            <div className="d-flex w-100 flex-column">
                <div className="font1">Desscription of Hostel</div>
                <textarea name='description' placeholder='description and facilities' onChange={handleChange} value={inputs.description}></textarea>
            </div>

            <div className="d-flex w-100 flex-column mt-3">
                <div className="font1">Image of product in jpg or png or gif</div>
                <input name='img' type="file" onChange={uploadImage} />
            </div>

            <div className="btn w-100 mt-5" onClick={sendData} >Add Hostel</div>
        </div>
    </div>
  )
}

export default AddHostel