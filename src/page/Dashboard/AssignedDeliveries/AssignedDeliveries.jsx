import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignedDeliveries = () => {
  const  {user} = useAuth();
  const axiosSecure = useAxiosSecure();


  const {data: parcels = []} = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],

    queryFn: async() =>{
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    }
  })


    return (
      <div>
        <h1 className="text-4xl">Parcels Pending Pickup: {parcels.length} </h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th> Conform</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcels._id}>
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>
                    <button className='btn btn-primary text-black'>
                      Accept
                    </button>
                    <button className='btn btn-warning ms-2 text-black'>
                     Riject
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AssignedDeliveries;