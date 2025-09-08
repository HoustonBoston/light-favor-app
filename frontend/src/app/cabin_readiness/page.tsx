"use client"

import React, { useEffect, useState } from "react";
import InputTemplate from "../../components/InputTemplate"
import { Dayjob } from "@/Objects/Dayjob";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import DayjobField from "@/components/DayjobField";

import {debounce} from "lodash";

// shows a list of the dayjobs and allows user to click on it to see parts in the dayjob
function Page ()
{
  const [user, setUser] = useUser()
  const router = useRouter();
  const [dayjobArr, setDayjobArr] = useState<Dayjob[]>([])  // TODO: use context, it's better

  // fetch the dayjob list from backend based on the user id
  useEffect(() =>
  {
    console.log('fetching dayjobs for user id:', user!.user_id)
    const fetchDayjobs = async () =>
    {
      const response = await fetch(`http://localhost:3000/api/get_dayjobs`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user!.user_id })  // user id from context
        }
      );
      const data = await response.json();
      if (data.success && Array.isArray(data.dayjob_arr)) {
        setDayjobArr(data.dayjob_arr);
      }
    };

    fetchDayjobs();
  }, []) 

  const handleAddDayjob = async () =>
  {
    // add a new dayjob to the db
    // then retrieve the id and push to the dayjob array
    console.log('trying to add new dayjob to DB');

    const result = await fetch('http://localhost:3000/api/insert_dayjob_once',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ user_id: user!.user_id })  // user id from context
    });

    const data = await result.json();
    if (data.success)
    {  
      const newDayjob: Dayjob = {
        dayjob_id: data.dayjob_id,  // returned from backend
        user_id: user?.user_id ?? 0,  // fallback to 0 if undefined
        dayjob_number: data.dayjob_number,
        dayjob_serial_number: data.dayjob_serial_number,
      };
      setDayjobArr(prev => [...prev, newDayjob]);
    } else {
      console.error('Failed to create new dayjob');
    }
  }

  const onDayjobInfoChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) =>
  {
    if (index === undefined) return;  // safety check

    const { name, value } = e.target
    setDayjobArr(prev => {
      const updated = prev.map((dj, idx) =>
        idx === index ? { ...dj, [name]: value } : dj
      );

      // call the debounced save with the updated dayjob
      console.log("updated dayjob:", updated[index]);
      debouncedSave(updated[index]);

      return updated;
  });


    // debounce the save operation to avoid excessive calls
    const debouncedSave = debounce(
      async (updatedDayjob: Dayjob) => {
        try {
          console.log("trying to update dayjob")
          const response = await fetch('http://localhost:3000/api/update_dayjob_info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDayjob)  // send only the updated dayjob
          });
        } catch (error) {
          console.error('Error updating dayjob info:', error);
        }
      }, 2000
    )

    console.log("debouncing the save operation")
    debouncedSave(dayjobArr[index])
  }

  return (
    <div id="page" className="flex justify-center">
      <div id="page-content">

        <h1 className="text-center text-2xl font-bold">Cabin Readiness</h1>

        <div className="flex justify-center">
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
                  <DayjobField Dj={Dj} onDayjobInfoChange={(e) => onDayjobInfoChange(e, idx)} />
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
