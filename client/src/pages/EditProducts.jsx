import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';



// import css files 
import '../styles/addEditProducts.css'
import {Alert} from 'react-bootstrap'

import Loading from '../components/Loading'


import { SelectedProductsDetails } from '../apiCalls/SelectedProductsDetails';



const EditProducts = () => {    

    let {loading=true,status,isAdmin} = useSelector((state)=>state.userDetailsReducer);
    const navigate = useNavigate();

    // for all alerts 
    const [incompleteAlert, setIncompleteAlert] = useState('none');
    const [imgTypeAlert, setImgTypeAlert] = useState('none');
    const [errorAlert, setErrorAlert] = useState('none');
    const [loader, setLoader] = useState(false);

    const [isDataFetched, setIsDataFetched] = useState(false);

    // values of all input tags using usestate
    const [inputs, setInputs] = useState({
        productId:"",name:"",img:"",description:"",price:"",actualPrice:""
    })

    const {id} = useParams();
    let data;
    useEffect(() => {
        async function fetchData(){
            const query = {productId:id};
            data = await SelectedProductsDetails(query);
            data = data[0];
            setInputs({
                productId:data.productId,name:data.name,
                description:data.description,price:data.price,actualPrice:data.actualPrice
            });
            setIsDataFetched(true);
        }
        if(!loading && status==200 && isAdmin){
            fetchData();
        }else if(!loading && (status != 200 || !isAdmin)){
            navigate('/login');
        }
    }, [loading])
  

    // updating values of all inputs tags 
    let key,val,check;
    const handleChange = (e)=>{
        key = e.target.name;
        val = e.target.value;
        setInputs({...inputs,[key]:val});
    }

    // updating the image uploaded 
    const uploadImage = (e)=>{
        val = e.target.files[0];
        setInputs({...inputs,'img':val});
    }
    function checkImgType(imgType){
        if(inputs.img.type == "image/jpeg" || inputs.img.type == "image/jpg" || inputs.img.type == "image/png" || inputs.img.type == "image/gif"){
            return true;
        }
        return false;
    }
    // sending data to backend 
    const sendData = async ()=>{
        try{
            if(!inputs.price || !inputs.actualPrice || !inputs.description){
                setImgTypeAlert('none');
                setIncompleteAlert('block');
                setErrorAlert('none')
            }else{
                if((inputs.img && checkImgType(inputs.img.type)) || (!inputs.img)){
                    const url = '/api/editProduct';
                    let formdata = new FormData();
                    if(inputs.img != undefined){
                        formdata.append('img',inputs.img,inputs.img.name);
                    }
                    formdata.append('productId',inputs.productId);
                    formdata.append('stock',inputs.stock);
                    formdata.append('price',inputs.price);
                    formdata.append('actualPrice',inputs.actualPrice);
                    formdata.append('description',inputs.description);
                    formdata.append('pincodes',inputs.pincodes);
                    formdata.append('specialOffer',inputs.specialOffer);
                    formdata.append('inTrending',inputs.inTrending);
                    setLoader(true);
                    let res = await axios.post(url,formdata);
                    if(res.status==200){
                        setLoader(false);
                        navigate('/success?message=your product is edited successfully');
                    }else{
                        setLoader(false);
                        setImgTypeAlert('none');
                        setIncompleteAlert('none');
                        setErrorAlert('block')
                    }           
                }else{
                    setImgTypeAlert('block');
                    setIncompleteAlert('none');
                    setErrorAlert('none')
                }
            }
        }catch(err){
            setImgTypeAlert('none');
            setIncompleteAlert('none');
            setErrorAlert('block')
        }
    }

  return (
    <div id='addEditProducts' className='form'>

        {loader && <Loading />}

        {/* alerts  */}
        <Alert style={{display:incompleteAlert}} onClose={() => setIncompleteAlert('none')} dismissible>
            <Alert.Heading className='font1'>Incomplete!</Alert.Heading>
            <p>Only image  box can be left emptied</p>
        </Alert>
        <Alert style={{display:imgTypeAlert}} onClose={() => setImgTypeAlert('none')} dismissible>
            <Alert.Heading className='font1'>Image error!</Alert.Heading>
            <p>image should be of type jpg or jpeg or png or gif</p>
        </Alert>
        <Alert style={{display:errorAlert}} onClose={() => setErrorAlert('none')} dismissible>
            <Alert.Heading className='font1'>Server Error!</Alert.Heading>
            <p>There is some problem to add product . Please try after some time.</p>
        </Alert>

        {!isDataFetched
        ?<div className="font1 textColor heading container">Loading Data ....</div>
        :<div className="container d-flex flex-wrap justify-content-between mt-2">
            <div className="d-flex flex-column my-4 ">
                <div className="subHeading font1" style={{color:'gray'}}>{inputs.name}</div>
            </div>
            <div className="d-flex align-items-center justify-content-between" id='smallInputs'>
                <div className="d-flex inputBox w-100">
                    <div className="font1">MRP of product(₹)</div>
                    <input type="number" placeholder='100' name='actualPrice' onChange={handleChange} value={inputs.actualPrice} />
                </div>
                <div className="d-flex inputBox w-100">
                    <div className="font1">Discounted Price(₹)</div>
                    <input type="number" placeholder='if not discount same as actual price' name='price' onChange={handleChange} value={inputs.price} />
                </div>
            </div>
            <div className="d-flex flex-column w-100">
                <div className="font1">Desscription of product</div>
                <textarea name='description' placeholder='description and specs' onChange={handleChange} value={inputs.description}></textarea>
            </div>
           

            <div className="d-flex w-100 flex-column mt-3">
                <div className="font1">Update Image</div>
                <i className='textColor' style={{fontSize:'12px'}}>if dont't want to update then don't upload any other image</i>
                <input name='img' type="file" onChange={uploadImage} />
            </div>

            <div className="btn w-100 mt-5" onClick={sendData} >Save Changes</div>
        </div>
        }
    </div>
  )
}

export default EditProducts