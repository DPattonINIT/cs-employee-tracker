'use client'

import { Employee } from '@/lib/interfaces/interfaces'
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const EmployeeView = ({ employee, setEdit }: { employee: Employee, setEdit: (value: boolean) => void }) => {
    const { push } = useRouter();

    return (
        <>
            <div>
                <p className="text-sm font-semibold">Job Title</p>
                <p>{employee.jobTitle}</p>
            </div>

            <div>
                <p className="text-sm font-semibold">Details</p>
                <p>{employee.details || 'No details to note.'}</p>
            </div>

            <div>
                <p className="text-sm font-semibold">Status</p>
                <Badge variant="outline" className="capitalize">
                    {employee.status || 'No set status'}
                </Badge>
            </div>

            <div>
                <p className="text-sm font-semibold">Hire Date</p>
                <p>{new Date(employee.hireDate).toLocaleDateString()}</p>
            </div>


            <div className="flex justify-between pt-4">
                <Button onClick={() => push('/employees')}>Back</Button>
                {employee && <Button variant="outline" onClick={() => setEdit(true)}>Edit Employee</Button>}
            </div>
        </>
    )
}

export default EmployeeView