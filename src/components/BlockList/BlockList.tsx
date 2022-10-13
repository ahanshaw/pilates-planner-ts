import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';
import { FilterValues } from '../../services/interfaces';
import { BlockValues } from '../../services/interfaces';

import Filters from "../Filters/Filters";
import Block from "../Block/Block";

const BlockList = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blocks, setBlocks] = useState<BlockValues[]>([]);
    const [filteredBlocks, setFilteredBlocks] = useState<BlockValues[]>([]);

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
        const filterKeys = Object.keys(props.filters);
        return array.filter((item: any) => {
            return filterKeys.every(key => {
                if (!item[key] || filters[key] === false) return false;
                return filters[key].some((val: any) => item[key].includes(val));
            });
        });
    }

    useEffect(() => {
        if (props.filters === undefined) {
            setFilteredBlocks(blocks);
        }
        else {
            setFilteredBlocks(blockFilter(blocks, props.filters));
        }
    }, [loading, props.filters]);

    if (loading) {
        return (
            <p>Just a moment while we find some props ...</p>
        )
    }

    return (
        <>
            <div className="main stack-xl">
                {filteredBlocks.length < 1 &&
                    <p>Sorry, nothing matched these filters.</p>
                }
                <Block filteredBlocks={filteredBlocks} />
            </div>
        </>
    )
}

export default BlockList;