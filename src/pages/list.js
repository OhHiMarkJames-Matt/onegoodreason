import React from "react";
// import {useState, useEffect} from "react"
// import List from "../components/List"
// import Auth from '../utils/auth'

const List = () => {
    return (
        <div>
            <div className="mx-auto max-w-2xl py-10 ">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight dark:text-white sm:text-6xl">
                    My reasons
                    </h1>
                    <ul>
                        <li>Reason 1</li>
                        <li>Reason 2</li>
                    </ul>
                </div>
            </div>
            <button>Add Reasons</button>
        </div>
    );
};

export default List;