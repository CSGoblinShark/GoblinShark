import { useState } from "react"
import useSWR from 'swr'
import axios from 'axios'
import VerificationCode from "./VerificationCode"
import useSortableData from "./useSortableData"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ReactDOM, { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

const fetcher = url => axios.get(url).then(res => res.data)

export default function UserTable() {
    const { data, error } = useSWR("/api/getAll", fetcher)
    const [showVerification, setShowVerification] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [clicked, setClick] = useState(false);
    const [logout, setLogout] = useState(false);
    const users = data || []
    const { sortedUsers, requestSort, sortConfig } = useSortableData(users)

    function handleClickToLogout() {
        setLogout(!logout);
    }

    const redirect = []
    if (logout) {
        redirect.push(<Redirect to={{
            pathname: '/',
            state: { logout: logout }
        }}
        />)
    }

    function handleShowVerification() {
        if (!clicked) {
            axios.post('/api/verification')
                .then((data) => {
                    setVerificationCode(data.data)
                })
            setClick(true);
        }
        setShowVerification(!showVerification);
    }

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return "invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
        }
        if (sortConfig.key === name) {
            return sortConfig.direction === "ascending" ? "ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300" : "ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300 -rotate-180"
        } else {
            return "invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible";
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {showVerification && <VerificationCode code={verificationCode} />}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto pt-5">
                    <h1 className="text-xl font-semibold text-gray-900">Codesmith Residents and Alumni</h1>
                    <p className="mt-2 text-sm text-gray-700">

                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={() => handleShowVerification()}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 mr-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Invite a user
                    </button>
                    <button
                        type="button"
                        onClick={handleClickToLogout}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" onClick={() => requestSort('first_name')}>
                                            <a href="#" className="group inline-flex">
                                                Name
                                                <span className={getClassNamesFor('firstName')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" onClick={() => requestSort('cohort_num')}>
                                            <a href="#" className="group inline-flex">
                                                Cohort
                                                <span className={getClassNamesFor('cohortNum')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" onClick={() => requestSort('city')}>
                                            <a href="#" className="group inline-flex">
                                                Location
                                                <span className={getClassNamesFor('city')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" onClick={() => requestSort('residentOrAlum')}>
                                            <a href="#" className="group inline-flex">
                                                Resident or Alumni
                                                <span className={getClassNamesFor('residentOrAlum')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" onClick={() => requestSort('employed')}>
                                            <a href="#" className="group inline-flex">
                                                Employment Status
                                                <span className={getClassNamesFor('employed')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" onClick={() => requestSort('employer')}>
                                            <a href="#" className="group inline-flex">
                                                Company
                                                <span className={getClassNamesFor('employer')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" onClick={() => requestSort('salary')}>
                                            <a href="#" className="group inline-flex">
                                                Salary
                                                <span className={getClassNamesFor('salary')}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <a className="group inline-flex">
                                                Socials
                                            </a>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {sortedUsers.map((user) => (
                                        <tr key={user.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-10 w-10 rounded-full" src={user.image_url} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{user.first_name + " " + user.last_name}</div>
                                                        <div className="text-gray-500">{user.showemail ? user.email : "Prefer not to share"}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{user.cohort_location}</div>
                                                <div className="text-gray-500">{user.cohort_num}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.city}</td>
                                            {user.resident_alum && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                    {user.resident_alum}
                                                </span>
                                            </td>}
                                            {user.employed && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                    Employed
                                                </span>
                                            </td>}
                                            {!user.employed && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className="inline-flex rounded-full bg-gray-400 px-2 text-xs font-semibold leading-5 text-gray-100">
                                                    Searching
                                                </span>
                                            </td>}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.employer}</td>
                                            {user.showsalary && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{`$${user.salary}`}</td>}
                                            {!user.showsalary && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{`Private`}</td>}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.linkedin && <a href={user.linkedin} className="text-indigo-600 hover:text-indigo-900">
                                                    LinkedIn<span className="sr-only">, {user.last_name}</span>
                                                </a>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {redirect}
        </div>
    )
}
