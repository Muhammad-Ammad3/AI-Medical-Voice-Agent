"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function HistoryList() {
  const [historyList, setHistoryList] = useState([])
  return (
    <div>
      {
        historyList.length == 0 ?
        <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'>
          <Image src={"/doctor-assistant.png"} alt='empty'
          width={150}
          height={150}/>
          <h2 className="font-bold text-xl mt-5">No Recent Consultations</h2>
          <p>It look like you haven't consulted with any doctors yet.</p>
        </div>
        : <div>List</div>
      }
    </div>
  )
}

export default HistoryList
