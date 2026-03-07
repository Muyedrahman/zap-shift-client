import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';



const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    return (
      <div>
        <h1 className="text-4xl">Management Users: {users.length}</h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Admin Action</th>
                <th>Others Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold"> {user.displayName}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="btn">
                        <FiShieldOff></FiShieldOff>
                      </button>
                    ) : (
                      <button className="btn">
                        <FaUserShield></FaUserShield>
                      </button>
                    )}
                  </td>
                  <th>Actions</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default UsersManagement;