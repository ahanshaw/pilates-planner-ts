import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';

import BlockFilters from "../BlockFilters/BlockFilters";

const BlockList = () => {

    type BlockValues = {
        title: string,
        type: string,
        focus: string,
        level: string,
        equipment: string,
        props: string[],
        start: string,
        instructions: { step: string }[];
    };

    type FilterValues = {
        types: string[],
        focus: string[],
        levels: string[],
        equipment: string[],
        props: string[];
    };

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

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

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
                {filteredBlocks
                    .map((block, index) => {
                        return (
                            <div className="stack-sm max-width" key={index}>
                                <h2>{block.title}</h2>
                                <div className="flex-fifty-fifty">
                                    <div>
                                        <p><strong>Type:</strong> {capitalizeFirst(block.type)}</p>
                                        <p><strong>Level:</strong> {capitalizeFirst(block.level)}</p>
                                        <p><strong>Focus:</strong> {capitalizeFirst(block.focus)}</p>
                                    </div>
                                    <div>
                                        <p><strong>Equipment:</strong> {capitalizeFirst(block.equipment)}</p>
                                        <p><strong>Props:</strong> {block.props?.length > 0 ?
                                            block.props.map((prop, index) => {
                                                return (
                                                    <span className="block-props" key={index}>
                                                        {capitalizeFirst(prop)}
                                                    </span>
                                                )
                                            }) : <span>None</span>
                                        }
                                        </p>
                                    </div>
                                </div>
                                <p><strong>Start position:</strong> {block.start}</p>
                                <p><strong>Instructions:</strong></p>
                                <ul>
                                    {block.instructions.map((instruction, index) => {
                                        return (
                                            <li key={index}>
                                                {instruction.step}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
            <div className="sidebar stack-lg sticky">
                <BlockFilters updateFilters={setFilters} />
            </div>
        </div>
    )
}

export default BlockList;