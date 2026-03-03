import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const {data: riders = []} = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })


    return (
      <div>
        <h2 className="text-5xl">Riders Pending Approval: {riders.length}</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr>
                  <th>{index + 1} </th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.district}</td>
                  <td>{rider.status}</td>
                  <td>Muyed</td>
                  <td>Rahman g</td>
                  <td>
                    <button className="btn">
                      <FaUserCheck />
                    </button>
                    <button className="btn">
                      <IoPersonRemove />
                    </button>
                    <button className="btn">
                      <FaTrashAlt />
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

export default ApproveRiders;