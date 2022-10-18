import React, { useState, useEffect } from "react";
import { BlockValues } from '../../../services/interfaces';

import WorkoutBlock from "../WorkoutBlock/WorkoutBlock";

const WorkoutBlockList = (props: any) => {
    const [addedBlocks, setAddedBlocks] = useState<BlockValues[]>([]);

    const addBlock = (e: React.MouseEvent<HTMLButtonElement>, key: any) => {
        e.preventDefault();
        props.setAddedKey(key);
    };

    if (props.loading) {
        return (
            <p>Just a moment while we find some props ...</p>
        )
    }

    return (
            <div className="stack-xl">
                {props.filteredBlocks.length < 1 &&
                    <p>Sorry, nothing matched these filters.</p>
                }
                {props.filteredBlocks
                    .map((block: any) => {
                        return (
                            <div className="stack-sm max-width" key={block.key}>
                                <WorkoutBlock block={block} />
                                <button className="btn-secondary" onClick={(e) => addBlock(e, block.key)}>Add Block</button>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default WorkoutBlockList;