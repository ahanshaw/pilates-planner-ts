import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';
import { FilterValues } from '../../services/interfaces';
import { BlockValues } from '../../services/interfaces';

import Filters from "../Filters/Filters";
import BlockList from "../BlockList/BlockList";
import Block from "../Block/Block";

const Blocks = () => {
    const [filters, setFilters] = useState<FilterValues>();

    return (
        <div className="flex-between stack-xl">
            <div className="main stack-xl">
                <h1>Block List</h1>
                <BlockList filters={filters} />
            </div>
            <div className="sidebar stack-lg sticky">
                <Filters updateFilters={setFilters} />
            </div>
        </div>
    )
}

export default Blocks;