import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';

import BlockFilters from "../BlockFilters/BlockFilters";

const BlockList = () => {

    type BlockValues = {
        title: string;
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

    const [filters, setFilters] = useState<FilterValues[]>([]);
    const [typesFilters, setTypesFilters] = useState<string[]>([]);
    const [focusFilters, setFocusFilters] = useState<string[]>([]);
    const [levelsFilters, setLevelsFilters] = useState<string[]>([]);
    const [equipmentFilters, setEquipmentFilters] = useState<string[]>([]);
    const [propsFilters, setPropsFilters] = useState<string[]>([]);

    useEffect(() => {
        let blockArr: BlockValues[] = [];
        database.ref('blocks').on('value', function (snapshot) {
            snapshot.forEach(block => {
                blockArr.push(block.val());
                setLoading(false);
            });
        });
        setBlocks(blockArr);
        setFilteredBlocks(blockArr);
    }, []);

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    function filterPlainArray(array: any, filters: any) {
        const filterKeys = Object.keys(filters);
        return array.filter((item: any) => {
            return filterKeys.every(key => {
                if (!filters[key].length) return true;
                return JSON.stringify(filters[key]).includes(JSON.stringify(item[key]));
            });
        });
    }

    useEffect(() => {
        const blockFilters = {
            type: typesFilters[0],
            focus: focusFilters[0],
            level: levelsFilters[0],
            equipment: equipmentFilters[0],
            props: propsFilters[0]
        }
        if (filters.length) {
            setFilteredBlocks(filterPlainArray(blocks, blockFilters));
        }
    }, [filters]);

    if (loading) {
        return (
            <p>Just a moment while we find some props ...</p>
        )
    }

    return (
        <div className="flex-between stack-xl">
            <div className="main">
                <h1>Block List</h1>
                {filteredBlocks
                    .map((block, index) => {
                        return (
                            <div className="stack" key={index}>
                                <h2>{block.title}</h2>
                                <p><strong>Type:</strong> {capitalizeFirst(block.type)}</p>
                                <p><strong>Level:</strong> {capitalizeFirst(block.level)}</p>
                                <p><strong>Focus:</strong> {capitalizeFirst(block.focus)}</p>
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
                                <p><strong>Start position:</strong> {block.start}</p>
                                <p><strong>Instructions:</strong></p>
                                <ul className="stack-sm">
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
            <div className="sidebar sticky">
                <BlockFilters updateTypesFilters={setTypesFilters} updateFocusFilters={setFocusFilters} updateLevelsFilters={setLevelsFilters} updateEquipmentFilters={setEquipmentFilters} updatePropsFilters={setPropsFilters} updateFilters={setFilters} />
            </div>
        </div>
    )
}

export default BlockList;