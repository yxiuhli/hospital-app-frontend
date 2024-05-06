import { getPatients } from '@/lib/PatientAPI'
import React from 'react'

const page = async () => {
    const patients = await getPatients()
    console.log(patients)
  return (
    <div>page</div>
  )
}

export default page