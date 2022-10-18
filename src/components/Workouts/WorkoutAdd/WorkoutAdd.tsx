import React, { useState, useEffect } from "react";
import { database } from '../../../services/firebase';
import { BlockValues } from '../../../services/interfaces';
import { FilterValues } from '../../../services/interfaces';

import WorkoutBlockList from "../WorkoutBlockList/WorkoutBlockList";
import WorkoutAddedBlocks from "../WorkoutAddedBlocks/WorkoutAddedBlocks";
import Filters from "../../Common/Filters/Filters";

const WorkoutAdd = () => {
    const [filters, setFilters] = useState<FilterValues>();
    const [loading, setLoading] = useState<boolean>(true);
    const [blocks, setBlocks] = useState<BlockValues[]>([]);
    const [filteredBlocks, setFilteredBlocks] = useState<BlockValues[]>([]);
    const [addedBlocks, setAddedBlocks] = useState<BlockValues[]>([]);
    const [addedKey, setAddedKey] = useState<string>();
    const [removedKey, setRemovedKey] = useState<string>();

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
        if (filters === undefined) {
            setFilteredBlocks(blocks);
        }
        else {
            setFilteredBlocks(blockFilter(blocks, filters));
        }
    }, [loading, filters]);

    useEffect(() => {
        if (addedKey !== undefined) {
            setFilteredBlocks(filteredBlocks.filter((block) => block.key !== addedKey));
            const selectedBlock: any = filteredBlocks.find((block) => block.key === addedKey);
            setAddedBlocks((addedBlocks) => [...addedBlocks, selectedBlock]);
        }
    }, [addedKey]);

    useEffect(() => {
        if (removedKey !== undefined) {
            setAddedBlocks(addedBlocks.filter((item) => item.key !== removedKey));
            const removedBlock: any = blocks.find((item) => item.key === removedKey);
            setFilteredBlocks((filteredBlocks) => [...filteredBlocks, removedBlock]);
        }
    }, [removedKey]);

    return (
        <div className="flex-between stack-xl">
            <div className="main flex-fifty-fifty stack-xl">
                <WorkoutBlockList loading={loading} filteredBlocks={filteredBlocks} setAddedKey={setAddedKey} />
                <WorkoutAddedBlocks addedBlocks={addedBlocks} setRemovedKey={setRemovedKey} />
            </div>
            <div className="sidebar stack-lg sticky">
                <Filters updateFilters={setFilters} />
            </div>
        </div>
    )
}

export default WorkoutAdd;