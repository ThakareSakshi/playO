import React from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


const Sidebar = () => {

    const Iconpaths=['Color','Icon_2','Icon_3','Icon_4','Icon_5','Icon_6','Icon_7']
  return (
    <div className='w-24 rounded-ee-2xl rounded-se-2xl bg-black h-screen  flex flex-col items-center p-2 gap-5 sticky top-0 left-0'>
        <img src='/Icons/Logo.png' className='py-4'/>
        <div className='flex flex-col items-center p-2 gap-5'>
            {
                Iconpaths.map(icon=> <img src={`Icons/${icon}.png`} className='py-2'/>)
            }
        </div>
       
       <div className='text-gray-700 absolute bottom-5'>
        <SettingsOutlinedIcon/>
       </div>

      
    </div>
  )
}

export default Sidebar
