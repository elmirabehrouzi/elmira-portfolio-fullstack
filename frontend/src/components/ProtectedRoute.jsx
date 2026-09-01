import React from 'react'
import {Navigate,useLocation} from 'react-router-dom'
export default function ProtectedRoute({children}){const loc=useLocation();const token=localStorage.getItem('eb_access');return token?children:<Navigate to="/control/login" state={{from:loc}} replace/>}
