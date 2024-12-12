import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from './PrivateRoute';
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import PropertyBought from "../Pages/Dashboard/PropertyBought/PropertyBought";
import WishList from "../Pages/Dashboard/WishList/WishList";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import AllProperties from "../Pages/AllProperties/AllProperties";
import ManageProperties from "../Pages/Dashboard/ManageProperties/ManageProperties";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageReviews from "../Pages/Dashboard/ManageReviews/ManageReviews";
import AddProperty from "../Pages/Dashboard/AddProperty/AddProperty";
import MyAddedProperties from "../Pages/Dashboard/MyAddedProperties/MyAddedProperties";
import MySoldProperties from "../Pages/Dashboard/MySoldProperties/MySoldProperties";
import RequestedProperties from "../Pages/Dashboard/RequestedProperties/RequestedProperties";
import UpdateProperty from "../Pages/Dashboard/UpdateProperty/UpdateProperty";
import AdvertiseProperty from "../Pages/Dashboard/AdvertiseProperty/AdvertiseProperty";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import MakeOffer from "../Pages/Dashboard/MakeOffer/MakeOffer";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ErrorPage from "../Pages/ErroPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signUp",
                element: <SignUp></SignUp>
            },
            {
                path: "/allProperties",
                element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
            },
            {
                path: '/propertyDetails/:id',
                element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>
            }
        ]
    },
    {
        path:"dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path:"myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path:'propertyBought',
                element: <PropertyBought></PropertyBought>,
            },
            {
                path: 'wishList',
                element: <WishList></WishList>
            },
            {
                path: 'myReviews',
                element: <MyReviews></MyReviews>
            },
            {
                path:'manageProperties',
                element: <ManageProperties></ManageProperties>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manageReviews',
                element: <ManageReviews></ManageReviews>
            },
            {
                path: 'addProperty',
                element: <AddProperty></AddProperty>
            },
            {
                path: 'myAddedProperties',
                element: <MyAddedProperties></MyAddedProperties>
            },
            {
                path: 'mySoldProperties',
                element: <MySoldProperties></MySoldProperties>
            },
            {
                path: 'requestedProperties',
                element: <RequestedProperties></RequestedProperties>
            },
            {
                path: 'updateProperty/:id',
                element: <UpdateProperty></UpdateProperty>
            },
            {
                path: 'advertiseProperty',
                element: <AdvertiseProperty></AdvertiseProperty>
            },
            {
                path: 'makeOffer/:id',
                element: <MakeOffer></MakeOffer>
            },
            {
                path:'payment/:id',
                element: <Payment></Payment>
            }
        ]
    }
]);