"use client"

import React, { useEffect, useState } from "react";
import InputTemplate from "../../components/InputTemplate"
import { Dayjob } from "@/Objects/Dayjob";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

// shows a list of the dayjobs and allows user to click on it to see parts in the dayjob
function Page ()
{
  const [user, setUser] = useUser()
  const router = useRouter();
  const [dayjobArr, setDayjobArr] = useState<Dayjob[]>([])  // TODO: use context, it's better

  // fetch the dayjob list from backend based on the user id
  useEffect(() =>
  {
    const fetchDayjobs = async () =>
    {
      const response = await fetch(`http://localhost:3000/api/get_dayjobs`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user!.user_id)  // user id from context
        }
      );
      const data = await response.json();
      setDayjobArr(data.dayjob_arr);
    };

    fetchDayjobs();
  }, []) 

  const handleAddDayjob = async () =>
  {
    
  }

  // const handleSave = async () =>
  // {
  //   try {
  //     const response = await fetch('http://localhost:3000/api', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(dayjob)
  //     });

  //     const json = await response.json()

  //     if (json.success) {
  //       if (json.dayjob_id !== null)
  //         setDayjobIdFetchResult(json.dayjob_id);  // result returned from api which is returned from save_dayjob_info function
  //       document.getElementById('save-message')!.textContent = 'Saved!'
  //       document.getElementById('save-message')?.classList.remove('hidden')

  //       setTimeout(() =>
  //       {
  //         document.getElementById('save-message')?.classList.add('hidden')
  //       }, 2000);
  //     }
  //     else {
  //       console.error('error when saving')

  //       // set the save-message to fail
  //       document.getElementById('save-message')?.classList.remove('hidden')
  //       document.getElementById('save-message')!.textContent = 'Failure'

  //       setTimeout(() =>
  //       {
  //         document.getElementById('save-message')?.classList.add('hidden')
  //       }, 2000);
  //     }

  //     setPartObjArr(prev =>
  //       prev.map(part => (
  //         { ...part, flag: "none" }
  //       ))
  //     )  // sets each of the item's flag to none.
  //   } catch (error) {
  //     console.error('Network or unexpected error:', error);
  //   }
  // };

  const onDayjobInfoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value } = e.target
    setDayjob(prev => (
      { ...prev, [name]: value }
    ))
  }

  return (
    <div id="page" className="flex justify-center">
      <div id="page-content">

        <h1 className="text-center text-2xl font-bold">Cabin Readiness</h1>

        <div>
          <button className="mt-5 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleAddDayjob}
          >
            Add Dayjob
          </button>
        </div>

        <div className="mt-15 flex flex-col gap-y-10" id="dayjob-list">

          {
            dayjobArr.map((Dj, idx) =>
            {
              return (
                <div className="flex items-center" key={idx}>
                  {/* clickable Dayjob input */}
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => router.push(`/cabin_readiness/${Dj.dayjob_id}`)}  // navigate to the dayjob page
                  >
                    {`DJ No: ${Dj.dayjob_number}, Serial No: ${Dj.dayjob_serial_number}`}
                  </button>
                </div>
              )
            }
            )
          }


        </div>

      </div>
    </div>
  )

}

export default Page;
