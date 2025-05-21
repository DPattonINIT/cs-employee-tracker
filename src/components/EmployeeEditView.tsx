'use client'

import { Employee } from '@/lib/interfaces/interfaces'
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon, Calendar } from 'lucide-react'

const EmployeeEditView = ({ employee, setEdit }: { employee: Employee, setEdit: (value: boolean) => void }) => {

    return (
        <>
            <div>
                <p className="text-sm font-semibold">Job Title</p>
                <Input value={employee.jobTitle} />
            </div>

            <div>
                <p className="text-sm font-semibold">Details</p>
                <Input value={employee.details || ""} />
            </div>

            <div>
                <p className="text-sm font-semibold">Status</p>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Sick">Sick</SelectItem>
                            <SelectItem value="Out of Office">Out of Office</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <p className="text-sm font-semibold">Hire Date</p>
                <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-start text-left font-normal text-muted-foreground")}
                                >
                                    <CalendarIcon />
                                    <span>Pick a date</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
            </div>


            <div className="flex justify-between pt-4">
                <Button onClick={() => setEdit(false)}>Cancel</Button>
                {employee && <Button variant="outline">Save Edits</Button>}
            </div>
        </>
    )
}

export default EmployeeEditView