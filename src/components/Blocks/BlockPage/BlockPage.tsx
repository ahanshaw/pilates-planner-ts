import React, { useState } from "react";
import { FilterValues } from '../../../services/interfaces';

import Filters from "../../Common/Filters/Filters";
import BlockList from "../BlockList/BlockList";

const BlockPage = () => {
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

export default BlockPage;