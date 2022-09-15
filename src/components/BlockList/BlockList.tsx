import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';

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

    const [loading, setLoading] = useState<boolean>(true);
    const [blocks, setBlocks] = useState<BlockValues[]>([]);

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

    if (loading) {
        return (
            <p>Just a moment while we find some props ...</p>
        )
    }

    return (
        <div className="container stack-xl">
            <h1>Block List</h1>
            {blocks
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
    )
}

export default BlockList;