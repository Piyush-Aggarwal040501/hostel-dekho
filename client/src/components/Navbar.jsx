import React,{useState,useRef,useEffect} from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import {useSelector} from 'react-redux'


// imporing images and others 
import {AiFillHeart} from 'react-icons/ai'
import {AiFillHome} from 'react-icons/ai'
import {BsPersonFill} from 'react-icons/bs'
import {FiPower} from 'react-icons/fi'
import {IoIosAddCircle} from 'react-icons/io'

// importing css 
import '../styles/navbar.css'
import { Overlay,Tooltip } from 'react-bootstrap'

import Loading from '../components/Loading'

import { Logout } from '../apiCalls/Logout'


const Navbar = () => {
    let logo = '/images/imp/logo.png';

    // for popover 
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [userExist, setUserExist] = useState(false);


    // for logout
    const [logoutBox, setLogoutBox] = useState('none')
    const logoutUser = ()=>{
        Logout();
    }

    // getting userdata 
    const{loading,status,userInfo,isAdmin}= useSelector((state)=>state.userDetailsReducer);
    const ordersInfo = useSelector((state)=>state.ordersForAdminReducer);

    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        setShow(false);
        let search = new URLSearchParams(window.location.search).get('search');
        setShow(false);
        if(search){
            setSearchInput(search);
        }else{
            setSearchInput("");
        }

        if(status == 200){
            setUserExist(true);
        }else{
            setUserExist(false);
        }
    }, [loading,searchInput,window.location.href])


    const navigate = useNavigate();
    const goToSearchPage = ()=>{
        sessionStorage.setItem('prevLink',window.location.pathname+window.location.search);
        navigate('/search')
    }

    const navigateFunc = (link)=>{
        setShow(false);
        navigate(link);
    }
   
   


    return (
        <nav id="navbar" className='bgColor'>
            {loading && <Loading />}
            <div className='alertBox' style={{display:logoutBox}}>
                <div className="box">
                    <div className="subHeading font1 mb-2" style={{color:'gray'}}>Logout</div>
                    <div className="font1 mb-3">Are u sure u want logout</div>
                    <div className="btn btn-danger"onClick={logoutUser} >Logout</div>
                    <div className="btn btn-primary" onClick={()=>{setLogoutBox('none')}}>Cancel</div>
                </div>
            </div>
            <div className="container d-flex align-items-center box">
                <Link to='/'>
                    <img className='logo' src={logo} alt="Trenders" />
                </Link>
                <div className="mid">
                    <input onClick={goToSearchPage} value={searchInput}  type="text" placeholder='Enter product here'/>
                </div>
                <div className="right d-flex align-items-center justify-content-center">
                    {!isAdmin && <Link to={userExist?'/whilist':'/login'} className="whilist mx-1">
                        {!loading && userExist && userInfo.whilist.length>0 && <i className='count'>{userInfo.whilist.length}</i>}
                        
                        <AiFillHeart />
                    </Link>}
                    <div className="id">
                        {!userExist
                        ?<Link to='/login' className='font1 ms-2' style={{fontWeight:900,color:'white'}}>Login</Link>
                        :<>
                            <div  className="profile mx-1" ref={target} onClick={(e) => {setShow(!show)}}>
                                <BsPersonFill />
                            </div> 
                            <Overlay target={target.current} show={show} placement="bottom">
                                {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    <div className="d-flex flex-column">
                                       {!isAdmin && <div onClick={()=>{navigateFunc('/userOrders')}} className='links'>
                                            <div className="d-flex align-items-center">
                                            <AiFillHome className='me-2 textColor' />
                                            <div>Booking Details</div>
                                            </div>
                                        </div>}
                                        {isAdmin && <div onClick={()=>{navigateFunc('/add')}} className='links'>
                                            <div className="d-flex align-items-center">
                                            <IoIosAddCircle className='me-2 textColor' />
                                            <div>Add Hostel</div>
                                            </div>
                                        </div>}
                                       {isAdmin && <div onClick={()=>{navigateFunc('/allHostels')}} className='links'>
                                            <div className="d-flex align-items-center">
                                            <AiFillHome className='me-2 textColor' />
                                            <div>All Hostels</div>
                                            </div>
                                        </div>}
                                        <div className='links' onClick={()=>{setLogoutBox('flex')}}>
                                            <div className="d-flex align-items-center">
                                            <FiPower className='me-2 textColor' />
                                            <div>Logout</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tooltip>
                                )}
                            </Overlay>
                        </>
                        }
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar