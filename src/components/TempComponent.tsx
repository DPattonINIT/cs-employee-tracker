'use client'

import { Employee } from '@/lib/interfaces/interfaces'
import { addEmployee, updateEmployee } from '@/lib/services/employee-service';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { format } from 'path';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


const TempComponent = ({ type, employee, refreshEmployees }: { type: 'Add' | 'Edit', employee: Employee, refreshEmployees: () => Promise<void> }) => {
    // useStates
    const [openModal, setOpenModal] = useState(false);
    const [employeeToChange, setEmployeeToChange] = useState<Employee>({
        id: 0,
        name: "",
        jobTitle: "",
        hireDate: "",
    });

    const [token, setToken] = useState('');

    const disableBtn =
        employeeToChange.name.trim() == "" ||
        employeeToChange.jobTitle.trim() == "" ||
        employeeToChange.hireDate == "";

    // Modal Functions
    const onOpenModal = () => {
        if (type === "Edit") {
            setEmployeeToChange(employee);
        }

        setOpenModal(true);
    };

    const onCloseModal = () => {
        setOpenModal(false);
        setEmployeeToChange({ id: 0, name: "", jobTitle: "", hireDate: "" });
    };

    // Change employee functions
    const handleEmployeeToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeToChange({
            ...employeeToChange,
            [e.target.id]: e.target.value,
        });
    };

    const handleEmployeeToChangeHireDate = (date: string) => {
        setEmployeeToChange({
            ...employeeToChange,
            hireDate: date,
        });
    };

    // Date functions
    const formatDateForInput = (date: string) => {
        if (!date) return undefined;

        const [year, month, day] = date.toString().split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const formatDateFromInput = (date: Date | undefined) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // Add & Edit function
    const handleEmployee = async () => {
        try {
            const employeeWithChanges = {
                ...employeeToChange,
                name: employeeToChange.name.trim(),
                jobTitle: employeeToChange.jobTitle.trim(),
            };

            if (type === "Add") {
                if (await addEmployee(token, employeeWithChanges)) {
                    await refreshEmployees();
                }
            } else {
                if (await updateEmployee(token, employeeWithChanges)) {
                    await refreshEmployees();
                }
            }

            setEmployeeToChange({
                id: 0,
                name: "",
                jobTitle: "",
                hireDate: "",
            });
        } catch (error) {
            console.log("error", error);
        }

        onCloseModal();
    };

    useEffect(() => {
        const handleToken = async () => {
            if (localStorage.getItem('user')) {
                setToken(await JSON.parse(localStorage.getItem('user')!).token);
            }
            if (sessionStorage.getItem('user')) {
                setToken(await JSON.parse(sessionStorage.getItem('user')!).token);
            }
        }

        handleToken();
    }, []);

    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
                <Button
                    color="success"
                    className={type === "Add" ? "flex items-center gap-1" : ""}
                >
                    {type === "Add" ? <FaPlus className="mt-[0.2rem]" /> : "Edit"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {type === "Add"
                            ? "Add New Employee"
                            : "Update Employee Information"}
                    </DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="grid grid-cols-2 gap-5 min-h-[30rem]">
                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Employee name</Label>
                            </div>
                            <Input
                                id="name"
                                value={employeeToChange.name}
                                onChange={handleEmployeeToChange}
                            />
                        </div>
                        <div>
    <div className="mb-2 block">
        <Label htmlFor="jobTitle">Job title</Label>
    </div>
    <Select 
        value={employeeToChange.jobTitle}
        onValueChange={(value) =>
            setEmployeeToChange({ ...employeeToChange, jobTitle: value })
        }
    >
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a job title" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Customer Support">Customer Support</SelectItem>
            <SelectItem value="IT Support Specialist">IT Support Specialist</SelectItem>
            <SelectItem value="Software Engineer">Software Engineer</SelectItem>
        </SelectContent>
    </Select>
</div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label>Date hired</Label>
                        </div>
                        {/* <Datepicker
                                    id="dateHired"
                                    value={formatDateForInput(employeeToChange.hireDate)}
                                    onChange={(e) =>
                                        handleEmployeeToChangeHireDate(formatDateFromInput(e))
                                    }
                                    inline
                                /> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !employeeToChange.hireDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {employeeToChange.hireDate ? employeeToChange.hireDate : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formatDateForInput(employeeToChange.hireDate)}
                                    onSelect={(e) =>
                                        handleEmployeeToChangeHireDate(formatDateFromInput(e))
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <div className="w-full">
                        <Button
                            onClick={handleEmployee}
                            color="success"
                            disabled={disableBtn}
                        >
                            {type === "Add" ? "Add" : "Update"} Employee
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TempComponent