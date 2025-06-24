import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const UsersList = () => {

  const { users, aToken, getAllUsers } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllUsers()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>جميع المستخدمين</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {users.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 w-full h-40 object-cover' 
                 src={item.image} alt={item.name} />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.email}</p>
              <p className='text-[#5C5C5C] text-sm mt-1'>{item.phone}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <p>الجنس: {item.gender}</p>
              </div>
              {item.address && (
                <p className='text-[#5C5C5C] text-sm mt-1'>
                  العنوان: {item.address.line1} {item.address.line2}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList