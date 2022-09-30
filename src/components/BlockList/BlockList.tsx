import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';
import { FilterValues } from '../../services/interfaces';
import { BlockValues } from '../../services/interfaces';

import BlockFilters from "../BlockFilters/BlockFilters";
import Block from "../Block/Block";

const BlockList = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [blocks, setBlocks] = useState<BlockValues[]>([]);
    const [filteredBlocks, setFilteredBlocks] = useState<BlockValues[]>([]);

    const [filters, setFilters] = useState<FilterValues>();

    useEffect(() => {
        let blockArr: BlockValues[] = [];
        database.ref('blocks').on('value', function (snapshot) {
            snapshot.forEach(block => {
                blockArr.push(block.val());
                setLoading(false);
            });
        });
        setBlocks(blockArr);
    }, []);

    const blockFilter = (array: any, filters: any) => {
        const filterKeys = Object.keys(filters);
        return array.filter((item: any) => {
            return filterKeys.every(key => {
                if (!item[key] || filters[key] === false) return false;
                return filters[key].some((val: any) => item[key].includes(val));
            });
        });
    }

    useEffect(() => {
        if (!filters) {
            setFilteredBlocks(blocks);
        }
        else {
            setFilteredBlocks(blockFilter(blocks, filters));
        }
    }, [loading, filters]);

    if (loading) {
        return (
            <p>Just a moment while we find some props ...</p>
        )
    }

    return (
        <div className="flex-between stack-xl">
            <div className="main stack-xl">
                <h1>Block List</h1>
                {filteredBlocks.length < 1 &&
                    <p>Sorry, nothing matched these filters.</p>
                }
                <Block filteredBlocks={filteredBlocks} />
            </div>
            <div className="sidebar stack-lg sticky">
                <BlockFilters updateFilters={setFilters} />
            </div>
        </div>
    )
}

export default BlockList;