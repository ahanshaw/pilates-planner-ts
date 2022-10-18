import React from "react";
import WorkoutBlock from "../WorkoutBlock/WorkoutBlock";

const WorkoutAddedBlocks = (props: any) => {

    const removeBlock = (e: React.MouseEvent<HTMLButtonElement>, key: any) => {
        e.preventDefault();
        props.setRemovedKey(key);
    };

    if (props.addedBlocks.length < 1) {
        return (
            <p>Add some blocks</p>
        )
    }

    return (
        <div className="stack-xl">
        {props.addedBlocks
                .map((block: any) => {
                    return (
                        <div className="stack-sm max-width" key={block.key}>
                            <WorkoutBlock block={block} />
                            <button className="btn-secondary" onClick={(e) => removeBlock(e, block.key)}>Remove Block</button>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default WorkoutAddedBlocks;
